import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cons-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordPageComponent {
  resetPasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetPasswordForm = this.fb.group({
      email: new FormControl(null, Validators.compose([Validators.email, Validators.required, Validators.maxLength(255)])),
    });
  }

  ngOnInit(): void {}

  onSubmit(form: FormGroup): void {
    const {valid, value} = form;
    console.log(valid);
  }
}
