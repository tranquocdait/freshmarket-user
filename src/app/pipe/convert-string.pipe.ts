import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertString'
})
export class ConvertStringPipe implements PipeTransform {

  transform(value: string, length: number): string {
    if (value === null) {
      return '';
    }
    if (value.length <= length) {
      return value;
    }
    return value.substr(0, length) + '...';
  }

}
