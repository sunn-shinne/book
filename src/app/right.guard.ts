import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccessRightGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  showToastr() {
    this.toastr.info('Нет доступа к странице');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean {
    const accessToken = route.data['access-token'];
    return this.authService.right$.pipe(
      map(({ data }) => {
        const isAllowed = data.includes(accessToken);
        if (!isAllowed) {
          this.showToastr();
        }
        return isAllowed;
      })
    );
  }
}
