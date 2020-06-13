import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { UserElement } from '../model/user.model';
import { LocalStoreManager } from '../../services/local-store-manager.service';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

    constructor(private modalService: NgbModal, private endpointFactory: EndpointFactory, private localStoreManager: LocalStoreManager) {
        this.loadData();
    }
    data = new UserElement();
    isLoadData = false;
    ngOnInit() {
    }
    loadData() {
        this.endpointFactory.postByHeader(null, 'users/information').subscribe(dataInfo => {
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
            this.localStoreManager.setUrlAvatar(this.data.avatarURL);
            this.isLoadData = true;
        }
        );
    }
    changeInfor() {
        const modalRef = this.modalService.open(EditUserComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        modalRef.componentInstance.data = { data: this.data, type: 'edit' };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.loadData();
            }
        });
    }
    changePassword() {
        const modalRef = this.modalService.open(ChangePasswordComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        modalRef.componentInstance.data = { data: this.data };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.loadData();
            }
        });
    }
}
