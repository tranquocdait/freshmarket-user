import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
    selector: 'app-purchase-info',
    templateUrl: './purchase-info.component.html',
    styleUrls: ['./purchase-info.component.scss']
})
export class PurchaseInfoComponent implements OnInit {
    purchaseList: any;
    transportTypeList: any;
    transportType: any;
    isTransport = false;
    transportCost: string;
    isPending = false;
    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
    }

    @Input() data;
    @Output() output = new EventEmitter();

    ngOnInit(): void {
        this.getPurchase();
        this.gettransportType();
        this.createForm();
    }

    getPurchase(): void {
        this.endpointFactory.getEndPoint('statusPurchases').subscribe(data => {
            if (data.status === 'success') {
                this.purchaseList = data.data;
            }
        }
        );
    }

    gettransportType(): void {
        this.endpointFactory.getEndPoint('transportationTypes').subscribe(data => {
            if (data.status === 'success') {
                this.transportTypeList = data.data;
            }
        }
        );
    }

    createForm() {
        if (this.data.type === 'edit') {
        }
    }
    clickClose() {
        this.activeModal.close();
    }

    onSubmit(statusPurchaseId: number): void {
        let params: any = {
            purchaseId: this.data.data.purchaseId,
            statusPurchaseId: statusPurchaseId + 1,
            transportationTypeId: this.transportType
        };
        if (this.transportCost !== null && this.transportCost !== '') {
            params = {
                ...params,
                transportCost: this.transportCost
            };
        }
        this.endpointFactory.putByHeader(params, 'purchases/update').subscribe(data => {
            if (data.status === 'success') {
                this.output.emit('success');
                this.activeModal.close();
            }
        }
        );
    }

    onChangeTransportType(): void {
        if (this.transportType !== '1') {
            this.isTransport = true;
        }
    }
}
