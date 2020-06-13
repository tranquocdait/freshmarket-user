import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../../services/endpoint-factory.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-create-comment',
    templateUrl: './create-comment.component.html',
    styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    constructor(public activeModal: NgbActiveModal, private endpointFactory: EndpointFactory) { }
    currentRate = 0;
    @Input() data;
    @Output() output = new EventEmitter();
    editForm: FormGroup;
    checkClick = false;
    commentContent: string;
    isNotError = false;
    ngOnInit() {
    }

    clickClose(): void {
        this.activeModal.close();
    }

    onSubmit(): void {
        if (this.currentRate > 0) {
            this.blockUI.start();
            this.createRate();
            if (this.commentContent !== null && this.commentContent !== '') {
                this.createComment();
            }
            setTimeout(() => {
                this.blockUI.stop();
                this.output.emit('success');
            this.activeModal.close();
            }, 2000);
        }
        this.checkClick = true;
    }

    createRate(): void {
        const params: any = {
            postId: this.data.data.postId,
            rateNumber: this.currentRate,
        };
        this.endpointFactory.postByHeader(params, 'posts/rates').subscribe(data => {
            if (data.status === 'success') {

            }
        }, error => {

        });
    }

    createComment(): void {
        const params: any = {
            postID: this.data.data.postId,
            content: this.commentContent,
        };
        this.endpointFactory.postByHeader(params, 'posts/comments').subscribe(data => {
            if (data.status === 'success') {

            }
        }, error => {

        });
    }

    checkRate(): boolean {
        if (this.currentRate === 0 && this.checkClick) {
            return true;
        }
        return false;
    }
}
