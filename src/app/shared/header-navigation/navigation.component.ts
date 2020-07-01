import { Component, AfterViewInit, EventEmitter, Output, AfterContentChecked, OnInit } from '@angular/core';
import {
    NgbModal,
    ModalDismissReasons,
    NgbPanelChangeEvent,
    NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { Router } from '@angular/router';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { SignupComponent } from '../../login/signup/signup.component';
import { LoginComponent } from '../../login/login.component';
declare var $: any;
@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, AfterViewInit, AfterContentChecked {
    @Output() data = new EventEmitter();
    number: any;
    urlAvatar: string;
    checkLogin = true;
    checkDown = true;
    public config: PerfectScrollbarConfigInterface = {};
    @Output() toggleSidebar = new EventEmitter<void>();
    constructor(private modalService: NgbModal, private router: Router, private localStoreManager: LocalStoreManager,
        private endpointFactory: EndpointFactory) {
    }
    ngOnInit(): void {
        this.number = this.localStoreManager.getNumberCart();
        this.urlAvatar = this.localStoreManager.getUrlAvatar();
        this.checkLogin = this.localStoreManager.getCheckLogin();
    }

    ngAfterViewInit() {
    }

    ngAfterContentChecked() {
        this.number = this.localStoreManager.getNumberCart();
        this.checkLogin = this.localStoreManager.getCheckLogin();
        this.urlAvatar = this.localStoreManager.getUrlAvatar();
    }

    onAction(url: string): void {
        this.localStoreManager.setPostSelected('');
        this.localStoreManager.setPageProfile('profile');
        this.router.navigateByUrl(url);
    }

    toStorageCart(): void {
        if (this.localStoreManager.getNumberCart() > 0) {
            this.router.navigateByUrl('/component/storage-cart');
        }
    }

    onMyProfile(): void {
        this.router.navigateByUrl('/component/user-info');
    }

    onSignUp(): void {
        this.modalService.open(SignupComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }

    onLogin(): void {
        this.modalService.open(LoginComponent, { size: 'lg', windowClass: 'login-modal', centered: true });
    }

    logout(): void {
        this.localStoreManager.clearAll();
        location.reload();
    }

    changeDown(check: any): void {
        this.checkDown = check;
    }

}
