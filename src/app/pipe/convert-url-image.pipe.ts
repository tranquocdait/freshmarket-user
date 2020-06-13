import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'convertUrlImage'
})
export class ConvertUrlImage implements PipeTransform {

    transform(value: string, length: number): string {
        if (value === null) {
            return '../assets/images/Post_Default.png';
        }
        return value;
    }

}
