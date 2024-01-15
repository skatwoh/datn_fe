import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'cons-recaptcha',
  templateUrl: './recaptcha.component.html',
  styleUrls: ['./recaptcha.component.scss']
})
export class RecaptchaComponent  implements OnInit {
  siteKey = '6LdbzFEpAAAAAAxfeii0kf8OFVKtmrzu6AUJcVnt';
  // @ts-ignore
  aFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required],
    });
  }

  handleReset(): void {
    console.log('Captcha reset');
  }

  handleExpire(): void {
    console.log('Captcha expired');
  }

  handleLoad(): void {
    console.log('Captcha loaded');
  }

  handleSuccess(response: string): void {
    console.log('Captcha success', response);
  }

  submitForm(): void {
    if (this.aFormGroup.valid) {
      // @ts-ignore
      const captchaResponse = this.aFormGroup.get('recaptcha').value;

      // Send the captchaResponse to the backend for verification
      this.http.post('/rpc/bds/recaptcha/verify-captcha', { captchaResponse }).subscribe(
        (data) => {
          console.log('Backend Response:', data);
          // Handle successful verification
        },
        (error) => {
          console.error('Backend Error:', error);
          // Handle verification error
        }
      );
    }
  }
}
