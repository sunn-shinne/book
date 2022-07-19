import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['book/1']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['book/1']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  get isLoggedIn(): boolean {
    return this.userData !== null;
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }

  async SetUserName(displayName: string) {
    return (await this.afAuth.currentUser)
      ?.updateProfile({ displayName })
      .then(() => {
        this.SetUserData(this.userData);
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
