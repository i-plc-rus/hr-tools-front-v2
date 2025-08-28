import { Component, Input, OnInit } from '@angular/core';
import { VacancyModalService } from '../../../services/vacancy-modal.service';

@Component({
  selector: 'app-view-comment-modal',
  templateUrl: './view-comment-modal.component.html',
  styleUrl: './view-comment-modal.component.scss',
})
export class ViewCommentModalComponent implements OnInit {
  @Input() comment: string = '';
  newCommentOpened = true;
  count: boolean[] = [false, false, false, false];

  constructor(private modalService: VacancyModalService) {}

  ngOnInit(): void {}

  openCommentByIndex(index: number) {
    for (let i = 0; i < this.count.length; i++) {
      if (index === -1) {
        this.newCommentOpened = true;
        this.count[i] = false;
      } else {
        this.newCommentOpened = false;
        if (i === index) {
          this.count[i] = true;
        } else {
          this.count[i] = false;
        }
      }
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
