import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  CellClickedEvent,
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ITooltipParams,
} from 'ag-grid-community';
import { Subject } from 'rxjs/internal/Subject';
import { QuestionsView } from '../../../../models/QuestionsResult';
import {
  ApplicantapimodelsApplicantVkSurvey,
  ApplicantapimodelsScoreDetail,
  SurveyapimodelsVkStep1Question,
} from '../../../../api/data-contracts';
import { ApiService } from '../../../../api/Api';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-video-result',
  templateUrl: './video-result.component.html',
  styleUrl: './video-result.component.scss',
})
export class VideoResultComponent {
  @Input() survey?: ApplicantapimodelsApplicantVkSurvey;
  @ViewChild('total_score', { static: true }) myElementRef!: ElementRef;
  @ViewChild('persentage', { static: true }) persentageRef!: ElementRef;
  @ViewChild('fullTextDialog') fullTextDialog!: TemplateRef<any>;
  questionsList: QuestionsView[] = [];
  selectedQuestion?: ApplicantapimodelsScoreDetail;
  videoSrc: SafeUrl | undefined;
  videoLoading: boolean = true;

  constructor(private renderer: Renderer2, private api: ApiService, private sanitizer: DomSanitizer, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.survey && this.survey.score_ai!.details) {
      this.selectedQuestion = this.survey!.score_ai!.details![0];
      for (const result of this.survey.score_ai!.details) {
        const answerData: QuestionsView = {
          question: result.question_text!,
          persentage: result.similarity!,
          commentGPT: result.comment_for_similarity!,
          points: 0,
        };
        this.questionsList.push(answerData);
      }
      this.openVideo(this.selectedQuestion.file_id!);
    }
    console.log(this.selectedQuestion);
  }

  ngAfterViewInit() {
    this.changeElementStyle();
  }

  picVideo(question: ApplicantapimodelsScoreDetail): void {
    if (question !== this.selectedQuestion) {
      this.selectedQuestion = question;
      console.log(this.selectedQuestion.question_id);
    }
    this.openVideo(this.selectedQuestion.file_id!);
  }

  openVideo(fileID: string) {
    this.videoLoading = true;
    this.api.v1SpaceApplicantFileDetail(fileID, { responseType: 'blob' }).subscribe({
      next: (data: any) => {
        const objectURL = URL.createObjectURL(data as Blob);
        this.videoSrc = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.videoLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.videoLoading = false;
      }
    })
  }

  changeElementStyle() {
    const nativeElement = this.myElementRef.nativeElement;
    const percentageElement = this.persentageRef.nativeElement;

    if (this.survey?.score_ai?.pass) {
      this.renderer.setStyle(nativeElement, 'color', '#00C437');
    } else {
      this.renderer.setStyle(nativeElement, 'color', '#FF3700');
    }

    this.renderer.setStyle(
      percentageElement,
      'clip-path',
      `inset(0 ${100 - this.survey?.score_ai?.total_score!}% 0 0 round 100px)`
    );
  }

  private gridApi!: GridApi<QuestionsView>;

  answerList: SurveyapimodelsVkStep1Question[] | undefined =
    this.survey?.step1?.questions;
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
      tooltipValueGetter: (params: ITooltipParams) => {
        return 'Показать полностью';
      },
      cellStyle: { cursor: 'pointer' },
      onCellClicked: this.onCommentCellClicked.bind(this)
    },
    // {
    //   field: 'points',
    //   minWidth: 70,
    //   headerName: 'Балл',
    //   headerClass: 'font-medium',
    // },
  ];

  gridOptions: GridOptions = {
    columnDefs: this.colDefs,
    rowData: this.questionsList,
    overlayNoRowsTemplate:
      '<span class="text-[32px] leading-10">Кандидаты отсутствуют</span>',
    loading: false,
    suppressMovableColumns: true,
    suppressScrollOnNewData: true,
    enableBrowserTooltips: false,
    tooltipShowDelay: 0,
  };

  onCommentCellClicked(params: CellClickedEvent): void {
    if (params.colDef.field === 'commentGPT') {
      const fullText = params.value;
      this.openPopover(fullText);
    }
  }

  openPopover(text: string): void {
    this.dialog.open(this.fullTextDialog, {
      data: { text: text },
      hasBackdrop: false,
    });
  }

  closeDialog(): void {
    if (this.dialog) {
      this.dialog.closeAll();
    }
  }
}
