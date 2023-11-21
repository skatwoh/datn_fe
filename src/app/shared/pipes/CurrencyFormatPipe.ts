import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, currencyCode: string = 'VND'): string {
    // You can customize the currency formatting logic here
    const formattedValue = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: currencyCode }).format(value);
    return formattedValue;
  }
}
