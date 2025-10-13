import { SurveyapimodelsVkStep0Question } from '../api/data-contracts';

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
