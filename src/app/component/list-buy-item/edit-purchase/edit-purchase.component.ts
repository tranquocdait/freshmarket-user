import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-edit-purchase',
    templateUrl: './edit-purchase.component.html',
    styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent implements OnInit {
    roleList: any;
    imageBase64: string;
    messageErrorArray = { corfirmPassword: 'Nhập lại mật khẩu không đúng' };
    messageError: any;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
    }
    @BlockUI() blockUI: NgBlockUI;
    @Input() data;
    @Output() output = new EventEmitter();
    editForm: FormGroup;
    numberItem = 0;
    isDataLoad = false;
    ngOnInit(): void {
        this.createForm();
    }

    createForm() {
        console.log(this.data);
        this.numberItem = this.data.data.purchaseNumber;
        this.editForm = this.formBuilder.group({
            buyerName: [this.data.data.buyerName, Validators.required],
            address: [this.data.data.address, Validators.required],
            phoneNumber: [this.data.data.phoneNumber, Validators.required],
            purchaseNumber: [this.data.data.purchaseNumber, Validators.required]
        });
        this.isDataLoad = true;
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

    clickClose() {
        this.activeModal.close();
    }

    changeToBase64(event) {
        const files = event.target.files;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(files[0]);
    }

    _handleReaderLoaded(readerEvt) {
        this.imageBase64 = readerEvt.target.result;
    }

    onSubmit(): void {
        if (this.checkForm()) {
            const params: any = {
                buyerName: this.editForm.value['buyerName'],
                address: this.editForm.value['address'],
                phoneNumber: this.editForm.value['phoneNumber'],
                purchaseNumber: this.numberItem,
                purchaseId: this.data.data.purchaseId,
            };
            this.endpointFactory.putByHeader(params, 'purchases/update').subscribe(data => {
                this.blockUI.start();
                if (data.status === 'success') {
                    this.output.emit('success');
                    this.activeModal.close();
                    this.blockUI.stop();
                }
            }, error => {
                this.blockUI.stop();
            });
        }
    }

    checkForm(): boolean {
        return true;
    }
}
