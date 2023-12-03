import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'cons-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  @Output() sendApiPayment = new EventEmitter<any>();
  form: FormGroup;
  imageUrl: string | undefined;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      amount: ['', Validators.required],
      addInfo: ['', Validators.required],
      accountName: ['', Validators.required],
    });

    // Gọi hàm để cập nhật ảnh khi giá trị thay đổi
    this.updateImageUrl();

    // Đăng ký sự kiện valueChanges cho các trường amount và addInfo
    // @ts-ignore
    this.form.get('amount').valueChanges.subscribe(() => this.updateImageUrl());
    // @ts-ignore
    this.form.get('addInfo').valueChanges.subscribe(() => this.updateImageUrl());
  }

  generateImageUrl(amount: number, addInfo: string, accountName: string): string {
    const baseUrl = 'https://img.vietqr.io/image/vpb-62624112003-compact.jpg';
    const urlWithParams = `${baseUrl}?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;
    return urlWithParams;
  }

  updateImageUrl(): void {
    const { amount, addInfo, accountName } = this.form.value;
    this.imageUrl = this.generateImageUrl(amount, addInfo, accountName);
  }

  sendDataToApi(): void {
    if (this.form.valid) {
      const apiUrl = 'https://643eafd46c30feced8304742.mockapi.io/skatwoh/api-payment';
      const dataToSend = this.form.value;

      this.http.post(apiUrl, dataToSend).subscribe(
        (response) => {
          console.log('Data sent successfully:', response);
        },
        (error) => {
          console.error('Error sending data to API:', error);
        }
      );
    } else {
      console.error('Form is not valid. Please fill in all required fields.');
    }
  }
}
