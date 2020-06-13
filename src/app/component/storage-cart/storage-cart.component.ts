import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStoreManager } from '../../services/local-store-manager.service';

@Component({
    selector: 'app-storage-cart',
    templateUrl: './storage-cart.component.html',
    styleUrls: ['./storage-cart.component.scss']
})
export class StorageCartComponent implements OnInit {

    constructor(private router: Router, private modalService: NgbModal, private localStoreManager: LocalStoreManager) { }
    storageArr: any;
    totalAmount: number;
    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        this.storageArr = JSON.parse(this.localStoreManager.getStorageCart());
        this.setTotalAmount();
    }

    setTotalAmount(): void {
        this.totalAmount = 0;
        this.storageArr.forEach(element => {
            this.totalAmount += element.unitPrice * element.numberItem;
        });
    }

    changeNumber(change: String, storage: any): void {
        if (change === 'add') {
            storage.numberItem += 1;
        } else {
            if (storage.numberItem > 0) {
                storage.numberItem -= 1;
            }
        }
        this.setTotalAmount();
    }

    removeStorageCart(storage: any): void {
        this.localStoreManager.removeItemOnCart(storage);
        this.loadData();
        this.setTotalAmount();
    }

    purchaseItem(storage: any): void {
        const dataPurchase = [
            storage.postId,
            storage.postName,
            storage.unitPrice,
            storage.numberItem,
            storage.imageURL,
            storage.unitName,
        ];
        this.localStoreManager.setDataPurchase(dataPurchase.toString());
        this.router.navigateByUrl('/component/confirm-purchase');
    }

    paymentCart(): void {
        if (this.localStoreManager.getNumberCart() > 0) {
            this.router.navigateByUrl('/component/payment-cart');
        }
    }

}
