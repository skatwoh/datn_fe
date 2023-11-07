import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MustMatch} from '../../../shared/utils';
import {first, Observable, Subscription} from 'rxjs';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {RegistrationModel} from '../../models/registration.model';
import {AppConstants} from '../../../app-constants';


@Component({
  selector: 'cons-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  // @ts-ignore
  registerForm: FormGroup;
  hasError: boolean = false;
  isLoading$: Observable<boolean>;
  errorMsg = '';

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.registerForm = this.fb.group({
        name: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(255)])),
        sdt: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
        email: new FormControl(null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(128)])),
        password: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)])),
        passwordAgain: new FormControl(null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(24)]))
      },
      {
        validator: MustMatch(
          {name: 'password', label: 'Password'},
          {name: 'passwordAgain', label: 'Password Again'}
        ),
      }
    );
  }

  onSubmit(form: FormGroup): void {
    const {valid, value} = form;
    this.hasError = false;
    this.errorMsg = '';

    if (valid) {
      const payload: RegistrationModel = value;
      const registrationSubScr = this.authService
        .register(payload)
        .pipe(first())
        .subscribe((res: any) => {
          if (res?.code === AppConstants.API_SUCCESS_CODE) {
            this.router.navigate(['/auth/login']);
          } else {
            if (res?.code === AppConstants.API_BAD_REQUEST_CODE && res?.entityMessages.length > 0) {
              const msg: any = res.entityMessages[0];
              this.errorMsg = `[${msg.key}] ${msg.errorMessage}`;
            } else {
              this.errorMsg = `Please check your info. If you still can't signup, contact your administrator.`;
            }

            this.hasError = true;
          }
        });
      this.unsubscribe.push(registrationSubScr);
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
