import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';

@Component({
    selector: 'app-purchase-buy-info',
    templateUrl: './purchase-buy-info.component.html',
    styleUrls: ['./purchase-buy-info.component.css']
})
export class PurchaseBuyInfoComponent implements OnInit {
    purchaseList: any;

    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory) {
    }

    @Input() data;
    @Output() output = new EventEmitter();

    ngOnInit(): void {
        this.getPurchase();
    }

    getPurchase() {
        this.endpointFactory.getEndPoint('statusPurchases').subscribe(data => {
            if (data.status === 'success') {
                this.purchaseList = data.data;
            }
        }
        );
    }
    clickClose() {
        this.activeModal.close();
    }

}
