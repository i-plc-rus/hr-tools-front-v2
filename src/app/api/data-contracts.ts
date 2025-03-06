/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AdminpanelapimodelsUser {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  phone_number?: string;
  role?: ModelsUserRole;
}

export interface AdminpanelapimodelsUserUpdate {
  email?: string;
  first_name?: string;
  is_active?: boolean;
  last_name?: string;
  password?: string;
  phone_number?: string;
  role?: ModelsUserRole;
}

export interface AdminpanelapimodelsUserView {
  email?: string;
  first_name?: string;
  id?: string;
  last_login?: string;
  last_name?: string;
  password?: string;
  phone_number?: string;
  role?: ModelsUserRole;
}

export interface ApimodelsResponse {
  /** данные ответа */
  data?: any;
  /** сообщение ошибки */
  message?: string;
  /** результат обработки fail/success */
  status?: string;
}

export interface ApimodelsScrollerResponse {
  /** данные ответа */
  data?: any;
  /** сообщение ошибки */
  message?: string;
  /** для списков, общее кол-во записей, учитывая фильтр (если он есть) */
  row_count?: number;
  /** результат обработки fail/success */
  status?: string;
}

export interface ApplicantapimodelsApplicantData {
  /** Адрес */
  address?: string;
  /** Дата рождения ДД.ММ.ГГГГ */
  birth_date?: string;
  /** Гражданство */
  citizenship?: string;
  /** Коментарий */
  comment?: string;
  /** Емайл */
  email?: string;
  /** Имя */
  first_name?: string;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Фамилия */
  last_name?: string;
  /** Отчество */
  middle_name?: string;
  /** Доподнительные параметры */
  params?: DbmodelsApplicantParams;
  /** Телефон */
  phone?: string;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** Желаемая ЗП */
  salary?: number;
  /** Источник кандидата */
  source?: ModelsApplicantSource;
  /** Опыт работ в месяцах */
  total_experience?: number;
  /** Идентификатор вакансии */
  vacancy_id?: string;
}

export interface ApplicantapimodelsApplicantDuplicate {
  /** Идентификатор кандидата */
  duplicate_id?: string;
  /** Тип дубля (По автору резюме/По контактным данным) */
  duplicate_type?: ModelsDuplicateType;
  /** Найден */
  found?: boolean;
}

export interface ApplicantapimodelsApplicantFilter {
  /** Дата добавления кандидата ДД.ММ.ГГГГ */
  added_day?: string;
  /** Период добавления кандидата */
  added_period?: ModelsApAddedPeriodType;
  /** Тип добавления */
  added_type?: ModelsAddedType;
  /** Возраст "от" */
  age_from?: number;
  /** Возраст "до" */
  age_to?: number;
  /** Город проживания */
  city?: string;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Знание языков */
  language?: string;
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** График работы */
  schedule?: ModelsSchedule;
  /** Поиск по ФИО/телефон/емайл/тег */
  search?: string;
  sort?: ApplicantapimodelsApplicantSort;
  /** Источник */
  source?: ModelsApplicantSource;
  /** Этап */
  stage_name?: string;
  /** Статус кандидата */
  status?: ModelsApplicantStatus;
  /** Тэг */
  tag?: string;
  /** Опыт работ в месяцах "от" */
  total_experience_from?: number;
  /** Опыт работ в месяцах "до" */
  total_experience_to?: number;
  /** Идентификатор вакансии */
  vacancy_id?: string;
  /** Название вакансии */
  vacancy_name?: string;
}

export interface ApplicantapimodelsApplicantHistoryFilter {
  /** Только комментарии */
  comments_only?: boolean;
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
}

export interface ApplicantapimodelsApplicantHistoryView {
  /** Тип действия */
  action_type?: DbmodelsActionType;
  /** Изменения */
  changes?: DbmodelsApplicantChanges;
  /** дата записи dd.mm.yyyy */
  date?: string;
  /** время записи HH:mm */
  time?: string;
  /** Идентификатор сотрудника */
  user_id?: string;
  /** Имя сотрудника */
  user_name?: string;
  /** Идентификатор вакансии */
  vacancy_id?: string;
  /** Название вакансии */
  vacancy_name?: string;
}

export interface ApplicantapimodelsApplicantNote {
  /** Приватный */
  is_private?: boolean;
  /** Комментарий */
  note?: string;
}

export interface ApplicantapimodelsApplicantSort {
  /** Дата добавления, порядок сортировки false = ASC/ true = DESC / nil = нет */
  accept_date_desc?: boolean;
  /** ФИО, порядок сортировки false = ASC/ true = DESC / nil = нет */
  fio_desc?: boolean;
  /** ЗП, порядок сортировки false = ASC/ true = DESC / nil = нет */
  salary_desc?: boolean;
}

export interface ApplicantapimodelsApplicantSourceData {
  /** Откликнулись */
  adding_source?: ApplicantapimodelsSourceData;
  /** Добавлены */
  negotiation_source?: ApplicantapimodelsSourceData;
  /** Общая статистика */
  total_source?: ApplicantapimodelsSourceData;
}

