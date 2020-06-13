import { Pipe, PipeTransform } from '@angular/core';
import { TranslationKey } from './translation-key';

@Pipe({
    name: 'translationString'
})
export class TranslationStringPipe implements PipeTransform {
    translationKey = TranslationKey;
    transform(value: string, ...args: any[]): any {
        for (const ele of this.translationKey) {
            if (ele.key === value.trim()) {
                return ele.value;
                break;
            }
        }
    }

}
