import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {first, Observable, Subscription} from "rxjs";
import {UserModel} from "../../../../../auth/models/user.model";
import {AuthService} from "../../../../../auth/services";
import {ActivatedRoute, Router} from "@angular/router";
import {ForgotModel} from "../../../../../auth/models/forgot.model";

@Component({
  selector: 'cons-forgot-password-web',
  templateUrl: './forgot-password-web.component.html',
  styleUrls: ['./forgot-password-web.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordWebComponent implements OnDestroy{
  private unsubscribe: Subscription[] = [];
  // @ts-ignore
  resetPasswordForm: FormGroup;
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
  }

  ngOnInit(): void {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  private initForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(255)])),
    });
  }

  onSubmit(form: FormGroup): void {
    const { valid, value } = form;
    if (valid) {
      this.hasError = false;
      const forgotPasswordSubscr = this.authService
        .forgotPassword(value.email)
        .pipe(first())
        .subscribe((forgot: any) => {
          if (forgot) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.hasError = true;
          }
        }
      );
      this.unsubscribe.push(forgotPasswordSubscr);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