export interface ApplicantapimodelsApplicantView {
  /** Дата добавления */
  accept_date?: string;
  /** Адрес */
  address?: string;
  /** возраст */
  age?: number;
  /** Дата рождения ДД.ММ.ГГГГ */
  birth_date?: string;
  /** Гражданство */
  citizenship?: string;
  /** Коментарий */
  comment?: string;
  /** Емайл */
  email?: string;
  /** ФИО кандидата */
  fio?: string;
  /** Имя */
  first_name?: string;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Идентификатор кандидата */
  id?: string;
  /** Фамилия */
  last_name?: string;
  /** Отчество */
  middle_name?: string;
  /** Дата отклика во внешней системе ДД.ММ.ГГГГ */
  negotiation_date?: string;
  /** Идентификатор отклика во внешней системе */
  negotiation_id?: string;
  /** Доподнительные параметры */
  params?: DbmodelsApplicantParams;
  /** Телефон */
  phone?: string;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** Идентификатор резюме во внешней системе */
  resume_id?: string;
  /** Заголовок резюме */
  resume_title?: string;
  /** Желаемая ЗП */
  salary?: number;
  /** Идентификатор этапа подбора кандидата */
  selection_stage_id?: string;
  /** Название этапа */
  selection_stage_name?: string;
  /** Источник кандидата */
  source?: ModelsApplicantSource;
  /** Время на этапе */
  stage_time?: string;
  /** Дата выхода */
  start_date?: string;
  /** Статус кандидата */
  status?: ModelsApplicantStatus;
  /** Опыт работ в месяцах */
  total_experience?: number;
  /** Идентификатор вакансии */
  vacancy_id?: string;
  /** Название вакансии */
  vacancy_name?: string;
}

export interface ApplicantapimodelsApplicantViewExt {
  /** Дата добавления */
  accept_date?: string;
  /** Адрес */
  address?: string;
  /** возраст */
  age?: number;
  /** Дата рождения ДД.ММ.ГГГГ */
  birth_date?: string;
  /** Гражданство */
  citizenship?: string;
  /** Коментарий */
  comment?: string;
  /** Идентификатор кандидатов дубликатов */
  duplicates?: string[];
  /** Емайл */
  email?: string;
  /** ФИО кандидата */
  fio?: string;
  /** Имя */
  first_name?: string;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Идентификатор кандидата */
  id?: string;
  /** Фамилия */
  last_name?: string;
  /** Отчество */
  middle_name?: string;
  /** Дата отклика во внешней системе ДД.ММ.ГГГГ */
  negotiation_date?: string;
  /** Идентификатор отклика во внешней системе */
  negotiation_id?: string;
  /** Доподнительные параметры */
  params?: DbmodelsApplicantParams;
  /** Телефон */
  phone?: string;
  /** Возможный дубликат */
  potential_duplicate?: ApplicantapimodelsApplicantDuplicate;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** Идентификатор резюме во внешней системе */
  resume_id?: string;
  /** Заголовок резюме */
  resume_title?: string;
  /** Желаемая ЗП */
  salary?: number;
  /** Идентификатор этапа подбора кандидата */
  selection_stage_id?: string;
  /** Название этапа */
  selection_stage_name?: string;
  /** Источник кандидата */
  source?: ModelsApplicantSource;
  /** Время на этапе */
  stage_time?: string;
  /** Дата выхода */
  start_date?: string;
  /** Статус кандидата */
  status?: ModelsApplicantStatus;
  tags?: string[];
  /** Опыт работ в месяцах */
  total_experience?: number;
  /** Идентификатор вакансии */
  vacancy_id?: string;
  /** Название вакансии */
  vacancy_name?: string;
}

export interface ApplicantapimodelsMultiChangeStageRequest {
  /** идентификаторы кандидатов */
  ids?: string[];
  /** идентификаторы этапа */
  stage_id?: string;
}

export interface ApplicantapimodelsMultiEmailResponse {
  /** список ФИО кандидатов которым не удалось отправить письма */
  fail_mails?: string[];
}

export interface ApplicantapimodelsMultiRejectRequest {
  /** идентификаторы кандидатов */
  ids?: string[];
  reject?: ApplicantapimodelsRejectRequest;
}

export interface ApplicantapimodelsRejectRequest {
  /** Инициатор отказа */
  initiator?: ModelsRejectInitiator;
  /** Причина отказа */
  reason?: string;
}

export interface ApplicantapimodelsSourceData {
  data?: ApplicantapimodelsSourceItem[];
  total?: number;
}

export interface ApplicantapimodelsSourceItem {
  count?: number;
  name?: string;
  percent?: number;
}

export interface ApplicantapimodelsXlsExportRequest {
  /** Фильтр скроллера, в случае если не указан список идентификатов */
  filter?: ApplicantapimodelsApplicantFilter;
  /** список идентификатов кандидатов */
  ids?: string[];
}

export interface AuthapimodelsJWTRefreshRequest {
  refresh_token?: string;
}

export interface AuthapimodelsJWTResponse {
  refresh_token?: string;
  token?: string;
}

export interface AuthapimodelsLoginRequest {
  email?: string;
  password?: string;
}

export interface AuthapimodelsPasswordRecovery {
  /** емайл для отправки письма с иснтвукцией, он же логин */
  email?: string;
}

export interface AuthapimodelsPasswordResetRequest {
  new_password?: string;
  reset_code?: string;
}

export interface AuthapimodelsSendEmail {
  /** Почта, на которую надо отправить письмо с подтверждением */
  email?: string;
}

export interface AvitoapimodelsVacancyAttach {
  /** идентификатор вакансии в виде: 3364561973 */
  id?: number;
}

