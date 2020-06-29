import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateCommentComponent } from './create-comment/create-comment.component';
import { Router } from '@angular/router';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { PostElement } from '../model/post.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { LoginComponent } from '../../login/login.component';

@Component({
    selector: 'app-item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    constructor(private router: Router, private modalService: NgbModal, private localStoreManager: LocalStoreManager,
        private endpointFactory: EndpointFactory) {
        this.loadData();
    }
    currentRate = 0;
    numberItem = 1;
    dataContent: any;
    dataComment: any[];
    checkLoadData = false;
    checkUserRate: false;
    checkUserComment: false;
    descriptions: string[];
    userId = 0;
    ngOnInit() {
    }

    loadData() {
        this.blockUI.start();
        if (this.localStoreManager.getToken() !== null || this.localStoreManager.getToken() === '') {
            this.endpointFactory.postByHeader(null, 'users/information').subscribe(dataInfo => {
                if (dataInfo.status === 'success') {
                    this.userId = dataInfo.data.userID;
                }
            });
        }
        this.endpointFactory.getEndPoint('posts/' + this.localStoreManager.getPostSelected()).subscribe(data => {
            if (data.status === 'success') {
                const post = new PostElement();
                const element = data.data.post;
                post.postId = element.id;
                post.postName = element.postName;
                post.userId = element.user.userID;
                post.userName = element.user.userName;
                post.userElement = element.user;
                post.unitPrice = element.unitPrice;
                post.address = element.address;
                post.dateOfPost = new Date(element.dateOfPost[0], element.dateOfPost[1], element.dateOfPost[2]);
                post.province = element.province;
                post.imageURLs = element.imagePosts;
                post.category = element.category;
                post.description = element.description;
                this.convertDescription(element.description);
                post.calculationUnit = element.calculationUnit;
                post.averageRate = Number.parseFloat(data.data.averageRate);
                this.dataComment = data.data.userCommentDTOList;
                this.dataContent = post;
                this.blockUI.stop();
                this.checkLoadData = true;
            }
        });
    }

    convertDescription(description: string): void {
        if (description === null) {
            this.descriptions = [];
            return;
        }
        this.descriptions = [];
        const arrString = description.split('-');
        if (arrString.length === 1) {
            this.descriptions.push(arrString[0]);
            return;
        }
        arrString.forEach(element => {
            if (element !== '') {
                this.descriptions.push(' - ' + element);
            }
        });
    }

    changeNumber(change: String): void {
        if (change === 'add') {
            this.numberItem += 1;
        } else {
            if (this.numberItem > 0) {
                this.numberItem -= 1;
            }
        }
    }

    createComment(): void {
        if (this.localStoreManager.getCheckLogin()) {
            const modalRef =
                this.modalService.open(CreateCommentComponent, { size: 'lg', windowClass: 'create-comment-dialog', centered: true });
            modalRef.componentInstance.data = { data: this.dataContent };
            modalRef.componentInstance.output.subscribe((res) => {
                if (res === 'success') {
                    this.loadData();
                }
            });
        } else {
            this.onLogin();
        }
    }

    purchaseItem(): void {
        const dataPurchase = [
            this.dataContent.postId,
            this.dataContent.postName,
            this.dataContent.unitPrice,
            this.numberItem,
            this.dataContent.imageURLs[0].url,
            this.dataContent.calculationUnit.unitName,
        ];
        this.localStoreManager.setDataPurchase(dataPurchase.toString());
        this.router.navigateByUrl('/component/confirm-purchase');

    }

    addStorageCart(): void {
        const dataPurchase = {
            postId: this.dataContent.postId,
            postName: this.dataContent.postName,
            unitPrice: this.dataContent.unitPrice,
            numberItem: this.numberItem,
            userName: this.dataContent.userName,
            province: this.dataContent.province.nameProvince,
            imageURL: this.dataContent.imageURLs[0].url,
            address: this.dataContent.address,
            unitName: this.dataContent.calculationUnit.unitName,
        };
        this.localStoreManager.setStorageCart(JSON.stringify(dataPurchase));
    }

    onLogin(): void {
        this.modalService.open(LoginComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }

    viewProfileUser(): void {
        this.localStoreManager.setUserNameSelected(this.dataContent.userName);
        this.router.navigateByUrl('/component/profile-user');
    }
}
