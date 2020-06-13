import { Component, OnInit, ChangeDetectorRef, AfterContentChecked, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { PostElement } from '../model/post.model';
import { LocalStoreManager } from '../../services/local-store-manager.service';
import { Router } from '@angular/router';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-list-user-post',
    templateUrl: './list-user-post.component.html',
    styleUrls: ['./list-user-post.component.scss']
})
export class ListUserPostComponent implements OnInit, AfterContentChecked {
    dataList: PostElement[] = null;
    getUrl = '';
    categoryId = 0;
    change = false;
    dataSource: MatTableDataSource<PostElement>;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['imageURL', 'postId', 'postName', 'description', 'unitPrice',
        'dateOfPost', 'province', 'category', 'calculationUnit', 'viewPurchase', 'edit', 'delete'];
    constructor(private router: Router, private modalService: NgbModal, private changeDetectorRefs: ChangeDetectorRef,
        private endpointFactory: EndpointFactory, private localStoreManager: LocalStoreManager) {
        this.loadFisrtData();
        this.setDataSource();
    }
    ngOnInit() {
    }

    loadFisrtData(): void {
        this.setUrl();
        this.loadData();
    }

    loadData(): void {
        this.endpointFactory.getEndPointByHeader(this.getUrl).subscribe(data => {
            if (data.status === 'success') {
                const temp = [];
                data.data.forEach((elementInfo) => {
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
                    temp.unshift(post);

                });
                this.dataList = temp;
            }
        });
    }

    setDataSource() {
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.dataList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }, 1000);

    }

    setUrl(): void {
        this.getUrl = 'users/posts';
    }

    ngAfterContentChecked(): void {
        if (this.localStoreManager.getCategoryId() !== this.categoryId) {
            this.loadFisrtData();
        }
    }

    searchPost(search: string): void {
        //this.getUrl = 'posts/search?keySearch=' + search;
        //this.loadData();
    }

    showInfo(postId: string): void {
        this.localStoreManager.setPostSelected(postId);
        this.router.navigateByUrl('/component/list-item');
    }

    addNewPost(): void {
        const modalRef = this.modalService.open(EditPostComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        modalRef.componentInstance.data = { type: 'addNew' };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.loadData();
                this.setDataSource();
            }
        });
    }

    editPost(element: any): void {
        const modalRef = this.modalService.open(EditPostComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        modalRef.componentInstance.data = { data: element, type: 'edit' };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.loadData();
                this.setDataSource();
            }
        });
    }

    deletePost(element: any): void {
        const modalRef = this.modalService.open(DialogConfirmComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
        modalRef.componentInstance.data = { title: 'Xóa bài đăng', content: 'Bạn muốn xóa bài đăng?' };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.endpointFactory.deleteEndPoint(element.postId, 'posts/' + element.postId).subscribe(data => {
                    if (data.status === 'success') {
                        this.loadData();
                        this.setDataSource();
                    }
                }
                );
            }
        });
    }

}

