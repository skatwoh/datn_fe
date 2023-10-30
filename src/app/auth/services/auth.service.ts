import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, finalize, Observable, of, Subscription, switchMap} from 'rxjs';
import {AppConstants} from '../../app-constants';
import {UserModel} from '../models/user.model';
import {AuthHttpService} from './auth-http.service';
import {Router} from '@angular/router';
import {AuthModel} from '../models/auth.model';
import {catchError, map} from 'rxjs/operators';
import {RegistrationModel} from '../models/registration.model';
import {ForgotModel} from "../models/forgot.model";

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  private authLocalStorageToken = AppConstants.APP_AUTH;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  register(payload: RegistrationModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.signup(payload).pipe(
      map((res) => {
        this.isLoadingSubject.next(false);
        return res;
      }),
      catchError((err) => {
        return of(null);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((res: any) => {
        return this.setAuthFromLocalStorage(res.body);
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    this.currentUserSubject.next(undefined);
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  logout1() {
    this.currentUserSubject.next(undefined);
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/hotel/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((res: any) => {
        const user: UserType = res.body;
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<any> {
    this.isLoadingSubject.next(true);
    const payload = new ForgotModel(email); // Tạo đối tượng ForgotModel
    return this.authHttpService
      .forgotPassword(payload) // Truyền đối tượng payload
      .pipe(
        finalize(() => this.isLoadingSubject.next(false))
      );
  }


  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }
      return JSON.parse(lsValue);
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