export enum DbmodelsActionType {
  HistoryTypeComment = "comment",
  HistoryTypeAdded = "added",
  HistoryTypeUpdate = "update",
  HistoryTypeNegotiation = "negotiation",
  HistoryTypeStageChange = "stage_change",
  HistoryTypeDuplicate = "duplicate",
  HistoryTypeArchive = "archive",
  HistoryTypeReject = "reject",
  HistoryTypeEmail = "reject",
}

export interface DbmodelsApplicantChange {
  /** Измененное поле */
  field?: string;
  /** Новое значение */
  new_value?: any;
  /** Старое значение */
  old_value?: any;
}

export interface DbmodelsApplicantChanges {
  /** Список изменений */
  data?: DbmodelsApplicantChange[];
  /** Комментрий */
  description?: string;
}

export interface DbmodelsApplicantParams {
  /** Водительсике права */
  driver_license_types?: ModelsDriverLicenseType[];
  /** Образование */
  education?: ModelsEducationType;
  /** Занятость */
  employments?: ModelsEmployment[];
  /** Повышение квалификации, курсы */
  have_additional_education?: boolean;
  /** Знание языков */
  languages?: DbmodelsLanguage[];
  /** График работы */
  schedules?: ModelsSchedule[];
  /** Статус поиска работы */
  search_status?: ModelsSearchStatusType;
  /** Готовность к командировкам */
  trip_readiness?: ModelsTripReadinessType;
}

export interface DbmodelsLanguage {
  language_level?: ModelsLanguageLevelType;
  name?: string;
}

export interface DbmodelsNegotiationFilter {
  /** Повышение квалификации, курсы */
  advanced_training?: boolean;
  /** Гражданство */
  citizenship?: string;
  /** Город проживания */
  city?: string;
  /** Водительсике права */
  driver_licence?: ModelsDriverLicenseType[];
  /** Образование */
  education?: ModelsEducationType;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт */
  experience?: ModelsExperienceType;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Статус поиска работы */
  job_search_statuses?: ModelsSearchStatusType;
  /** Знание языка */
  language?: string;
  /** Уровень знания языка */
  language_level?: ModelsLanguageLevelType;
  /** Период отклика на вакансию */
  response_period?: ModelsResponsePeriodType;
  /** Уровень дохода от */
  salary_from?: number;
  /** Указан доход */
  salary_provided?: boolean;
  /** Уровень дохода до */
  salary_to?: number;
  /** График работы */
  schedule?: ModelsSchedule;
  /** поиск по ФИО/телефон/емайл */
  search?: string;
  /** Метка поиска резюме */
  search_label?: ModelsSearchLabelType;
  /** Источник */
  source?: ModelsApplicantSource;
  /** Готовность к командировкам */
  trip_readiness?: ModelsTripReadinessType;
  /** идентификатор вакансии */
  vacancy_id?: string;
}

export interface DictapimodelsCityData {
  address?: string;
}

export interface DictapimodelsCityView {
  address?: string;
  id?: string;
}

export interface DictapimodelsCompanyData {
  name?: string;
}

export interface DictapimodelsCompanyStructData {
  name?: string;
}

export interface DictapimodelsCompanyStructView {
  id?: string;
  name?: string;
}

export interface DictapimodelsCompanyView {
  id?: string;
  name?: string;
}

export interface DictapimodelsDepartmentData {
  company_struct_id?: string;
  name?: string;
  parent_id?: string;
}

export interface DictapimodelsDepartmentFind {
  company_struct_id?: string;
  name?: string;
}

export interface DictapimodelsDepartmentView {
  company_struct_id?: string;
  id?: string;
  name?: string;
  parent_id?: string;
}

export interface DictapimodelsJobTitleData {
  department_id?: string;
  name?: string;
}

export interface DictapimodelsRejectReasonData {
  /** Инициатор отказа */
  initiator?: ModelsRejectInitiator;
  /** Причина отказа */
  name?: string;
}

export interface DictapimodelsRejectReasonFind {
  /** Фильтр по инициатору отказа */
  initiator?: ModelsRejectInitiator;
  /** Поиск по содержимому причины */
  search?: string;
}

export interface DictapimodelsRejectReasonView {
  /** Можно изменять */
  can_change?: boolean;
  /** Идентификатор записи */
  id?: string;
  /** Инициатор отказа */
  initiator?: ModelsRejectInitiator;
  /** Причина отказа */
  name?: string;
}

export interface FilesapimodelsFileView {
  applicant_id?: string;
  content_type?: string;
  id?: string;
  name?: string;
  space_id?: string;
}

export interface GptmodelsGenVacancyDescRequest {
  /** Текст, на основе которого необходимо сгенерировать описание */
  text?: string;
}

export interface GptmodelsGenVacancyDescResponse {
  /** сгенерированное описание вакансии */
  description?: string;
}

export interface HhapimodelsVacancyAttach {
  /** ссылка на вакансию в виде: https://izhevsk.hh.ru/vacancy/108984166 */
  url?: string;
}

export enum ModelsAddedType {
  AddedTypeAdded = "Добавлен",
  AddedTypeNegotiation = "Откликнулся",
}

export enum ModelsApAddedPeriodType {
  ApAddedPeriodTypeTDay = "За сегодня",
  ApAddedPeriodTypeYDay = "За вчера",
  ApAddedPeriodType7Days = "За последние 7 дней",
  ApAddedPeriodTypeMonth = "За последний месяц",
  ApAddedPeriodTypeYear = "За последний год",
}

export enum ModelsApplicantSource {
  ApplicantSourceManual = "Ручной ввод",
  ApplicantSourceAvito = "Avito",
  ApplicantSourceHh = "HeadHunter",
  ApplicantSourceEmail = "Электронная почта",
  ApplicantSourceSoc = "Социальные сети",
  ApplicantSite = "Карьерный сайт",
}

