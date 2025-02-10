import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NegotiationView} from '../../../../models/Negotiation';
import {ModelsNegotiationStatus} from '../../../../api/data-contracts';
import {ApiService} from '../../../../api/Api';

@Component({
  selector: 'app-negotiation-detail',
  templateUrl: './negotiation-detail.component.html',
  styleUrl: './negotiation-detail.component.scss',
})
export class NegotiationDetailComponent implements OnChanges {
  @Input() negotiationId!: string;
  @Output() onClose = new EventEmitter();
  isLoading = false;
  negotiation?: NegotiationView;
  comment = new FormControl('');

  constructor(private api: ApiService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['negotiationId']) {
      this.getNegotiationById(this.negotiationId);
    }
  }

  closeDetail() {
    this.onClose.emit();
  }

  changeStatus(event: {id: string, status: ModelsNegotiationStatus}) {
    const {id, status} = event;
    this.api.v1SpaceNegotiationStatusChangeUpdate(id, {status}).subscribe({
      next: (data) => {
        this.getNegotiationById(this.negotiationId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  saveComment() {
    this.api.v1SpaceNegotiationCommentUpdate(this.negotiationId, {comment: this.comment.value || ''}).subscribe({
      next: () => {
        this.getNegotiationById(this.negotiationId);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getNegotiationById(id: string) {
    this.isLoading = true;
    this.api.v1SpaceNegotiationDetail(id, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data) {
          this.negotiation = new NegotiationView(res.body.data);
          this.comment.setValue(res.body.data.comment);
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }
}