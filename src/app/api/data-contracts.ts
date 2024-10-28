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
  limit?: number;
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

export interface DbmodelsVacancyFilter {
  author_id?: string;
  city_id?: string;
  department_id?: string;
  favorite?: boolean;
  request_author_id?: string;
  request_id?: string;
  request_type?: ModelsVRType;
  search?: string;
  selection_type?: ModelsVRSelectionType;
  sort?: DbmodelsVacancySort;
  statuses?: ModelsVacancyStatus[];
  urgency?: ModelsVRUrgency;
}

export interface DbmodelsVacancySort {
  /** порядок сортировки false = ASC/ true = DESC */
  created_at_desc?: boolean;
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
  company_id?: string;
  name?: string;
  parent_id?: string;
}

export interface DictapimodelsDepartmentFind {
  company_id?: string;
  name?: string;
}

export interface DictapimodelsDepartmentView {
  company_id?: string;
  id?: string;
  name?: string;
  parent_id?: string;
}

export interface DictapimodelsJobTitleData {
  department_id?: string;
  name?: string;
}

export enum ModelsApprovalStatus {
  AStatusApproved = "Согласованно",
  AStatusRejected = "Не согласованно",
  AStatusAwaiting = "Ждет согласования",
}

export enum ModelsUserRole {
  UserRoleSuperAdmin = "SUPER_ADMIN",
  UserRoleAdmin = "ADMIN",
  UserRoleManager = "MANAGER",
  UserRolrHrDirector = "HR_DIRECTOR",
  UserRoleUser = "USER",
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

export enum ModelsVacancyStatus {
  VacancyStatusOpened = "Открыта",
  VacancyStatusCanceled = "Отменена",
  VacancyStatusSuspended = "Приостановлена",
  VacancyStatusClosed = "Закрыта",
}

export interface SpaceapimodelsCreateOrganization {
  admin_data?: SpaceapimodelsCreateUser;
  director_name?: string;
  full_name?: string;
  inn?: string;
  kpp?: string;
  ogrn?: string;
  organization_name?: string;
  organization_type?: string;
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

export interface SpaceapimodelsSpaceUser {
  email?: string;
  first_name?: string;
  id?: string;
  is_admin?: boolean;
  last_name?: string;
  phone_number?: string;
  space_id?: string;
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

export interface VacancyapimodelsSalary {
  by_result?: number;
  from?: number;
  in_hand?: number;
  to?: number;
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
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** срочность */
  urgency?: ModelsVRUrgency;
  /** название вакансии */
  vacancy_name?: string;
  /** ид заявки на вакансию */
  vacancy_request_id?: string;
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
