import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {NegotiationView} from '../../../../models/Negotiation';
import {MockDataService} from '../../../../services/mock-data.service';
import {ModelsNegotiationStatus} from '../../../../api/data-contracts';

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

  constructor(private mockApi: MockDataService) { }
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
    console.log('Смена статуса', id, status);
    // this.api.v1SpaceNegotiationStatusChangeUpdate(id, {status}).subscribe({
    //   next: (data) => {
    //     this.getNegotiationById(this.negotiationId);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

  saveComment() {
    console.log('Сохранение комментария', this.comment.value);
    // this.api.v1SpaceNegotiationCommentUpdate(this.negotiationId, {comment: this.comment.value}).subscribe({
    //   next: (data) => {
    //     this.getNegotiationById(this.negotiationId);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // });
  }

  getNegotiationById(id: string) {
    console.log(id);
    this.isLoading = true;
    this.mockApi.getNegotiationById(id).subscribe({
      next: (res) => {
        this.negotiation = res;
        this.comment.setValue(res.comment);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      }
    });
  }
}