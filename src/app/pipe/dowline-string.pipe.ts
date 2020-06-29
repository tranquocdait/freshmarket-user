import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dowlineString'
})
export class DowlineStringPipe implements PipeTransform {

    transform(value: string): string {
        if (value === null) {
            return '';
        }
        const arrString = value.split('-');
        let result = '';
        arrString.forEach(element => {
            if (element !== '') {
                result += element + '\n';
            }
        });
        return result;
    }

}
