import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first, Observable, Subscription} from 'rxjs';
import {AuthService} from "../../../../../auth/services";
import {UserModel} from "../../../../../auth/models/user.model";

@Component({
  selector: 'cons-login-web',
  templateUrl: './login-web.component.html',
  styleUrls: ['./login-web.component.scss']
})
export class LoginWebComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  // @ts-ignore
  loginForm: FormGroup;
  hasError: boolean = false;
  returnUrl: string = '';
  isLoading$: Observable<boolean>;
  errorMsg = `Please check your username and password. If you still can't log in, contact your administrator.`;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;

    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(255)])),
      password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)]))
    });
  }

  onSubmit(form: FormGroup): void {
    const {valid, value} = form;
    if (valid) {
      this.hasError = false;
      const loginSubscr = this.authService
        .login(value.email, value.password)
        .pipe(first())
        .subscribe((user: UserModel | undefined) => {
          if (user) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        });
      this.unsubscribe.push(loginSubscr);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
