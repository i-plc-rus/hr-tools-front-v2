import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { Subject } from 'rxjs/internal/Subject';
import { QuestionsView } from '../../../../models/QuestionsResult';

@Component({
  selector: 'app-video-result',
  templateUrl: './video-result.component.html',
  styleUrl: './video-result.component.scss',
})
export class VideoResultComponent {
  private gridApi!: GridApi<QuestionsView>;
  questionsList: QuestionsView[] = [
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
    { question: 'John', persentage: 90, commentGPT: 'bad', points: 99 },
  ];

  answerList: String[] = [
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
    'Какой у вас опыт холодных B2B-продаж?',
  ]
  colDefs: ColDef[] = [
    {
      field: 'question',
      flex: 1,
      headerName: 'Вопрос',
      headerClass: 'font-medium',
    },
    {
      field: 'persentage',
      minWidth: 132,
      headerName: 'Соответствие, %',
      headerClass: 'font-medium',
    },
    {
      field: 'commentGPT',
      flex: 1,
      headerName: 'Комментарий от GPT API',
      headerClass: 'font-medium',
    },
    {
      field: 'points',
      minWidth: 70,
      headerName: 'Балл',
      headerClass: 'font-medium',
    },
  ];

  gridOptions: GridOptions = {
    columnDefs: this.colDefs,
    rowData: this.questionsList,
    overlayNoRowsTemplate:
      '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loading: false,
    suppressMovableColumns: true,
    suppressScrollOnNewData: true,
  };
}