export enum ModelsApplicantStatus {
  ApplicantStatusInProcess = "В процессе",
  ApplicantStatusRejected = "Отклонен",
  ApplicantStatusNegotiation = "Отклик",
  ApplicantStatusArchive = "Архивный",
}

export enum ModelsApprovalStatus {
  AStatusApproved = "Согласованно",
  AStatusRejected = "Не согласованно",
  AStatusAwaiting = "Ждет согласования",
}

export enum ModelsDriverLicenseType {
  DriverLicenseA = "A",
  DriverLicenseB = "B",
  DriverLicenseC = "C",
  DriverLicenseD = "D",
  DriverLicenseE = "E",
  DriverLicenseBE = "BE",
  DriverLicenseCE = "CE",
  DriverLicenseDE = "DE",
  DriverLicenseTM = "TM",
  DriverLicenseTB = "TB",
}

export enum ModelsDuplicateType {
  DuplicateTypeByAuthor = "ByAuthor",
  DuplicateTypeByContacts = "ByContacts",
}

export enum ModelsEducationType {
  EducationTypeSecondary = "secondary",
  EducationTypeSpecialSecondary = "special_secondary",
  EducationTypeUnfinishedHigher = "unfinished_higher",
  EducationTypeHigher = "higher",
  EducationTypeBachelor = "bachelor",
  EducationTypeMaster = "master",
  EducationTypeCandidate = "candidate",
  EducationTypeDoctor = "doctor",
}

export enum ModelsEmployment {
  EmploymentTemporary = "temporary",
  EmploymentFull = "full",
  EmploymentInternship = "internship",
  EmploymentPartial = "partial",
  EmploymentVolunteer = "volunteer",
  EmploymentProbation = "probation",
}

export enum ModelsExperience {
  ExperienceNoMatter = "noMatter",
  ExperienceMoreThan1 = "moreThan1",
  ExperienceMoreThan3 = "moreThan3",
  ExperienceMoreThan5 = "moreThan5",
  ExperienceMoreThan10 = "moreThan10",
}

export enum ModelsExperienceType {
  ExperienceTypeNo = "No",
  ExperienceTypeBetween1And3 = "Between1And3",
  ExperienceTypeBetween3And6 = "Between3And6",
  ExperienceTypeMoreThan6 = "MoreThan6",
}

export enum ModelsGenderType {
  GenderTypeM = "male",
  GenderTypeF = "female",
}

export enum ModelsLanguageLevelType {
  LanguageLevelA1 = "a1",
  LanguageLevelA2 = "a2",
  LanguageLevelB1 = "b1",
  LanguageLevelB2 = "b2",
  LanguageLevelC1 = "c1",
  LanguageLevelC2 = "c2",
  LanguageLevelL1 = "l1",
}

export enum ModelsLimitType {
  LimitTypeMin = "Минут",
  LimitTypeHour = "Часов",
  LimitTypDay = "Дней",
  LimitTypeWeek = "Недель",
}

export enum ModelsNegotiationStatus {
  NegotiationStatusWait = "Рассмотреть позже",
  NegotiationStatusRejected = "Отклонен",
  NegotiationStatusAccepted = "Подходит",
}

export enum ModelsRejectInitiator {
  HrReject = "Рекрутер",
  HeadReject = "Руководитель",
  ApplicantReject = "Кандидат",
}

export enum ModelsRelocationType {
  RelocationTypeNo = "no",
  RelocationTypeYes = "possible",
  RelocationTypeWant = "want",
}

export enum ModelsResponsePeriodType {
  ResponsePeriodType3Days = "до 3 дней",
  ResponsePeriodType7Days = "до 7 дней",
  ResponsePeriodType7ToMonth = "от 7 дней до 30 дней",
  ResponsePeriodTypeMoreMonth = "более месяца",
}

export enum ModelsSchedule {
  ScheduleFlyInFlyOut = "flyInFlyOut",
  SchedulePartTime = "partTime",
  ScheduleFullDay = "fullDay",
  ScheduleFlexible = "flexible",
  ScheduleShift = "shift",
}

export enum ModelsSearchLabelType {
  SearchLabelPhoto = "only_with_photo",
  SearchLabelSalary = "only_with_salary",
  SearchLabelAge = "only_with_age",
  SearchLabelGender = "only_with_gender",
}

export enum ModelsSearchStatusType {
  SearchStatusActive = "active_search",
  SearchStatusLookingForOffers = "looking_for_offers",
  SearchStatusNotLookingForJob = "not_looking_for_job",
  SearchStatusHasJobOffer = "has_job_offer",
  SearchStatusAcceptedJobOffer = "accepted_job_offer",
}

export enum ModelsSpacePushSettingCode {
  PushLicenseExpire = "PushLicenseExpire",
  PushVRClosed = "PushVRClosed",
  PushVRApproved = "PushVRApproved",
  PushVRRejected = "PushVRRejected",
  PushVacancyResponsible = "PushVacancyResponsible",
  PushVacancyNewStatus = "PushVacancyNewStatus",
  PushVacancyPublished = "PushVacancyPublished",
  PushApplicantNegotiation = "PushApplicantNegotiation",
  PushApplicantNote = "PushApplicantNote",
  PushApplicantMsg = "PushApplicantMsg",
  PushApplicantNewStage = "PushApplicantNewStage",
}

