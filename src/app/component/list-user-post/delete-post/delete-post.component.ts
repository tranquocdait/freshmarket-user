import { Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../../services/endpoint-factory.service';


@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.scss']
})
export class DeletePostComponent implements OnInit {
  @Input() data;
  @Output() output = new EventEmitter();
  constructor(public activeModal: NgbActiveModal,private endpointFactory:EndpointFactory) { }

  ngOnInit() {
  }
  clickClose(){
    this.activeModal.close();
  }
  clickDelete(){
    let params=this.data.data.postId;
    this.endpointFactory.deleteEndPoint(params, "posts/"+params).subscribe(data => {
      if (data.status === "success") {
        this.output.emit("success");
        this.activeModal.close();
      }
    }
    );
  }
}
