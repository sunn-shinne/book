import { Injectable, NgZone } from '@angular/core';
import { User as UserData } from '../interfaces/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/auth';
import { User } from '@firebase/auth-types';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const accessUrls = {
  full: 'https://fir-auth-93a4f-default-rtdb.europe-west1.firebasedatabase.app/access-rights-full.json',
  limited:
    'https://fir-auth-93a4f-default-rtdb.europe-west1.firebasedatabase.app/access-rights.json',
};

type firebaseUser = User | null;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: firebaseUser = null;
  right$: Observable<{ data: string[] }>;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private http: HttpClient
  ) {
    this.right$ = http.get<{ data: string[] }>(accessUrls.limited);

    this.afAuth.authState.subscribe((user: firebaseUser) => {
      this.userData = user;
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['book/1']);
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error(this.GetErrorMessage(error.code));
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['book/1']);
        });
      })
      .catch((error) => {
        console.log(error);
        throw new Error(this.GetErrorMessage(error.code));
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(this.GetErrorMessage(error.code));
      });
  }

  async SetUserName(displayName: string) {
    return (await this.afAuth.currentUser)
      ?.updateProfile({ displayName })
      .then(() => {
        this.SetUserData(this.userData);
      });
  }

  GoogleAuth() {
    return this.afAuth
      .signInWithPopup(new firebase.GoogleAuthProvider())
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['book/1']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(this.GetErrorMessage(error.code));
      });
  }

  GetErrorMessage(errorCode: string) {
    const requestErrors: { [key: string]: string } = {
      'auth/user-not-found': 'Пользователь с данным email не существует.',
      'auth/email-already-in-use':
        'Данный email уже используется другим аккаунтом.',
    };
    return requestErrors[errorCode] ?? 'Неизвестная ошибка. Повторите попытку.';
  }
}
