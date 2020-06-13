import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoginComponent } from '../../login/login.component';

@Component({
    selector: 'app-confirm-purchase',
    templateUrl: './confirm-purchase.component.html',
    styleUrls: ['./confirm-purchase.component.scss']
})
export class ConfirmPurchaseComponent implements OnInit {
    postId: number;
    unitPrice: number;
    numberItem: number;
    imageURL: string;
    unitName: string;
    name: string;
    address: string;
    phoneNumber: string;
    totalPrice: number;
    @BlockUI() blockUI: NgBlockUI;
    constructor(private modalService: NgbModal, private router: Router, private localStoreManager: LocalStoreManager,
        private endpointFactory: EndpointFactory) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData(): void {
        const data = this.localStoreManager.getDataPurchase().split(',');
        this.postId = Number.parseInt(data[0]);
        this.unitPrice = Number.parseFloat(data[2]);
        this.numberItem = Number.parseInt(data[3]);
        this.totalPrice = this.unitPrice * this.numberItem;
        this.imageURL = data[4];
        this.unitName = data[5];
    }

    confirmPurchase(): void {
        if (this.localStoreManager.getCheckLogin()) {
            const modalRef = this.modalService.open(DialogConfirmComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
            modalRef.componentInstance.data = { title: 'Xác nhận đơn hàng', content: 'Bạn muốn xác nhận đơn hàng?' };
            modalRef.componentInstance.output.subscribe((res) => {
                if (res === 'success') {
                    const params: any = {
                        address: this.address,
                        fullName: this.name,
                        phoneNumber: this.phoneNumber,
                        postId: this.postId,
                        purchaseNumber: this.numberItem,
                        statusPurchaseId: 1
                    };
                    this.endpointFactory.postByHeader(params, 'purchases/create').subscribe(data => {
                        this.blockUI.start();
                        if (data.status === 'success') {
                            this.router.navigateByUrl('component/list-post');
                            this.blockUI.stop();
                        }
                    }, error => {
                        this.blockUI.stop();
                    });
                }
            });
        } else {
            this.onLogin();
        }
    }
    goBackInfoItem(): void {
        this.router.navigateByUrl('component/item-info');
    }
    onLogin(): void {
        this.modalService.open(LoginComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }

}
