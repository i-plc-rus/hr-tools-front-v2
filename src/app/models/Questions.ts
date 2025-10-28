import { SurveyapimodelsVkStep0Question, SurveyapimodelsVkStep1SurveyQuestion } from '../api/data-contracts';

export class QuestionView implements SurveyapimodelsVkStep0Question {
  /** Варианты ответов */
  answers?: string[];
  /** Идентификатор вопроса */
  question_id?: string;
  /** Текст вопроса */
  question_text?: string;
  /** Тип вопроса */
  question_type?: string;

  constructor(question: SurveyapimodelsVkStep0Question) {
    Object.assign(this, question);
  }
}


export class VideoQuestionView implements SurveyapimodelsVkStep1SurveyQuestion {
  /** Идентификатор вопроса */
  id?: string;
  /** Порядковый номер */
  order?: number;
  /** Текст вопроса */
  text?: string;

  constructor(question: SurveyapimodelsVkStep1SurveyQuestion) {
    Object.assign(this, question);
  }
}
