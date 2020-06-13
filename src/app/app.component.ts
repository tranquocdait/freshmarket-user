import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router, private localStoreManager: LocalStoreManager, private endpointFactory: EndpointFactory) {
        this.getCheckLogin();
    }
    getCheckLogin(): void {
        if (this.localStoreManager.getToken() === null) {
            this.router.navigateByUrl('/component/list-post');
        } else {
            this.endpointFactory.postByHeader(null, 'users/information').subscribe(dataInfor => {
                if (dataInfor.status !== 'success') {
                    this.localStoreManager.clearAll();
                }
            }, error => {
                this.localStoreManager.clearAll();
            });
        }
    }
}
