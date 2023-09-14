import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'consFirstChar',
  standalone: true
})
export class FirstCharPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return Array.from(value)[0];
    }
    return '';
  }

}
