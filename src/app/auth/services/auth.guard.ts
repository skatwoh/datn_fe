import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Router,
} from '@angular/router';
import {AuthService} from './auth.service';
import {UserModel} from "../models/user.model";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    if (currentUser ) {
      if (currentUser.role?.startsWith("admin") || currentUser.role?.startsWith("user")) {
        // Người dùng có quyền truy cập, vì vậy trả về true
        return true;
      } else {
        // Người dùng không có quyền truy cập, bạn có thể điều hướng đến trang lỗi
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    // not logged in so redirect to login page with the return url
    this.authService.logout();
    return false;
  }
}
