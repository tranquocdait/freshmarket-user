import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndpointFactory } from '../../../services/endpoint-factory.service';
import { CheckValidatorService } from '../../../services/check-validator.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
    @BlockUI() blockUI: NgBlockUI;
    calculationUnitList: any;
    provinceList: any;
    categoryList: any;
    imageBase64: string;
    urls = [];

    constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private endpointFactory: EndpointFactory,
        public checkValidatorService: CheckValidatorService) {
    }

    @Input() data;
    @Output() output = new EventEmitter();
    editForm: FormGroup;

    ngOnInit(): void {
        this.getCalculationUnit();
        this.getProvince();
        this.getCategory();
        this.createForm();
    }

    getCalculationUnit() {
        this.endpointFactory.getEndPoint('caculationUnits').subscribe(data => {
            if (data.status === 'success') {
                this.calculationUnitList = data.data;
            }
        }
        );
    }
    getCategory() {
        this.endpointFactory.getEndPoint('categories').subscribe(data => {
            if (data.status === 'success') {
                this.categoryList = data.data;
            }
        }
        );
    }
    getProvince() {
        this.endpointFactory.getEndPoint('provinces').subscribe(data => {
            if (data.status === 'success') {
                this.provinceList = data.data;
            }
        }
        );
    }

    createForm() {
        if (this.data.type === 'edit') {
            this.modeEdit();
        } else {
            this.modeAddNew();
        }
    }

    modeAddNew() {
        this.editForm = this.formBuilder.group({
            postId: ['', Validators.required],
            userName: ['', Validators.required],
            postName: ['', Validators.required],
            unitPrice: ['000', Validators.required],
            address: ['', Validators.required],
            description: ['', Validators.required],
            province: ['', Validators.required],
            imageURL: ['', Validators.required],
            calculationUnit: ['', Validators.required],
            category: ['', Validators.required]
        });
    }

    modeEdit() {
        this.editForm = this.formBuilder.group({
            postId: [this.data.data.postId, Validators.required],
            userName: [this.data.data.userName, Validators.required],
            postName: [this.data.data.postName, Validators.required],
            unitPrice: [this.data.data.unitPrice, Validators.required],
            address: [this.data.data.address, Validators.required],
            description: [this.data.data.description, Validators.required],
            province: [this.data.data.province.id, Validators.required],
            imageURL: ['', Validators.required],
            calculationUnit: [this.data.data.calculationUnit.id, Validators.required],
            category: [this.data.data.category.id, Validators.required]
        });
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
        if (this.data.type === 'edit') {
            this.editPost();
        } else {
            this.createPost();
        }
    }

    createPost(): void {
        this.blockUI.start();
        const params: any = {
            id: this.editForm.value['postId'],
            postName: this.editForm.value['postName'],
            userName: this.editForm.value['userName'],
            unitPrice: Number.parseFloat(this.editForm.value['unitPrice']),
            address: this.editForm.value['address'],
            description: this.editForm.value['description'],
            provinceID: Number.parseInt(this.editForm.value['province']),
            calculationUnitID: Number.parseInt(this.editForm.value['calculationUnit']),
            categoryID: Number.parseInt(this.editForm.value['category']),
            imageBase64s: this.urls,
        };
        this.endpointFactory.postByHeader(params, 'posts/create').subscribe(data => {
            if (data.status === 'success') {
                this.output.emit('success');
                this.activeModal.close();
                setTimeout(() => {
                    this.blockUI.stop();
                }, 500);
            }
        }, error => {
            setTimeout(() => {
                this.blockUI.stop();
            }, 500);
        }
        );
    }

    editPost(): void {
        this.blockUI.start();
        const params: any = {
            id: this.editForm.value['postId'],
            postName: this.editForm.value['postName'],
            userName: this.editForm.value['userName'],
            unitPrice: Number.parseFloat(this.editForm.value['unitPrice']),
            address: this.editForm.value['address'],
            description: this.editForm.value['description'],
            provinceID: Number.parseInt(this.editForm.value['province']),
            calculationUnitID: Number.parseInt(this.editForm.value['calculationUnit']),
            categoryID: Number.parseInt(this.editForm.value['category']),
            imageBase64s: this.urls,
        };
        {
            this.endpointFactory.putEndPoint(params, 'posts/' + this.data.data.postId).subscribe(data => {
                if (data.status === 'success') {
                    this.output.emit('success');
                    this.activeModal.close();
                    setTimeout(() => {
                        this.blockUI.stop();
                    }, 100);
                }
            }
            );
        }
    }

    checkAmount(): boolean {
        return this.checkValidatorService.isNumber(this.editForm.value['unitPrice']);
    }

    onSelectFile(event): void {
        if (event.target.files && event.target.files[0]) {
            const filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.onload = (event2) => {
                    const target: any = event2.target;
                    this.urls.push(target.result);
                };
            }
            console.log(this.urls);
        }
    }
}
