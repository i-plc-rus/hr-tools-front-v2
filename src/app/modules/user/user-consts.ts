import {
  ModelsEducationType,
  ModelsEmployment,
  ModelsExperience,
  ModelsExperienceType,
  ModelsGenderType,
  ModelsLanguageLevelType,
  ModelsRelocationType,
  ModelsSchedule,
  ModelsSearchStatusType,
  ModelsTripReadinessType,
  ModelsVacancyStatus
} from "../../api/data-contracts";
import {StatusTag} from "../../models/StatusTag";

export const scheduleTypes: {label: string, value: ModelsSchedule}[] = [
  {label: 'Полный день', value: ModelsSchedule.ScheduleFullDay},
  {label: 'Неполная занятость', value: ModelsSchedule.SchedulePartTime},
  {label: 'Гибкий график', value: ModelsSchedule.ScheduleFlexible},
  {label: 'Сменный график', value: ModelsSchedule.ScheduleShift},
  {label: 'Вахтовый метод', value: ModelsSchedule.ScheduleFlyInFlyOut},
];

export const tripReadinessTypes: {label: string, value: ModelsTripReadinessType}[] = [
  {label: 'Готов к командировкам', value: ModelsTripReadinessType.TripReadinessReady},
  {label: 'Иногда готов к командировкам', value: ModelsTripReadinessType.TripReadinessSometimes},
  {label: 'Не готов к командировкам', value: ModelsTripReadinessType.TripReadinessNever},
];

export const relocationTypes: {label: string, value: ModelsRelocationType}[] = [
  {label: 'Не готов к переезду', value: ModelsRelocationType.RelocationTypeNo},
  {label: 'Готов к переезду', value: ModelsRelocationType.RelocationTypeYes},
  {label: 'Хочу переехать', value: ModelsRelocationType.RelocationTypeWant},
];

export const languageLevelTypes: {label: string, value: ModelsLanguageLevelType}[] = [
  {label: 'A1 - Начальный', value: ModelsLanguageLevelType.LanguageLevelA1},
  {label: 'A2 - Элементарный', value: ModelsLanguageLevelType.LanguageLevelA2},
  {label: 'B1 - Средний', value: ModelsLanguageLevelType.LanguageLevelB1},
  {label: 'B2 - Средне-продвинуый', value: ModelsLanguageLevelType.LanguageLevelB2},
  {label: 'C1 - Продвинутый', value: ModelsLanguageLevelType.LanguageLevelC1},
  {label: 'C2 - В совершенстве', value: ModelsLanguageLevelType.LanguageLevelC2},
  {label: 'Родной язык', value: ModelsLanguageLevelType.LanguageLevelL1},
];

export const searchStatusTypes: {label: string, value: ModelsSearchStatusType}[] = [
  {label: 'Активно ищет работу', value: ModelsSearchStatusType.SearchStatusActive},
  {label: 'Рассматривает предложения', value: ModelsSearchStatusType.SearchStatusLookingForOffers},
  {label: 'Не ищет работу', value: ModelsSearchStatusType.SearchStatusNotLookingForJob},
  {label: 'Предложили работу, решает', value: ModelsSearchStatusType.SearchStatusHasJobOffer},
  {label: 'Вышел на новое место', value: ModelsSearchStatusType.SearchStatusAcceptedJobOffer},
];

export const employmentTypes: {label: string, value: ModelsEmployment}[] = [
  {label: 'Полная занятость', value: ModelsEmployment.EmploymentFull},
  {label: 'Частичная занятость', value: ModelsEmployment.EmploymentPartial},
  {label: 'Временная занятость', value: ModelsEmployment.EmploymentTemporary},
  {label: 'Интернатура', value: ModelsEmployment.EmploymentInternship},
  {label: 'Стажировка', value: ModelsEmployment.EmploymentProbation},
  {label: 'Волонтерство', value: ModelsEmployment.EmploymentVolunteer},
];

export const genderTypes: {label: string, value: ModelsGenderType}[] = [
  {label: 'Мужской', value: ModelsGenderType.GenderTypeM},
  {label: 'Женский', value: ModelsGenderType.GenderTypeF},
];

export const educationTypes: {label: string, value: ModelsEducationType}[] = [
  {label: 'Среднее', value: ModelsEducationType.EducationTypeSecondary},
  {label: 'Среднее профессиональное', value: ModelsEducationType.EducationTypeSpecialSecondary},
  {label: 'Незаконченное высшее', value: ModelsEducationType.EducationTypeUnfinishedHigher},
  {label: 'Высшее', value: ModelsEducationType.EducationTypeHigher},
  {label: 'Бакалавр', value: ModelsEducationType.EducationTypeBachelor},
  {label: 'Магистр', value: ModelsEducationType.EducationTypeMaster},
  {label: 'Кандидат наук', value: ModelsEducationType.EducationTypeCandidate},
  {label: 'Доктор наук', value: ModelsEducationType.EducationTypeDoctor},
];

export const experienceTypes: {label: string, value: ModelsExperience}[] = [
  {label: 'Не имеет значения', value: ModelsExperience.ExperienceNoMatter},
  {label: 'От 1 года', value: ModelsExperience.ExperienceMoreThan1},
  {label: 'От 3 лет', value: ModelsExperience.ExperienceMoreThan3},
  {label: 'От 5 лет', value: ModelsExperience.ExperienceMoreThan5},
  {label: 'От 10 лет', value: ModelsExperience.ExperienceMoreThan10},
];

export const experienceBetweenTypes: {label: string, value: ModelsExperienceType}[] = [
  {label: 'Нет опыта', value: ModelsExperienceType.ExperienceTypeNo},
  {label: 'От 1 до 3 лет', value: ModelsExperienceType.ExperienceTypeBetween1And3},
  {label: 'От 3 до 6 лет', value: ModelsExperienceType.ExperienceTypeBetween3And6},
  {label: 'Более 6 лет', value: ModelsExperienceType.ExperienceTypeMoreThan6},
];

export const vacancyStatuses: {className: StatusTag; value: ModelsVacancyStatus}[] = [
  {className: 'success', value: ModelsVacancyStatus.VacancyStatusOpened},
  {className: 'warning', value: ModelsVacancyStatus.VacancyStatusSuspended},
  {className: 'danger', value: ModelsVacancyStatus.VacancyStatusCanceled},
  {className: 'default', value: ModelsVacancyStatus.VacancyStatusClosed},
];