import { Component, OnInit } from '@angular/core';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LocalStoreManager } from '../../../services/local-store-manager.service';
import { EndpointFactory } from '../../../services/endpoint-factory.service';
import { LoginComponent } from '../../../login/login.component';

@Component({
    selector: 'app-payment-cart',
    templateUrl: './payment-cart.component.html',
    styleUrls: ['./payment-cart.component.scss']
})
export class PaymentCartComponent implements OnInit {

    name: string;
    address: string;
    phoneNumber: string;

    storageArr: any;
    totalAmount: number;
    constructor(private modalService: NgbModal, private router: Router, private localStoreManager: LocalStoreManager,
        private endpointFactory: EndpointFactory) {
    }

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
    confirmPurchase(): void {
        if (this.localStoreManager.getCheckLogin()) {
            const modalRef = this.modalService.open(DialogConfirmComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
            modalRef.componentInstance.data = { title: 'Xác nhận đơn hàng', content: 'Bạn muốn xác nhận đơn hàng?' };
            modalRef.componentInstance.output.subscribe((res) => {
                if (res === 'success') {
                    this.storageArr.forEach((element, index) => {
                        {
                            const params: any = {
                                address: this.address,
                                fullName: this.name,
                                phoneNumber: this.phoneNumber,
                                postId: element.postId,
                                purchaseNumber: element.numberItem,
                                statusPurchaseId: 1
                            };
                            this.endpointFactory.postByHeader(params, 'purchases/create').subscribe(data => {
                                if (data.status === 'success') {
                                    this.router.navigateByUrl('component/list-post');
                                }
                            }, error => {
                            });
                        }
                    });
                    this.localStoreManager.removeStorageCart();
                }
            });
        } else {
            this.onLogin();
        }
    }

    goBackStorage(): void {
        this.router.navigateByUrl('component/storage-cart');
    }

    onLogin(): void {
        this.modalService.open(LoginComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }
}
