import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  currentRate = 0;
  @Input() data;
  @Output() output = new EventEmitter();

  ngOnInit() {
  }
  onClose() {
    this.activeModal.close();
  }
  onSubmit() {
    this.output.emit('success');
    this.activeModal.close();
  }
}