export enum ModelsSpaceSettingCode {
  YandexGPTPromtSetting = "ya_gpt_promt",
  HhClientIDSetting = "HHClientID",
  HhClientSecretSetting = "HHClientSecret",
  AvitoClientIDSetting = "AvitoClientID",
  AvitoClientSecretSetting = "AvitoClientSecret",
  SpaceSenderEmail = "SpaceSenderEmail",
}

export enum ModelsTemplateType {
  TplMail = "Письмо",
  TplApplicantNote = "Комментарий к кандидату",
  TplRejectNote = "Комментарий к отказу",
  TplReminder = "Напоминание",
  TplRatingNote = "Комментарий к оценке",
  TplSms = "SMS",
  TplOffer = "Оффер",
}

export enum ModelsTripReadinessType {
  TripReadinessReady = "ready",
  TripReadinessSometimes = "sometimes",
  TripReadinessNever = "never",
}

export enum ModelsUserRole {
  SpaceAdminRole = "SPACE_ADMIN_ROLE",
  SpaceUserRole = "SPACE_USER_ROLE",
  UserRoleSuperAdmin = "SUPER_ADMIN",
}

export enum ModelsVRSelectionType {
  VRSelectionTypeMass = "Массовый",
  VRSelectionTypePersonal = "Индивидуальный",
}

export enum ModelsVRStatus {
  VRStatusCreated = "Создана",
  VRStatusCanceled = "Отменена",
  VRStatusNotAccepted = "Не согласована",
  VRStatusAccepted = "Согласована",
  VRStatusUnderRevision = "На доработке",
  VRStatusUnderAccepted = "На согласовании",
  VRStatusTemplate = "Шаблон",
}

export enum ModelsVRType {
  VRTypeNew = "Новая позиция",
  VRTypeReplace = "Замена",
}

export enum ModelsVRUrgency {
  VRTypeUrgent = "Срочно",
  VRTypeNonUrgent = "В плановом порядке",
}

export enum ModelsVacancyPubStatus {
  VacancyPubStatusNone = "Не размещена",
  VacancyPubStatusModeration = "Публикуется",
  VacancyPubStatusPublished = "Опубликована",
  VacancyPubStatusRejected = "Отклонена",
  VacancyPubStatusClosed = "Закрыта",
}

export enum ModelsVacancyStatus {
  VacancyStatusOpened = "Открыта",
  VacancyStatusCanceled = "Отменена",
  VacancyStatusSuspended = "Приостановлена",
  VacancyStatusClosed = "Закрыта",
}

export interface MsgtemplateapimodelsMsgTemplateData {
  /** Текст шаблона с переменными шаблона (Пример шаблона: "Вакансия {{.VacancyName}} более не актуальна, приходи еще, {{.SelfName}}") */
  message?: string;
  /** Название шаблона */
  name?: string;
  /** Текст шаблона оффера для генерации pdf с переменными шаблона (Пример шаблона: "<center>Ваш оффер!</center>Тут кокой то текст оффера с разными стилями: <b>bold</b>, <i>italic</i>, <u>underlined</u>, or <b><i><u>all at once</u></i></b>!<br><br><right>С уважением</right><right>Директор {{.CompanyName}}</right><right>{{.CompanyDirectorName}}</right>") */
  pdf_message?: string;
  /** Тип шаблона */
  template_type?: ModelsTemplateType;
  /** Тема/заголовок письма с переменными шаблона (Пример шаблона: "Информация от {{.CompanyName}}") */
  title?: string;
}

export interface MsgtemplateapimodelsMsgTemplateView {
  /** Идентификатор шаблона */
  id?: string;
  /** Текст шаблона с переменными шаблона (Пример шаблона: "Вакансия {{.VacancyName}} более не актуальна, приходи еще, {{.SelfName}}") */
  message?: string;
  /** Название шаблона */
  name?: string;
  /** Текст шаблона оффера для генерации pdf с переменными шаблона (Пример шаблона: "<center>Ваш оффер!</center>Тут кокой то текст оффера с разными стилями: <b>bold</b>, <i>italic</i>, <u>underlined</u>, or <b><i><u>all at once</u></i></b>!<br><br><right>С уважением</right><right>Директор {{.CompanyName}}</right><right>{{.CompanyDirectorName}}</right>") */
  pdf_message?: string;
  /** Тип шаблона */
  template_type?: ModelsTemplateType;
  /** Тема/заголовок письма с переменными шаблона (Пример шаблона: "Информация от {{.CompanyName}}") */
  title?: string;
}

export interface MsgtemplateapimodelsSendMessage {
  /** ID кандидата/отклика кому отправить сообщение */
  applicant_id?: string;
  /** ID шаблона сообщения, которое нужно отправить */
  msg_template_id?: string;
}

export interface MsgtemplateapimodelsTemplateItem {
  /** Значение для отображения пользователю */
  name?: string;
  /** Переменная шаблона */
  value?: string;
}

export interface NegotiationapimodelsCommentData {
  comment?: string;
}

export interface NegotiationapimodelsMessageItem {
  /** ФИО автора */
  author_full_name?: string;
  id?: string;
  /** Дата/время сообщения */
  message_date_time?: string;
  /** Сообщение от true - работодателя / false - кандидата */
  self_message?: boolean;
  /** Текст сообщения */
  text?: string;
}

export interface NegotiationapimodelsMessageListRequest {
  applicant_id?: string;
}

export interface NegotiationapimodelsMessengerAvailableRequest {
  applicant_id?: string;
}

