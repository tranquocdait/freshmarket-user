import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { NgbTooltip, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../services/endpoint-factory.service';
import { SignupComponent } from './signup/signup.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    roleAdmin = 'admin';
    loginStatus = false;
    @ViewChild('tt', { static: true }) ttUsername: NgbTooltip;
    @BlockUI() blockUI: NgBlockUI;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private router: Router,
        private localStoreManager: LocalStoreManager, private endpointFactory: EndpointFactory, private modalService: NgbModal) {
        this.localStoreManager.removeToken();
        this.createForm();
    }

    loginForm: FormGroup;

    ngOnInit() {

    }

    createForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            memmory: [''],
        });
    }

    onSubmit(): void {
        this.blockUI.start();
        const params: any = {
            userName: this.loginForm.value['userName'],
            password: this.loginForm.value['password']
        };
        this.endpointFactory.postEndPoint(params, 'login').subscribe(data => {
            if (data.status === 'success') {
                this.localStoreManager.setToken(data.data);
                this.endpointFactory.postByHeader(null, 'users/information').subscribe(dataInfor => {
                    if (dataInfor.status === 'success') {
                        if (dataInfor.data.roleUser.roleName !== this.roleAdmin) {
                            this.localStoreManager.setUrlAvatar(dataInfor.data.avatar.url);
                            this.activeModal.close();
                            //location.reload();
                            this.localStoreManager.setCheckLogin(true);
                            this.blockUI.stop();
                        } else {
                            this.loginFailed();
                            this.blockUI.stop();
                        }
                    }
                }, error => {
                    this.loginFailed();
                    this.blockUI.stop();
                }
                );
            }
        }, error => {
            this.loginFailed();
        }
        );
    }

    loginFailed(): void {
        this.localStoreManager.removeToken();
        this.loginStatus = true;
    }

    onSignUp(): void {
        this.activeModal.close();
        this.modalService.open(SignupComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }

}

