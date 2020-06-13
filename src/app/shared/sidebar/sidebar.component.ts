import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStoreManager } from '../../services/local-store-manager.service';
declare var $: any;
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    showMenu = '';
    showSubMenu = '';
    public sidebarnavItems: any[];

    addExpandClass(element: any): void {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    constructor(private localStoreManager: LocalStoreManager, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
    }

    onUrl(sidebarnavItem: any): void {
        this.localStoreManager.setCategoryId(sidebarnavItem.categoryId);
        this.localStoreManager.setPageProfile('');
        this.router.navigateByUrl(sidebarnavItem.path);
    }
}