export interface NegotiationapimodelsMessengerAvailableResponse {
  is_available?: boolean;
  /** Avito/HeadHunter */
  service?: string;
}

export interface NegotiationapimodelsNegotiationView {
  /** Адрес кандидата */
  address?: string;
  /** возраст */
  age?: number;
  /** Гражданство */
  citizenship?: string;
  /** коментарий к кандидату */
  comment?: string;
  email?: string;
  fio?: string;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  id?: string;
  /** дата отклика */
  negotiation_date?: string;
  /** статус отклика */
  negotiation_status?: ModelsNegotiationStatus;
  params?: DbmodelsApplicantParams;
  phone?: string;
  photo_url?: string;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** заголовок резюме */
  resume_title?: string;
  /** ожидаемая зп */
  salary?: number;
  /** источник */
  source?: ModelsApplicantSource;
  /** этап */
  step?: string;
  /** время на этапе */
  step_time?: string;
  /** Автор вакансии */
  vacancy_author?: string;
}

export interface NegotiationapimodelsNewMessageRequest {
  applicant_id?: string;
  text?: string;
}

export interface NegotiationapimodelsStatusData {
  status?: ModelsNegotiationStatus;
}

export interface SpaceapimodelsCreateOrganization {
  admin_data?: SpaceapimodelsCreateUser;
  director_name?: string;
  full_name?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  organization_name?: string;
}

export interface SpaceapimodelsCreateUser {
  /** Email пользователя */
  email?: string;
  first_name?: string;
  is_admin?: boolean;
  /** Идентификатор должности */
  job_title_id?: string;
  last_name?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  space_id?: string;
  /** Текст подписи */
  text_sign?: string;
}

export interface SpaceapimodelsPasswordChange {
  /** Текущий пароль */
  current_password?: string;
  /** Новый пароль */
  new_password?: string;
}

export interface SpaceapimodelsProfileData {
  /** адрес организации */
  company_address?: string;
  /** контакт организации */
  company_contact?: string;
  /** Описание компании */
  description?: string;
  /** ФИО руководителя */
  director_name?: string;
  /** Название компании */
  organization_name?: string;
  /** Часовой пояс */
  time_zone?: string;
  /** Адрес сайта */
  web?: string;
}

export interface SpaceapimodelsPushSettingData {
  /** Код события */
  code?: ModelsSpacePushSettingCode;
  /** Значение настроек пуша */
  value?: SpaceapimodelsPushSettingValue;
}

export interface SpaceapimodelsPushSettingValue {
  /** email уведомления о событии (вкл/выкл) */
  email?: boolean;
  /** Системные уведомления о событии (вкл/выкл) */
  system?: boolean;
  /** telegram уведомления о событии (вкл/выкл) */
  tg?: boolean;
}

export interface SpaceapimodelsPushSettingView {
  /** Код события */
  code?: ModelsSpacePushSettingCode;
  /** Название события */
  name?: string;
  /** Значение настроек пуша */
  value?: SpaceapimodelsPushSettingValue;
}

export interface SpaceapimodelsPushSettings {
  /** Push-уведомления включены */
  is_active?: boolean;
  /** Список событий */
  settings?: SpaceapimodelsPushSettingView[];
}

export interface SpaceapimodelsSpaceSettingView {
  /** Код настройки */
  code?: ModelsSpaceSettingCode;
  /** идентификтор Настройки */
  id?: string;
  /** Название настройки */
  name?: string;
  /** идентификатор пространства, которому принадлежит настройка */
  space_id?: string;
  /** Значение настройки */
  value?: string;
}

export interface SpaceapimodelsSpaceUser {
  /** Email пользователя */
  email?: string;
  first_name?: string;
  id?: string;
  is_admin?: boolean;
  /** Email подтвержден */
  is_email_verified?: boolean;
  /** Идентификатор должности */
  job_title_id?: string;
  /** Навание должности */
  job_title_name?: string;
  last_name?: string;
  /** Новый email, который станет основным после подтверждения */
  new_email?: string;
  phone_number?: string;
  role?: string;
  space_id?: string;
  /** Текст подписи */
  text_sign?: string;
}

export interface SpaceapimodelsSpaceUserFilter {
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
  /** Поиск */
  search?: string;
  /** Сортировка */
  sort?: SpaceapimodelsSpaceUserSort;
}

export interface SpaceapimodelsSpaceUserProfileData {
  /** Email пользователя */
  email?: string;
  /** Имя */
  first_name?: string;
  /** Внутренний номер */
  internal_phone_number?: string;
  /** Фамилия */
  last_name?: string;
  /** Телефон */
  phone_number?: string;
  /** Текст подписи */
  text_sign?: string;
  /** Персональная подпись */
  use_personal_sign?: boolean;
}

export interface SpaceapimodelsSpaceUserProfileView {
  /** Email пользователя */
  email?: string;
  /** Имя */
  first_name?: string;
  /** Идентфикатор пользователя */
  id?: string;
  /** Внутренний номер */
  internal_phone_number?: string;
  /** Email подтвержден */
  is_email_verified?: boolean;
  /** Должность */
  job_title_name?: string;
  /** Фамилия */
  last_name?: string;
  /** Новый email, который станет основным после подтверждения */
  new_email?: string;
  /** Телефон */
  phone_number?: string;
  /** Роль */
  role?: string;
  /** Текст подписи */
  text_sign?: string;
  /** Персональная подпись */
  use_personal_sign?: boolean;
}

