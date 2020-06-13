import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { ComponentsRoutes } from './component.routing';
import { ListItemComponent } from './list-item/list-item.component';
import { ListPostComponent } from './list-post/list-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EditPostComponent } from './list-user-post/edit-post/edit-post.component';
import { DeletePostComponent } from './list-user-post/delete-post/delete-post.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { PurchaseInfoComponent } from './list-item/purchase-info/purchase-info.component';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { EditUserComponent } from './user-info/edit-user/edit-user.component';
import { CreateCommentComponent } from './item-info/create-comment/create-comment.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { ChangePasswordComponent } from './user-info/change-password/change-password.component';
import { ListUserPostComponent } from './list-user-post/list-user-post.component';
import { StorageCartComponent } from './storage-cart/storage-cart.component';
import { PipeModule } from '../pipe/pipe.module';
import { PaymentCartComponent } from './storage-cart/payment-cart/payment-cart.component';
import { ListBuyItemComponent } from './list-buy-item/list-buy-item.component';
import { PurchaseBuyInfoComponent } from './list-buy-item/purchase-buy-info/purchase-buy-info.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditPurchaseComponent } from './list-buy-item/edit-purchase/edit-purchase.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSelectModule,
        MatInputModule,
        PipeModule
    ], exports: [
        PurchaseInfoComponent,
        EditUserComponent,
        EditPostComponent,
        CreateCommentComponent,
        DeletePostComponent,
        DialogConfirmComponent,
        ChangePasswordComponent,
        PurchaseBuyInfoComponent,
        EditPurchaseComponent
    ],
    entryComponents: [
        PurchaseInfoComponent,
        EditPostComponent,
        EditUserComponent,
        CreateCommentComponent,
        DeletePostComponent,
        DialogConfirmComponent,
        ChangePasswordComponent,
        PurchaseBuyInfoComponent,
        EditPurchaseComponent
    ],
    declarations: [
        ListItemComponent,
        ListPostComponent,
        EditPostComponent,
        DeletePostComponent,
        PurchaseInfoComponent,
        EditUserComponent,
        ItemInfoComponent,
        ConfirmPurchaseComponent,
        CreateCommentComponent,
        UserInfoComponent,
        EditUserComponent,
        CreateCommentComponent,
        DialogConfirmComponent,
        ChangePasswordComponent,
        ListUserPostComponent,
        StorageCartComponent,
        PaymentCartComponent,
        ListBuyItemComponent,
        PurchaseBuyInfoComponent,
        EditPurchaseComponent,
        EditPurchaseComponent,
        ProfileUserComponent
    ]
})
export class ComponentsModule { }
