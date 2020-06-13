import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertAmount'
})
export class ConvertAmountPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === null) {
      return '';
    }
    return Number.parseFloat(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

}
