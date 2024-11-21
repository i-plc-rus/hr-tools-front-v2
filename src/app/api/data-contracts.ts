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

export interface ApimodelsPagination {
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
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

export interface AuthapimodelsSendEmail {
  /** Почта, на которую надо отправить письмо с подтверждением */
  email?: string;
}

export interface AvitoapimodelsVacancyAttach {
  /** идентификатор вакансии в виде: 3364561973 */
  id?: number;
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

export enum ModelsApplicantSource {
  ApplicantSourceManual = "Ручной ввод",
  ApplicantSourceAvito = "Avito",
  ApplicantSourceHh = "HeadHunter",
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

export enum ModelsNegotiationStatus {
  NegotiationStatusWait = "Рассмотреть позже",
  NegotiationStatusRejected = "Отклонен",
  NegotiationStatusAccepted = "Подходит",
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

export enum ModelsTripReadinessType {
  TripReadinessReady = "ready",
  TripReadinessSometimes = "sometimes",
  TripReadinessNever = "never",
}

export enum ModelsUserRole {
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

export interface MsgtemplateapimodelsMsgTemplateView {
  id?: string;
  message?: string;
  name?: string;
  title?: string;
}

export interface MsgtemplateapimodelsSendMessage {
  /** ID кандидата/отклика кому отправить сообщение */
  applicant_id?: string;
  /** ID шаблона сообщения, которое нужно отправить */
  msg_template_id?: string;
}

export interface NegotiationapimodelsCommentData {
  comment?: string;
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
  email?: string;
  first_name?: string;
  is_admin?: boolean;
  last_name?: string;
  password?: string;
  phone_number?: string;
  space_id?: string;
}

export interface SpaceapimodelsSpaceSettingView {
  /** Код настройки */
  code?: string;
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
  email?: string;
  first_name?: string;
  id?: string;
  is_admin?: boolean;
  last_name?: string;
  phone_number?: string;
  space_id?: string;
}

export interface SpaceapimodelsUpdateSpaceSettingValue {
  /** Новое значение настройки */
  value?: string;
}

export interface SpaceapimodelsUpdateUser {
  email?: string;
  first_name?: string;
  is_admin?: boolean;
  last_name?: string;
  password?: string;
  phone_number?: string;
  space_id?: string;
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

export interface VacancyapimodelsVacancyData {
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
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
  author_id?: string;
  city_id?: string;
  department_id?: string;
  favorite?: boolean;
  /** Записей на странице */
  limit?: number;
  /** Страница (1,2,3..) */
  page?: number;
  request_author_id?: string;
  request_id?: string;
  request_type?: ModelsVRType;
  search?: string;
  selection_type?: ModelsVRSelectionType;
  sort?: VacancyapimodelsVacancySort;
  statuses?: ModelsVacancyStatus[];
  urgency?: ModelsVRUrgency;
}

export interface VacancyapimodelsVacancyRequestData {
  /** фио непосредственного руководителя */
  chief_fio?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
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

export interface VacancyapimodelsVacancyView {
  /** фио непосредственного руководителя */
  chief_fio?: string;
  city?: string;
  /** ид города */
  city_id?: string;
  /** ид компании */
  company_id?: string;
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
  /** ожидания по зп */
  salary?: VacancyapimodelsSalary;
  /** Режим работы */
  schedule?: ModelsSchedule;
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
