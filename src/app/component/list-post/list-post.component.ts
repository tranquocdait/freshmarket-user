
import { Component, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { PostElement } from '../model/post.model';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, AfterContentChecked {
    dataList: PostElement[] = null;
    getUrl = '';
    categoryId = 0;
    page = 1;
    totalPage = 1;
    change = false;
    constructor(private router: Router, private modalService: NgbModal, private changeDetectorRefs: ChangeDetectorRef,
        private endpointFactory: EndpointFactory, private localStoreManager: LocalStoreManager) {
        this.loadFisrtData();
    }
    ngOnInit() {
    }

    loadFisrtData(): void {
        this.setUrl(0);
        this.loadData();
    }
    loadData(): void {
        this.endpointFactory.getEndPointWithResponeHeader(this.getUrl).subscribe(data => {
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
            }
        });
    }

    setUrl(page: number): void {
        this.categoryId = this.localStoreManager.getCategoryId();
        if (this.localStoreManager.getCategoryId() === 0) {
            this.getUrl = 'posts/' + page + '/getAll';
        } else {
            this.getUrl = 'posts/' + this.localStoreManager.getCategoryId() + '/' + page + '/category';
        }
    }

    ngAfterContentChecked(): void {
        if (this.localStoreManager.getCategoryId() !== this.categoryId) {
            this.loadFisrtData();
        }
    }

    searchPost(search: string): void {
        this.getUrl = 'posts/search?keySearch=' + search;
        this.loadData();
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

