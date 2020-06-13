import { Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { ListPostComponent } from './list-post/list-post.component';
import { ItemInfoComponent } from './item-info/item-info.component';
import { ConfirmPurchaseComponent } from './confirm-purchase/confirm-purchase.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ListUserPostComponent } from './list-user-post/list-user-post.component';
import { StorageCartComponent } from './storage-cart/storage-cart.component';
import { PaymentCartComponent } from './storage-cart/payment-cart/payment-cart.component';
import { ListBuyItemComponent } from './list-buy-item/list-buy-item.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';

export const ComponentsRoutes: Routes = [{
    path: '',
    children: [
        {
            path: 'list-item',
            component: ListItemComponent,
            pathMatch: 'full'
        },
        {
            path: 'list-buy-item',
            component: ListBuyItemComponent,
            pathMatch: 'full'
        },
        {
            path: 'list-post',
            component: ListPostComponent
        },
        {
            path: 'item-info',
            component: ItemInfoComponent,
            pathMatch: 'full'
        },
        {
            path: 'confirm-purchase',
            component: ConfirmPurchaseComponent,
            pathMatch: 'full'
        },
        {
            path: 'user-info',
            component: UserInfoComponent,
            pathMatch: 'full'
        },
        {
            path: 'list-user-post',
            component: ListUserPostComponent,
            pathMatch: 'full'
        },
        {
            path: 'storage-cart',
            component: StorageCartComponent,
            pathMatch: 'full'
        },
        {
            path: 'payment-cart',
            component: PaymentCartComponent,
            pathMatch: 'full'
        },
        {
            path: 'profile-user',
            component: ProfileUserComponent,
            pathMatch: 'full'
        }
    ]
}];