export interface SpaceapimodelsSpaceUserSort {
  /** Email, порядок сортировки false = ASC/ true = DESC / nil = нет */
  email_desc?: boolean;
  /** Имя, порядок сортировки false = ASC/ true = DESC / nil = нет */
  fio_desc?: boolean;
  /** Роль добавления, порядок сортировки false = ASC/ true = DESC / nil = нет */
  role_desc?: boolean;
}

export interface SpaceapimodelsUpdateSpaceSettingValue {
  /** Новое значение настройки */
  value?: string;
}

export interface SpaceapimodelsUpdateUser {
  /** Email пользователя */
  email?: string;
  first_name?: string;
  is_admin?: boolean;
  /** Идентификатор должности */
  job_title_id?: string;
  last_name?: string;
  password?: string;
  phone_number?: string;
  role?: string;
  space_id?: string;
  /** Текст подписи */
  text_sign?: string;
}

export interface SupersetapimodelsGuestTokenResponse {
  /** Идентификатор дашборда */
  dashboard_id?: string;
  /** Гостевой токен */
  token?: string;
}

export interface VacancyapimodelsApprovalStageData {
  approval_status?: ModelsApprovalStatus;
  space_user_id?: string;
  stage?: number;
}

export interface VacancyapimodelsApprovalStageView {
  approval_status?: ModelsApprovalStatus;
  space_user_id?: string;
  space_user_name?: string;
  stage?: number;
}

export interface VacancyapimodelsApprovalStages {
  approval_stages?: VacancyapimodelsApprovalStageData[];
}

export interface VacancyapimodelsExtVacancyInfo {
  /** описание статуса/ошибки */
  reason?: string;
  /** статус публикации */
  status?: ModelsVacancyPubStatus;
  /** урл вакансии */
  url?: string;
}

export interface VacancyapimodelsExternalData {
  head_hunter?: VacancyapimodelsExternalLink;
}

export interface VacancyapimodelsExternalLink {
  id?: string;
  url?: string;
}

export interface VacancyapimodelsPersonFilter {
  /** Поиск по ФИО */
  search?: string;
}

export interface VacancyapimodelsSalary {
  by_result?: number;
  from?: number;
  in_hand?: number;
  to?: number;
}

export enum VacancyapimodelsSearchPeriod {
  SearchByToday = 1,
  SearchBy3Days = 2,
  SearchByWeek = 3,
  SearchByMonth = 4,
  SearchByPeriod = 5,
}

export interface VacancyapimodelsSelectionStageAdd {
  /** Лимит времени на этапе - единицы измерения */
  limit_type?: ModelsLimitType;
  /** Лимит времени на этапе */
  limit_value?: number;
  /** Название этапа */
  name?: string;
  /** Тип этапа */
  stage_type?: string;
}

export interface VacancyapimodelsSelectionStageView {
  /** Возможность удаления этапа */
  can_delete?: boolean;
  /** Идентификатор этапа подбора кандидата */
  id?: string;
  /** Лимит времени на этапе - единицы измерения */
  limit_type?: ModelsLimitType;
  /** Лимит времени на этапе */
  limit_value?: number;
  /** Название этапа */
  name?: string;
  /** Порядковый номер этапа */
  stage_order?: number;
  /** Тип этапа */
  stage_type?: string;
  /** Количество активных кандидатов */
  total?: number;
}

export interface VacancyapimodelsStatusChangeRequest {
  /** новый статус вакансии */
  status?: ModelsVacancyStatus;
}

export interface VacancyapimodelsTeamPerson {
  /** Email пользователя */
  email?: string;
  full_name?: string;
  id?: string;
  responsible?: boolean;
  role?: ModelsUserRole;
}

export interface VacancyapimodelsVacancyData {
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  /** ид подразделения */
  department_id?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  /** ид штатной должности */
  job_title_id?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** ожидания по зп */
  salary?: VacancyapimodelsSalary;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
  /** ид заявки на вакансию */
  vacancy_request_id?: string;
}

export interface VacancyapimodelsVacancyFilter {
  /** Фильтр по автору вакансии */
  author_id?: string;
  /** Поиск по ФИО автора */
  author_search?: string;
  /** Фильтр по идентификатору города */
  city_id?: string;
  /** Фильтр по идентификатору подразделения */
  department_id?: string;
  /** Отображать избранные */
  favorite?: boolean;
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
  /** Фильтр по автору запроса на вкансию */
  request_author_id?: string;
  /** Идентификатор запроса на вакансию */
  request_id?: string;
  /** Фильтр по тип вакансии */
  request_type?: ModelsVRType;
  /** Поиск по ФИО ответственного */
  responsible_search?: string;
  /** Поиск */
  search?: string;
  /** Фильтр по виду подбора */
  selection_type?: ModelsVRSelectionType;
  /** Сортировка */
  sort?: VacancyapimodelsVacancySort;
  /** Фильтр по статусам */
  statuses?: ModelsVacancyStatus[];
  /** Фильтр по вкладке: 0 - Все, 1 - Мои, 2 - Другие, 3 - Архив */
  tab?: VacancyapimodelsVacancyTab;
  /** Фильтр по срочности */
  urgency?: ModelsVRUrgency;
}

