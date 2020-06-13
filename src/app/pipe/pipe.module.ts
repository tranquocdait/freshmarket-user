import { NgModule } from '@angular/core';
import { ConvertAmountPipe } from './convert-amount.pipe';
import { ConvertStringPipe } from './convert-string.pipe';
import { TranslationStringPipe } from './translation-string.pipe';
import { ConvertUrlImage } from './convert-url-image.pipe';


@NgModule({
    imports: [
    ],
    exports: [
        ConvertAmountPipe,
        ConvertStringPipe,
        TranslationStringPipe,
        ConvertUrlImage
    ],
    declarations: [
        ConvertAmountPipe,
        ConvertStringPipe,
        TranslationStringPipe,
        ConvertUrlImage
    ],
    entryComponents: [
    ]
})
export class PipeModule {

}
