import {Component, Input, OnInit} from '@angular/core';
import {VacancyModalService} from '../../../services/vacancy-modal.service';

@Component({
  selector: 'app-view-comment-modal',
  templateUrl: './view-comment-modal.component.html',
  styleUrl: './view-comment-modal.component.scss',
})
export class ViewCommentModalComponent implements OnInit {
  @Input() comment: string = '';

  constructor(
    private modalService: VacancyModalService,
  ) { }

  ngOnInit(): void {
    
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