export interface VacancyapimodelsVacancyRequestCreateData {
  approval_stages?: VacancyapimodelsApprovalStageData[];
  /** сохранить как шаблон */
  as_template?: boolean;
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  /** конфиденциальная вакансия */
  confidential?: boolean;
  /** ид подразделения */
  department_id?: string;
  /** Коментарий к заявке */
  description?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  /** внутреннее взаимодействие */
  in_interaction?: string;
  /** сотрудник проводящий интервью */
  interviewer?: string;
  /** ид штатной должности */
  job_title_id?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  /** внешнее взаимодействие */
  out_interaction?: string;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** краткая информация о комманде отдела */
  short_info?: string;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
}

export interface VacancyapimodelsVacancyRequestData {
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  /** конфиденциальная вакансия */
  confidential?: boolean;
  /** ид подразделения */
  department_id?: string;
  /** Коментарий к заявке */
  description?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  /** внутреннее взаимодействие */
  in_interaction?: string;
  /** сотрудник проводящий интервью */
  interviewer?: string;
  /** ид штатной должности */
  job_title_id?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  /** внешнее взаимодействие */
  out_interaction?: string;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** краткая информация о комманде отдела */
  short_info?: string;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
}

export interface VacancyapimodelsVacancyRequestEditData {
  approval_stages?: VacancyapimodelsApprovalStageData[];
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  /** конфиденциальная вакансия */
  confidential?: boolean;
  /** ид подразделения */
  department_id?: string;
  /** Коментарий к заявке */
  description?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  /** внутреннее взаимодействие */
  in_interaction?: string;
  /** сотрудник проводящий интервью */
  interviewer?: string;
  /** ид штатной должности */
  job_title_id?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  /** внешнее взаимодействие */
  out_interaction?: string;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** краткая информация о комманде отдела */
  short_info?: string;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
}

export interface VacancyapimodelsVacancyRequestView {
  approval_stage_current?: number;
  approval_stage_is_last?: boolean;
  approval_stages?: VacancyapimodelsApprovalStageView[];
  /** фио непосредственного руководителя */
  chief_fio?: string;
  city?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  company_struct_name?: string;
  /** конфиденциальная вакансия */
  confidential?: boolean;
  creation_date?: string;
  /** ид подразделения */
  department_id?: string;
  department_name?: string;
  /** Коментарий к заявке */
  description?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  favorite?: boolean;
  id?: string;
  /** внутреннее взаимодействие */
  in_interaction?: string;
  /** сотрудник проводящий интервью */
  interviewer?: string;
  /** ид штатной должности */
  job_title_id?: string;
  job_title_name?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  /** внешнее взаимодействие */
  out_interaction?: string;
  pinned?: boolean;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** краткая информация о комманде отдела */
  short_info?: string;
  status?: ModelsVRStatus;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
}

export interface VacancyapimodelsVacancySort {
  /** порядок сортировки false = ASC/ true = DESC */
  created_at_desc?: boolean;
}

export enum VacancyapimodelsVacancyTab {
  VacancyTabAll = 0,
  VacancyTabMy = 1,
  VacancyTabOther = 2,
  VacancyTabArch = 3,
}

export interface VacancyapimodelsVacancyView {
  /** ФИО автора вакансии */
  author_full_name?: string;
  /** Идентификатор автора вакансии */
  author_id?: string;
  /** фио непосредственного руководителя */
  chief_fio?: string;
  city?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
  /** название компании */
  company_name?: string;
  /** ид структуры компании */
  company_struct_id?: string;
  company_struct_name?: string;
  creation_date?: string;
  /** ид подразделения */
  department_id?: string;
  department_name?: string;
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  external?: VacancyapimodelsExternalData;
  favorite?: boolean;
  hh?: VacancyapimodelsExternalLink;
  id?: string;
  /** ид штатной должности */
  job_title_id?: string;
  job_title_name?: string;
  /** кол-во открытых позиций */
  opened_positions?: number;
  pinned?: boolean;
  /** адрес места работы */
  place_of_work?: string;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** требования/обязанности/условия */
  requirements?: string;
  /** ФИО ответственного */
  responsible_full_name?: string;
  /** Идентификатор ответственного */
  responsible_id?: string;
  /** ожидания по зп */
  salary?: VacancyapimodelsSalary;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** этапы подбора */
  selection_stages?: VacancyapimodelsSelectionStageView[];
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  status?: ModelsVacancyStatus;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
  /** ид заявки на вакансию */
  vacancy_request_id?: string;
}

export interface VacancyapimodelsVrFilter {
  /** Фильтр по автору */
  author_id?: string;
  /** Фильтр по городу */
  city_id?: string;
  /** Избранные */
  favorite?: boolean;
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
  /** Поиск по названию */
  search?: string;
  /** Период "с", при выборе search_period = 5 (в формате "21.09.2023") */
  search_from?: string;
  /** Поиск по дате (1 - За день|2 - за 3 дня|3 - за неделю|4 - за 30 дней|5 - за пероид) */
  search_period?: VacancyapimodelsSearchPeriod;
  /** Период "по", при выборе search_period = 5 (в формате "21.09.2023") */
  search_to?: string;
  /** Фильтр по виду подбора */
  selection_type?: ModelsVRSelectionType;
  /** Сортировка */
  sort?: VacancyapimodelsVrSort;
  /** Фильтр по статусам */
  statuses?: ModelsVRStatus[];
}

export interface VacancyapimodelsVrSort {
  /** порядок сортировки false = ASC/ true = DESC */
  created_at_desc?: boolean;
}

export interface WsmodelsServerMessage {
  /** код события */
  code?: string;
  /** текст события */
  msg?: string;
  /** время события */
  time?: string;
  /** заголовок события */
  title?: string;
}
