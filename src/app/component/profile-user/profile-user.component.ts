import { Component, OnInit } from '@angular/core';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { UserElement } from '../model/user.model';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostElement } from '../model/post.model';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-user',
    templateUrl: './profile-user.component.html',
    styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {

    constructor(private router: Router, private modalService: NgbModal, private endpointFactory: EndpointFactory,
        private localStoreManager: LocalStoreManager) {
        this.setUrl(0);
        this.loadData();
    }
    @BlockUI() blockUI: NgBlockUI;
    data = new UserElement();
    isLoadData = false;
    dataList: any;
    getUrl = '';
    categoryId = 0;
    page = 1;
    totalPage = 1;
    change = false;
    ngOnInit() {
    }
    setUrl(page: number): void {
        const userName = this.localStoreManager.getUserNameSelected();
        this.getUrl = 'posts/' + page + '/getByUser?userName=' + userName;
    }
    loadData() {
        this.blockUI.start();
        const userName = this.localStoreManager.getUserNameSelected();
        this.endpointFactory.getEndPoint('users/' + userName + '/byUserName').subscribe(dataInfo => {
            if (dataInfo.status === 'success') {
                const dataElement = dataInfo.data;
                this.data.userId = dataElement.userID;
                this.data.userName = dataElement.userName;
                this.data.avatarURL = dataElement.avatar.url;
                this.data.fullName = dataElement.fullName;
                this.data.email = dataElement.email;
                this.data.phoneNumber = dataElement.phoneNumber;
                this.data.role = dataElement.roleUser;
            }
        });
        this.endpointFactory.getEndPointWithResponeHeader(this.getUrl).subscribe(data => {
            const aaa = data;
            if (data.body.status === 'success') {
                const temp = [];
                data.body.data.forEach((elementInfo) => {
                    const post = new PostElement();
                    const element = elementInfo.post;
                    post.postId = element.id;
                    post.postName = element.postName;
                    post.userName = element.user.userName;
                    post.userElement = element.user;
                    post.unitPrice = element.unitPrice;
                    post.address = element.address;
                    post.dateOfPost = new Date(element.dateOfPost[0], element.dateOfPost[1], element.dateOfPost[2]);
                    post.province = element.province;
                    post.imageURLs = element.imagePosts;
                    post.category = element.category;
                    if (element.description !== null) {
                        if (element.description.length < 100) {
                            post.description = element.description;
                        } else {
                            post.description = element.description.substr(0, 100) + '...';
                        }
                    } else {
                        post.description = '';
                    }
                    post.calculationUnit = element.calculationUnit;
                    post.averageRate = Number.parseFloat(elementInfo.averageRate);
                    temp.push(post);
                    this.totalPage = data.headers.get('totalPage') * 10;
                    this.page = data.headers.get('pageCurrent') + 1;
                });
                this.dataList = temp;
                this.isLoadData = true;
            }
        });
        setTimeout(() => {
            this.blockUI.stop();
        }, 500);
    }

    showInfo(post: PostElement): void {
        this.localStoreManager.setPostSelected(post.postId);
        this.router.navigateByUrl('/component/item-info');
    }

    onChangePage(pageChange: number): void {
        if (this.page !== pageChange) {
            return;
        }
        this.setUrl(pageChange - 1);
        this.loadData();
    }

}
