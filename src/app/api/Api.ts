/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestOptions } from './http-client';

import {
  AdminpanelapimodelsUser,
  AdminpanelapimodelsUserUpdate,
  AdminpanelapimodelsUserView,
  ApimodelsResponse,
  ApimodelsScrollerResponse,
  ApplicantapimodelsApplicantData,
  ApplicantapimodelsApplicantFilter,
  ApplicantapimodelsApplicantHistoryFilter,
  ApplicantapimodelsApplicantHistoryView,
  ApplicantapimodelsApplicantNote,
  ApplicantapimodelsApplicantSourceData,
  ApplicantapimodelsApplicantView,
  ApplicantapimodelsApplicantViewExt,
  ApplicantapimodelsMultiChangeStageRequest,
  ApplicantapimodelsMultiEmailResponse,
  ApplicantapimodelsMultiRejectRequest,
  ApplicantapimodelsRejectRequest,
  ApplicantapimodelsXlsExportRequest,
  AuthapimodelsJWTRefreshRequest,
  AuthapimodelsJWTResponse,
  AuthapimodelsLoginRequest,
  AuthapimodelsPasswordRecovery,
  AuthapimodelsPasswordResetRequest,
  AuthapimodelsSendEmail,
  AvitoapimodelsVacancyAttach,
  DbmodelsNegotiationFilter,
  DictapimodelsCityData,
  DictapimodelsCityView,
  DictapimodelsCompanyData,
  DictapimodelsCompanyStructData,
  DictapimodelsCompanyStructView,
  DictapimodelsCompanyView,
  DictapimodelsDepartmentData,
  DictapimodelsDepartmentFind,
  DictapimodelsDepartmentView,
  DictapimodelsJobTitleData,
  DictapimodelsRejectReasonData,
  DictapimodelsRejectReasonFind,
  DictapimodelsRejectReasonView,
  FilesapimodelsFileView,
  GptmodelsGenVacancyDescRequest,
  GptmodelsGenVacancyDescResponse,
  HhapimodelsVacancyAttach,
  MsgtemplateapimodelsMsgTemplateData,
  MsgtemplateapimodelsMsgTemplateView,
  MsgtemplateapimodelsSendMessage,
  MsgtemplateapimodelsTemplateItem,
  NegotiationapimodelsCommentData,
  NegotiationapimodelsMessageItem,
  NegotiationapimodelsMessageListRequest,
  NegotiationapimodelsMessengerAvailableRequest,
  NegotiationapimodelsMessengerAvailableResponse,
  NegotiationapimodelsNegotiationView,
  NegotiationapimodelsNewMessageRequest,
  NegotiationapimodelsStatusData,
  SpaceapimodelsCreateOrganization,
  SpaceapimodelsCreateUser,
  SpaceapimodelsPasswordChange,
  SpaceapimodelsProfileData,
  SpaceapimodelsPushSettingData,
  SpaceapimodelsPushSettings,
  SpaceapimodelsSalesRequest,
  SpaceapimodelsSpaceSettingView,
  SpaceapimodelsSpaceUser,
  SpaceapimodelsSpaceUserFilter,
  SpaceapimodelsSpaceUserProfileData,
  SpaceapimodelsSpaceUserProfileView,
  SpaceapimodelsUpdateSpaceSettingValue,
  SpaceapimodelsUpdateUser,
  SupersetapimodelsGuestTokenResponse,
  SurveyapimodelsApplicantSurveyResponses,
  SurveyapimodelsApplicantSurveyView,
  SurveyapimodelsHRSurvey,
  SurveyapimodelsHRSurveyView,
  VacancyapimodelsApprovalStages,
  VacancyapimodelsComment,
  VacancyapimodelsExtVacancyInfo,
  VacancyapimodelsPersonFilter,
  VacancyapimodelsSelectionStageAdd,
  VacancyapimodelsSelectionStageView,
  VacancyapimodelsStatusChangeRequest,
  VacancyapimodelsTeamPerson,
  VacancyapimodelsVacancyData,
  VacancyapimodelsVacancyFilter,
  VacancyapimodelsVacancyRequestCreateData,
  VacancyapimodelsVacancyRequestData,
  VacancyapimodelsVacancyRequestEditData,
  VacancyapimodelsVacancyRequestView,
  VacancyapimodelsVacancyView,
  VacancyapimodelsVrFilter,
} from './data-contracts';

import { API_BASE_URL } from '../tokens/api.token';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) private readonly baseUrl: string = ''
  ) {}
  /**
   * @description Аутентификация пользователя
   *
   * @tags Админ панель
   * @name V1AdminPanelLoginCreate
   * @summary Аутентификация пользователя
   * @request POST:/api/v1/admin_panel/login
   */
  public v1AdminPanelLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AdminPanelLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AdminPanelLoginCreate(
    body: AuthapimodelsLoginRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AuthapimodelsJWTResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >('POST', this.baseUrl + `/api/v1/admin_panel/login`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Создание пользователя
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserCreateCreate
   * @summary Создание пользователя
   * @request POST:/api/v1/admin_panel/user/create
   */
  public v1AdminPanelUserCreateCreate(
    body: AdminpanelapimodelsUser,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1AdminPanelUserCreateCreate(
    body: AdminpanelapimodelsUser,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserCreateCreate(
    body: AdminpanelapimodelsUser,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/admin_panel/user/create`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление пользователя
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserDeleteDelete
   * @summary Удаление пользователя
   * @request DELETE:/api/v1/admin_panel/user/delete/{userID}
   */
  public v1AdminPanelUserDeleteDelete(
    userId: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1AdminPanelUserDeleteDelete(
    userId: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserDeleteDelete(
    userId: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/admin_panel/user/delete/${userId}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение пользователя
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserGetDetail
   * @summary Получение пользователя
   * @request GET:/api/v1/admin_panel/user/get/{userID}
   */
  public v1AdminPanelUserGetDetail(
    userId: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: AdminpanelapimodelsUserView;
    }
  >;
  public v1AdminPanelUserGetDetail(
    userId: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView;
      }
    >
  >;
  public v1AdminPanelUserGetDetail(
    userId: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AdminpanelapimodelsUserView;
        }
      >
    | (ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView;
      }
    >('GET', this.baseUrl + `/api/v1/admin_panel/user/get/${userId}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение списка пользователей
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserListCreate
   * @summary Получение списка пользователей
   * @request POST:/api/v1/admin_panel/user/list
   */
  public v1AdminPanelUserListCreate(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: AdminpanelapimodelsUserView[];
    }
  >;
  public v1AdminPanelUserListCreate(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView[];
      }
    >
  >;
  public v1AdminPanelUserListCreate(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AdminpanelapimodelsUserView[];
        }
      >
    | (ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView[];
      }
    >('POST', this.baseUrl + `/api/v1/admin_panel/user/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Изменение пользователя
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserUpdateUpdate
   * @summary Изменение пользователя
   * @request PUT:/api/v1/admin_panel/user/update/{userID}
   */
  public v1AdminPanelUserUpdateUpdate(
    userId: string,
    body: AdminpanelapimodelsUserUpdate,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1AdminPanelUserUpdateUpdate(
    userId: string,
    body: AdminpanelapimodelsUserUpdate,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserUpdateUpdate(
    userId: string,
    body: AdminpanelapimodelsUserUpdate,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/admin_panel/user/update/${userId}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Проверить почту
   *
   * @tags Регистрация_организации
   * @name V1AuthCheckEmailCreate
   * @summary Проверить почту
   * @request POST:/api/v1/auth/check-email
   */
  public v1AuthCheckEmailCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions
  ): Observable<void>;
  public v1AuthCheckEmailCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1AuthCheckEmailCreate(
    body: AuthapimodelsSendEmail,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/auth/check-email`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Аутентификация пользователя
   *
   * @tags Аутентификация пользователей
   * @name V1AuthLoginCreate
   * @summary Аутентификация пользователя
   * @request POST:/api/v1/auth/login
   */
  public v1AuthLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AuthLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AuthLoginCreate(
    body: AuthapimodelsLoginRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AuthapimodelsJWTResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >('POST', this.baseUrl + `/api/v1/auth/login`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получить информацию о текущем пользователе
   *
   * @tags Аутентификация пользователей
   * @name V1AuthMeList
   * @summary Получить информацию о текущем пользователе
   * @request GET:/api/v1/auth/me
   */
  public v1AuthMeList(
    options?: RequestOptions
  ): Observable<SpaceapimodelsSpaceUser>;
  public v1AuthMeList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<SpaceapimodelsSpaceUser>>;
  public v1AuthMeList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    HttpResponse<SpaceapimodelsSpaceUser> | SpaceapimodelsSpaceUser
  > {
    return this.http.request<SpaceapimodelsSpaceUser>(
      'GET',
      this.baseUrl + `/api/v1/auth/me`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Восстановить пароль, запрос на отправку письма
   *
   * @tags Аутентификация пользователей
   * @name V1AuthRecoveryCreate
   * @summary Восстановить пароль, запрос на отправку письма
   * @request POST:/api/v1/auth/recovery
   */
  public v1AuthRecoveryCreate(
    body: AuthapimodelsPasswordRecovery,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsPasswordRecovery;
    }
  >;
  public v1AuthRecoveryCreate(
    body: AuthapimodelsPasswordRecovery,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsPasswordRecovery;
      }
    >
  >;
  public v1AuthRecoveryCreate(
    body: AuthapimodelsPasswordRecovery,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AuthapimodelsPasswordRecovery;
        }
      >
    | (ApimodelsResponse & {
        data?: AuthapimodelsPasswordRecovery;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AuthapimodelsPasswordRecovery;
      }
    >('POST', this.baseUrl + `/api/v1/auth/recovery`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновить JWT
   *
   * @tags Аутентификация пользователей
   * @name V1AuthRefreshTokenCreate
   * @summary Обновить JWT
   * @request POST:/api/v1/auth/refresh-token
   */
  public v1AuthRefreshTokenCreate(
    body: AuthapimodelsJWTRefreshRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AuthRefreshTokenCreate(
    body: AuthapimodelsJWTRefreshRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AuthRefreshTokenCreate(
    body: AuthapimodelsJWTRefreshRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: AuthapimodelsJWTResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >('POST', this.baseUrl + `/api/v1/auth/refresh-token`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Отправляет письмо с подтверждением на почту
   *
   * @tags Регистрация_организации
   * @name V1AuthRegisterCreate
   * @summary Отправить письмо с подтверждением на почту
   * @request POST:/api/v1/auth/register
   */
  public v1AuthRegisterCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions
  ): Observable<void>;
  public v1AuthRegisterCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1AuthRegisterCreate(
    body: AuthapimodelsSendEmail,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/auth/register`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Восстановить пароль, запрос на сброс пароля по коду
   *
   * @tags Аутентификация пользователей
   * @name V1AuthResetCreate
   * @summary Восстановить пароль, запрос на сброс пароля по коду
   * @request POST:/api/v1/auth/reset
   */
  public v1AuthResetCreate(
    body: AuthapimodelsPasswordResetRequest,
    options?: RequestOptions
  ): Observable<void>;
  public v1AuthResetCreate(
    body: AuthapimodelsPasswordResetRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1AuthResetCreate(
    body: AuthapimodelsPasswordResetRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/auth/reset`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Подтверждение почты кодом
   *
   * @tags Регистрация_организации
   * @name V1AuthVerifyEmailList
   * @summary Подтверждение почты кодом
   * @request GET:/api/v1/auth/verify-email
   */
  public v1AuthVerifyEmailList(
    query?: {
      /** код подтверждения */
      code?: string;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1AuthVerifyEmailList(
    query?: {
      /** код подтверждения */
      code?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1AuthVerifyEmailList(
    query?: {
      /** код подтверждения */
      code?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/auth/verify-email`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Поиск по названию
   *
   * @tags Справочник. Города
   * @name V1DictCityFindCreate
   * @summary Поиск по названию
   * @request POST:/api/v1/dict/city/find
   */
  public v1DictCityFindCreate(
    body: DictapimodelsCityData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCityView[];
    }
  >;
  public v1DictCityFindCreate(
    body: DictapimodelsCityData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCityView[];
      }
    >
  >;
  public v1DictCityFindCreate(
    body: DictapimodelsCityData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCityView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCityView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCityView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/city/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Города
   * @name V1DictCityDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/city/{id}
   */
  public v1DictCityDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCityView;
    }
  >;
  public v1DictCityDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCityView;
      }
    >
  >;
  public v1DictCityDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCityView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCityView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCityView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/city/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Создание
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyCreate
   * @summary Создание
   * @request POST:/api/v1/dict/company
   */
  public v1DictCompanyCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictCompanyCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictCompanyCreate(
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/dict/company`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Поиск по названию
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyFindCreate
   * @summary Поиск по названию
   * @request POST:/api/v1/dict/company/find
   */
  public v1DictCompanyFindCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView[];
    }
  >;
  public v1DictCompanyFindCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >
  >;
  public v1DictCompanyFindCreate(
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/company/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/company/{id}
   */
  public v1DictCompanyDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView;
    }
  >;
  public v1DictCompanyDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >
  >;
  public v1DictCompanyDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/company/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyUpdate
   * @summary Обновление
   * @request PUT:/api/v1/dict/company/{id}
   */
  public v1DictCompanyUpdate(
    id: string,
    body: DictapimodelsCompanyData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyUpdate(
    id: string,
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyUpdate(
    id: string,
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/dict/company/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/company/{id}
   */
  public v1DictCompanyDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/dict/company/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructCreate
   * @summary Создание
   * @request POST:/api/v1/dict/company_struct
   */
  public v1DictCompanyStructCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictCompanyStructCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictCompanyStructCreate(
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/dict/company_struct`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Поиск по названию
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructFindCreate
   * @summary Поиск по названию
   * @request POST:/api/v1/dict/company_struct/find
   */
  public v1DictCompanyStructFindCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyStructView[];
    }
  >;
  public v1DictCompanyStructFindCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView[];
      }
    >
  >;
  public v1DictCompanyStructFindCreate(
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyStructView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/company_struct/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/company_struct/{id}
   */
  public v1DictCompanyStructDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyStructView;
    }
  >;
  public v1DictCompanyStructDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView;
      }
    >
  >;
  public v1DictCompanyStructDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyStructView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/company_struct/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructUpdate
   * @summary Обновление
   * @request PUT:/api/v1/dict/company_struct/{id}
   */
  public v1DictCompanyStructUpdate(
    id: string,
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyStructUpdate(
    id: string,
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyStructUpdate(
    id: string,
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/dict/company_struct/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/company_struct/{id}
   */
  public v1DictCompanyStructDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyStructDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyStructDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/dict/company_struct/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentCreate
   * @summary Создание
   * @request POST:/api/v1/dict/department
   */
  public v1DictDepartmentCreate(
    body: DictapimodelsDepartmentData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictDepartmentCreate(
    body: DictapimodelsDepartmentData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictDepartmentCreate(
    body: DictapimodelsDepartmentData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/dict/department`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Поиск по названию
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentFindCreate
   * @summary Поиск по названию
   * @request POST:/api/v1/dict/department/find
   */
  public v1DictDepartmentFindCreate(
    body: DictapimodelsDepartmentFind,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsDepartmentView[];
    }
  >;
  public v1DictDepartmentFindCreate(
    body: DictapimodelsDepartmentFind,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView[];
      }
    >
  >;
  public v1DictDepartmentFindCreate(
    body: DictapimodelsDepartmentFind,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsDepartmentView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsDepartmentView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/department/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/department/{id}
   */
  public v1DictDepartmentDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsDepartmentView;
    }
  >;
  public v1DictDepartmentDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView;
      }
    >
  >;
  public v1DictDepartmentDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsDepartmentView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsDepartmentView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/department/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentUpdate
   * @summary Обновление
   * @request PUT:/api/v1/dict/department/{id}
   */
  public v1DictDepartmentUpdate(
    id: string,
    body: DictapimodelsDepartmentData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictDepartmentUpdate(
    id: string,
    body: DictapimodelsDepartmentData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictDepartmentUpdate(
    id: string,
    body: DictapimodelsDepartmentData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/dict/department/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/department/{id}
   */
  public v1DictDepartmentDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictDepartmentDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictDepartmentDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/dict/department/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleCreate
   * @summary Создание
   * @request POST:/api/v1/dict/job_title
   */
  public v1DictJobTitleCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictJobTitleCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictJobTitleCreate(
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/dict/job_title`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Поиск по названию
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleFindCreate
   * @summary Поиск по названию
   * @request POST:/api/v1/dict/job_title/find
   */
  public v1DictJobTitleFindCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView[];
    }
  >;
  public v1DictJobTitleFindCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >
  >;
  public v1DictJobTitleFindCreate(
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/job_title/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/job_title/{id}
   */
  public v1DictJobTitleDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView;
    }
  >;
  public v1DictJobTitleDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >
  >;
  public v1DictJobTitleDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/job_title/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleUpdate
   * @summary Обновление
   * @request PUT:/api/v1/dict/job_title/{id}
   */
  public v1DictJobTitleUpdate(
    id: string,
    body: DictapimodelsJobTitleData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictJobTitleUpdate(
    id: string,
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictJobTitleUpdate(
    id: string,
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/dict/job_title/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/job_title/{id}
   */
  public v1DictJobTitleDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictJobTitleDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictJobTitleDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/dict/job_title/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Справочник. Причины отказа
   * @name V1DictRejectReasonCreate
   * @summary Создание
   * @request POST:/api/v1/dict/reject_reason
   */
  public v1DictRejectReasonCreate(
    body: DictapimodelsRejectReasonData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictRejectReasonCreate(
    body: DictapimodelsRejectReasonData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictRejectReasonCreate(
    body: DictapimodelsRejectReasonData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/dict/reject_reason`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Список
   *
   * @tags Справочник. Причины отказа
   * @name V1DictRejectReasonFindCreate
   * @summary Список
   * @request POST:/api/v1/dict/reject_reason/find
   */
  public v1DictRejectReasonFindCreate(
    body: DictapimodelsRejectReasonFind,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsRejectReasonView[];
    }
  >;
  public v1DictRejectReasonFindCreate(
    body: DictapimodelsRejectReasonFind,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView[];
      }
    >
  >;
  public v1DictRejectReasonFindCreate(
    body: DictapimodelsRejectReasonFind,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsRejectReasonView[];
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView[];
      }
    >('POST', this.baseUrl + `/api/v1/dict/reject_reason/find`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Справочник. Причины отказа
   * @name V1DictRejectReasonDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/dict/reject_reason/{id}
   */
  public v1DictRejectReasonDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsRejectReasonView;
    }
  >;
  public v1DictRejectReasonDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView;
      }
    >
  >;
  public v1DictRejectReasonDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsRejectReasonView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsRejectReasonView;
      }
    >('GET', this.baseUrl + `/api/v1/dict/reject_reason/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Справочник. Причины отказа
   * @name V1DictRejectReasonUpdate
   * @summary Обновление
   * @request PUT:/api/v1/dict/reject_reason/{id}
   */
  public v1DictRejectReasonUpdate(
    id: string,
    body: DictapimodelsRejectReasonData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictRejectReasonUpdate(
    id: string,
    body: DictapimodelsRejectReasonData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictRejectReasonUpdate(
    id: string,
    body: DictapimodelsRejectReasonData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/dict/reject_reason/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Причины отказа
   * @name V1DictRejectReasonDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/reject_reason/{id}
   */
  public v1DictRejectReasonDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1DictRejectReasonDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictRejectReasonDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/dict/reject_reason/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Сгенерировать описание вакансии
   *
   * @tags GPT
   * @name V1GptGenerateVacancyDescriptionCreate
   * @summary Сгенерировать описание вакансии
   * @request POST:/api/v1/gpt/generate_vacancy_description
   */
  public v1GptGenerateVacancyDescriptionCreate(
    body: GptmodelsGenVacancyDescRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: GptmodelsGenVacancyDescResponse;
    }
  >;
  public v1GptGenerateVacancyDescriptionCreate(
    body: GptmodelsGenVacancyDescRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: GptmodelsGenVacancyDescResponse;
      }
    >
  >;
  public v1GptGenerateVacancyDescriptionCreate(
    body: GptmodelsGenVacancyDescRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: GptmodelsGenVacancyDescResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: GptmodelsGenVacancyDescResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: GptmodelsGenVacancyDescResponse;
      }
    >('POST', this.baseUrl + `/api/v1/gpt/generate_vacancy_description`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Аутентификация Avito
   *
   * @tags Аутентификация OAuth
   * @name V1OauthCallbackAvitoList
   * @summary Аутентификация Avito
   * @request GET:/api/v1/oauth/callback/avito
   */
  public v1OauthCallbackAvitoList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1OauthCallbackAvitoList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1OauthCallbackAvitoList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/oauth/callback/avito`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Аутентификация HH
   *
   * @tags Аутентификация OAuth
   * @name V1OauthCallbackHhList
   * @summary Аутентификация HH
   * @request GET:/api/v1/oauth/callback/hh
   */
  public v1OauthCallbackHhList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1OauthCallbackHhList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1OauthCallbackHhList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/oauth/callback/hh`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание организации
   *
   * @tags Организации
   * @name V1OrganizationsCreate
   * @summary Создание организации
   * @request POST:/api/v1/organizations
   */
  public v1OrganizationsCreate(
    body: SpaceapimodelsCreateOrganization,
    options?: RequestOptions
  ): Observable<void>;
  public v1OrganizationsCreate(
    body: SpaceapimodelsCreateOrganization,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsCreate(
    body: SpaceapimodelsCreateOrganization,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/organizations`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Запрос детальной информации через Дадата
   *
   * @tags Организации
   * @name V1OrganizationsRetrieveCreate
   * @summary Запрос детальной информации через Дадата
   * @request POST:/api/v1/organizations/retrieve
   */
  public v1OrganizationsRetrieveCreate(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1OrganizationsRetrieveCreate(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsRetrieveCreate(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/organizations/retrieve`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Поиск по ИНН через Дадата
   *
   * @tags Организации
   * @name V1OrganizationsSuggestList
   * @summary Поиск по ИНН через Дадата
   * @request GET:/api/v1/organizations/suggest
   */
  public v1OrganizationsSuggestList(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1OrganizationsSuggestList(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsSuggestList(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/organizations/suggest`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение анкеты
   *
   * @tags Анкета кандидата
   * @name V1PublicSurveyDetail
   * @summary Получение анкеты
   * @request GET:/api/v1/public/survey/{id}
   */
  public v1PublicSurveyDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: SurveyapimodelsApplicantSurveyView;
    }
  >;
  public v1PublicSurveyDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SurveyapimodelsApplicantSurveyView;
      }
    >
  >;
  public v1PublicSurveyDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SurveyapimodelsApplicantSurveyView;
        }
      >
    | (ApimodelsResponse & {
        data?: SurveyapimodelsApplicantSurveyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SurveyapimodelsApplicantSurveyView;
      }
    >('GET', this.baseUrl + `/api/v1/public/survey/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Сохранение ответов
   *
   * @tags Анкета кандидата
   * @name V1PublicSurveyUpdate
   * @summary Сохранение ответов
   * @request PUT:/api/v1/public/survey/{id}
   */
  public v1PublicSurveyUpdate(
    id: string,
    body: SurveyapimodelsApplicantSurveyResponses,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1PublicSurveyUpdate(
    id: string,
    body: SurveyapimodelsApplicantSurveyResponses,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1PublicSurveyUpdate(
    id: string,
    body: SurveyapimodelsApplicantSurveyResponses,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/public/survey/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Источники кандидатов
   *
   * @tags Аналитика
   * @name V1SpaceAnalyticsSourceUpdate
   * @summary Источники кандидатов
   * @request PUT:/api/v1/space/analytics/source
   */
  public v1SpaceAnalyticsSourceUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: ApplicantapimodelsApplicantSourceData;
    }
  >;
  public v1SpaceAnalyticsSourceUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantSourceData;
      }
    >
  >;
  public v1SpaceAnalyticsSourceUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: ApplicantapimodelsApplicantSourceData;
        }
      >
    | (ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantSourceData;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantSourceData;
      }
    >('PUT', this.baseUrl + `/api/v1/space/analytics/source`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Источники кандидатов. Выгрузить в Excel
   *
   * @tags Аналитика
   * @name V1SpaceAnalyticsSourceExportUpdate
   * @summary Источники кандидатов. Выгрузить в Excel
   * @request PUT:/api/v1/space/analytics/source_export
   */
  public v1SpaceAnalyticsSourceExportUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceAnalyticsSourceExportUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceAnalyticsSourceExportUpdate(
    body: ApplicantapimodelsApplicantFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'PUT',
      this.baseUrl + `/api/v1/space/analytics/source_export`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Кандидат
   * @name V1SpaceApplicantCreate
   * @summary Создание
   * @request POST:/api/v1/space/applicant
   */
  public v1SpaceApplicantCreate(
    body: ApplicantapimodelsApplicantData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceApplicantCreate(
    body: ApplicantapimodelsApplicantData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceApplicantCreate(
    body: ApplicantapimodelsApplicantData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/space/applicant`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Скачать документ кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantDocDetail
   * @summary Скачать документ кандидата
   * @request GET:/api/v1/space/applicant/doc/{id}
   */
  public v1SpaceApplicantDocDetail(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantDocDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantDocDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/applicant/doc/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить документ кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantDocDelete
   * @summary Удалить документ кандидата
   * @request DELETE:/api/v1/space/applicant/doc/{id}
   */
  public v1SpaceApplicantDocDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantDocDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantDocDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/applicant/doc/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Список
   *
   * @tags Кандидат
   * @name V1SpaceApplicantListCreate
   * @summary Список
   * @request POST:/api/v1/space/applicant/list
   */
  public v1SpaceApplicantListCreate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: ApplicantapimodelsApplicantView[];
    }
  >;
  public v1SpaceApplicantListCreate(
    body: ApplicantapimodelsApplicantFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantView[];
      }
    >
  >;
  public v1SpaceApplicantListCreate(
    body: ApplicantapimodelsApplicantFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: ApplicantapimodelsApplicantView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantView[];
      }
    >('POST', this.baseUrl + `/api/v1/space/applicant/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Перевести на другой этап подбора
   *
   * @tags Кандидат
   * @name V1SpaceApplicantMultiActionsChangeStageUpdate
   * @summary Перевести на другой этап подбора
   * @request PUT:/api/v1/space/applicant/multi-actions/change_stage
   */
  public v1SpaceApplicantMultiActionsChangeStageUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantMultiActionsChangeStageUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantMultiActionsChangeStageUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/multi-actions/change_stage`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Выгрузить в Excel
   *
   * @tags Кандидат
   * @name V1SpaceApplicantMultiActionsExportXlsUpdate
   * @summary Выгрузить в Excel
   * @request PUT:/api/v1/space/applicant/multi-actions/export_xls
   */
  public v1SpaceApplicantMultiActionsExportXlsUpdate(
    body: ApplicantapimodelsXlsExportRequest,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantMultiActionsExportXlsUpdate(
    body: ApplicantapimodelsXlsExportRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantMultiActionsExportXlsUpdate(
    body: ApplicantapimodelsXlsExportRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/multi-actions/export_xls`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отклонить кандидатов
   *
   * @tags Кандидат
   * @name V1SpaceApplicantMultiActionsRejectUpdate
   * @summary Отклонить кандидатов
   * @request PUT:/api/v1/space/applicant/multi-actions/reject
   */
  public v1SpaceApplicantMultiActionsRejectUpdate(
    body: ApplicantapimodelsMultiRejectRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantMultiActionsRejectUpdate(
    body: ApplicantapimodelsMultiRejectRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantMultiActionsRejectUpdate(
    body: ApplicantapimodelsMultiRejectRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/multi-actions/reject`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отправить письма кандидатам
   *
   * @tags Кандидат
   * @name V1SpaceApplicantMultiActionsSendEmailUpdate
   * @summary Отправить письма кандидатам
   * @request PUT:/api/v1/space/applicant/multi-actions/send_email
   */
  public v1SpaceApplicantMultiActionsSendEmailUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: ApplicantapimodelsMultiEmailResponse;
    }
  >;
  public v1SpaceApplicantMultiActionsSendEmailUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: ApplicantapimodelsMultiEmailResponse;
      }
    >
  >;
  public v1SpaceApplicantMultiActionsSendEmailUpdate(
    body: ApplicantapimodelsMultiChangeStageRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: ApplicantapimodelsMultiEmailResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: ApplicantapimodelsMultiEmailResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: ApplicantapimodelsMultiEmailResponse;
      }
    >(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/multi-actions/send_email`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение по ИД
   *
   * @tags Кандидат
   * @name V1SpaceApplicantDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/space/applicant/{id}
   */
  public v1SpaceApplicantDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: ApplicantapimodelsApplicantViewExt;
    }
  >;
  public v1SpaceApplicantDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantViewExt;
      }
    >
  >;
  public v1SpaceApplicantDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: ApplicantapimodelsApplicantViewExt;
        }
      >
    | (ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantViewExt;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: ApplicantapimodelsApplicantViewExt;
      }
    >('GET', this.baseUrl + `/api/v1/space/applicant/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Кандидат
   * @name V1SpaceApplicantUpdate
   * @summary Обновление
   * @request PUT:/api/v1/space/applicant/{id}
   */
  public v1SpaceApplicantUpdate(
    id: string,
    body: ApplicantapimodelsApplicantData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantUpdate(
    id: string,
    body: ApplicantapimodelsApplicantData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantUpdate(
    id: string,
    body: ApplicantapimodelsApplicantData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Перевести на другой этап подбора
   *
   * @tags Кандидат
   * @name V1SpaceApplicantChangeStageUpdate
   * @summary Перевести на другой этап подбора
   * @request PUT:/api/v1/space/applicant/{id}/change_stage
   */
  public v1SpaceApplicantChangeStageUpdate(
    id: string,
    query: {
      /** Идентификатор этапа на который необходимо перевести кандидата */
      stage_id: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantChangeStageUpdate(
    id: string,
    query: {
      /** Идентификатор этапа на который необходимо перевести кандидата */
      stage_id: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantChangeStageUpdate(
    id: string,
    query: {
      /** Идентификатор этапа на который необходимо перевести кандидата */
      stage_id: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}/change_stage`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Лог действий
   *
   * @tags Кандидат
   * @name V1SpaceApplicantChangesUpdate
   * @summary Лог действий
   * @request PUT:/api/v1/space/applicant/{id}/changes
   */
  public v1SpaceApplicantChangesUpdate(
    id: string,
    body: ApplicantapimodelsApplicantHistoryFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: ApplicantapimodelsApplicantHistoryView[];
    }
  >;
  public v1SpaceApplicantChangesUpdate(
    id: string,
    body: ApplicantapimodelsApplicantHistoryFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      }
    >
  >;
  public v1SpaceApplicantChangesUpdate(
    id: string,
    body: ApplicantapimodelsApplicantHistoryFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: ApplicantapimodelsApplicantHistoryView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      }
    >('PUT', this.baseUrl + `/api/v1/space/applicant/${id}/changes`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получить список документов кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantDocListList
   * @summary Получить список документов кандидата
   * @request GET:/api/v1/space/applicant/{id}/doc/list
   */
  public v1SpaceApplicantDocListList(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: FilesapimodelsFileView[];
    }
  >;
  public v1SpaceApplicantDocListList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: FilesapimodelsFileView[];
      }
    >
  >;
  public v1SpaceApplicantDocListList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: FilesapimodelsFileView[];
        }
      >
    | (ApimodelsResponse & {
        data?: FilesapimodelsFileView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: FilesapimodelsFileView[];
      }
    >('GET', this.baseUrl + `/api/v1/space/applicant/${id}/doc/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description (Дубли) Пометить кандидатов как разных
   *
   * @tags Кандидат
   * @name V1SpaceApplicantIsolateUpdate
   * @summary (Дубли) Пометить кандидатов как разных
   * @request PUT:/api/v1/space/applicant/{id}/isolate
   */
  public v1SpaceApplicantIsolateUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который помечается как не дубликат */
      duplicate_id: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantIsolateUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который помечается как не дубликат */
      duplicate_id: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantIsolateUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который помечается как не дубликат */
      duplicate_id: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}/isolate`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description (Дубли) Объединение кандидатов
   *
   * @tags Кандидат
   * @name V1SpaceApplicantJoinUpdate
   * @summary (Дубли) Объединение кандидатов
   * @request PUT:/api/v1/space/applicant/{id}/join
   */
  public v1SpaceApplicantJoinUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который будет перенесен в архив */
      duplicate_id: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantJoinUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который будет перенесен в архив */
      duplicate_id: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantJoinUpdate(
    id: string,
    query: {
      /** Идентификатор кандидата - дубликата, который будет перенесен в архив */
      duplicate_id: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}/join`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Добавить заметку о кандидате
   *
   * @tags Кандидат
   * @name V1SpaceApplicantNoteUpdate
   * @summary Добавить заметку о кандидате
   * @request PUT:/api/v1/space/applicant/{id}/note
   */
  public v1SpaceApplicantNoteUpdate(
    id: string,
    body: ApplicantapimodelsApplicantNote,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: ApplicantapimodelsApplicantHistoryView[];
    }
  >;
  public v1SpaceApplicantNoteUpdate(
    id: string,
    body: ApplicantapimodelsApplicantNote,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      }
    >
  >;
  public v1SpaceApplicantNoteUpdate(
    id: string,
    body: ApplicantapimodelsApplicantNote,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: ApplicantapimodelsApplicantHistoryView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: ApplicantapimodelsApplicantHistoryView[];
      }
    >('PUT', this.baseUrl + `/api/v1/space/applicant/${id}/note`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Скачать фото кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantPhotoList
   * @summary Скачать фото кандидата
   * @request GET:/api/v1/space/applicant/{id}/photo
   */
  public v1SpaceApplicantPhotoList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantPhotoList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantPhotoList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/applicant/${id}/photo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить фото кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantPhotoDelete
   * @summary Удалить фото кандидата
   * @request DELETE:/api/v1/space/applicant/{id}/photo
   */
  public v1SpaceApplicantPhotoDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantPhotoDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantPhotoDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/applicant/${id}/photo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отклонить кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantRejectUpdate
   * @summary Отклонить кандидата
   * @request PUT:/api/v1/space/applicant/{id}/reject
   */
  public v1SpaceApplicantRejectUpdate(
    id: string,
    body: ApplicantapimodelsRejectRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantRejectUpdate(
    id: string,
    body: ApplicantapimodelsRejectRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantRejectUpdate(
    id: string,
    body: ApplicantapimodelsRejectRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}/reject`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать резюме кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantResumeList
   * @summary Скачать резюме кандидата
   * @request GET:/api/v1/space/applicant/{id}/resume
   */
  public v1SpaceApplicantResumeList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantResumeList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantResumeList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/applicant/${id}/resume`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить резюме кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantResumeDelete
   * @summary Удалить резюме кандидата
   * @request DELETE:/api/v1/space/applicant/{id}/resume
   */
  public v1SpaceApplicantResumeDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantResumeDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantResumeDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/applicant/${id}/resume`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Добавить тэг
   *
   * @tags Кандидат
   * @name V1SpaceApplicantTagUpdate
   * @summary Добавить тэг
   * @request PUT:/api/v1/space/applicant/{id}/tag
   */
  public v1SpaceApplicantTagUpdate(
    id: string,
    query?: {
      /** добавляемый Тег */
      tag?: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantTagUpdate(
    id: string,
    query?: {
      /** добавляемый Тег */
      tag?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantTagUpdate(
    id: string,
    query?: {
      /** добавляемый Тег */
      tag?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/applicant/${id}/tag`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить тэг
   *
   * @tags Кандидат
   * @name V1SpaceApplicantTagDelete
   * @summary Удалить тэг
   * @request DELETE:/api/v1/space/applicant/{id}/tag
   */
  public v1SpaceApplicantTagDelete(
    id: string,
    query?: {
      /** удаляемый Тег */
      tag?: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceApplicantTagDelete(
    id: string,
    query?: {
      /** удаляемый Тег */
      tag?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceApplicantTagDelete(
    id: string,
    query?: {
      /** удаляемый Тег */
      tag?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/space/applicant/${id}/tag`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить документ кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantUploadDocCreate
   * @summary Загрузить документ кандидата
   * @request POST:/api/v1/space/applicant/{id}/upload-doc
   */
  public v1SpaceApplicantUploadDocCreate(
    id: string,
    data: {
      /** file to upload */
      document: File;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantUploadDocCreate(
    id: string,
    data: {
      /** file to upload */
      document: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantUploadDocCreate(
    id: string,
    data: {
      /** file to upload */
      document: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/space/applicant/${id}/upload-doc`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить фото кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantUploadPhotoCreate
   * @summary Загрузить фото кандидата
   * @request POST:/api/v1/space/applicant/{id}/upload-photo
   */
  public v1SpaceApplicantUploadPhotoCreate(
    id: string,
    data: {
      /** Фото кандидата */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantUploadPhotoCreate(
    id: string,
    data: {
      /** Фото кандидата */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantUploadPhotoCreate(
    id: string,
    data: {
      /** Фото кандидата */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/space/applicant/${id}/upload-photo`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить резюме кандидата
   *
   * @tags Кандидат
   * @name V1SpaceApplicantUploadResumeCreate
   * @summary Загрузить резюме кандидата
   * @request POST:/api/v1/space/applicant/{id}/upload-resume
   */
  public v1SpaceApplicantUploadResumeCreate(
    id: string,
    data: {
      /** file to upload */
      resume: File;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceApplicantUploadResumeCreate(
    id: string,
    data: {
      /** file to upload */
      resume: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceApplicantUploadResumeCreate(
    id: string,
    data: {
      /** file to upload */
      resume: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/space/applicant/${id}/upload-resume`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Проверка подключения к Avito
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoCheckConnectedList
   * @summary Проверка подключения к Avito
   * @request GET:/api/v1/space/ext/avito/check_connected
   */
  public v1SpaceExtAvitoCheckConnectedList(
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoCheckConnectedList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoCheckConnectedList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/space/ext/avito/check_connected`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение ссылки для авторизации
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoConnectUriList
   * @summary Получение ссылки для авторизации
   * @request GET:/api/v1/space/ext/avito/connect_uri
   */
  public v1SpaceExtAvitoConnectUriList(
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoConnectUriList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoConnectUriList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/space/ext/avito/connect_uri`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Привязать существующую вакансию
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoAttachUpdate
   * @summary Привязать существующую вакансию
   * @request PUT:/api/v1/space/ext/avito/{id}/attach
   */
  public v1SpaceExtAvitoAttachUpdate(
    id: string,
    body: AvitoapimodelsVacancyAttach,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoAttachUpdate(
    id: string,
    body: AvitoapimodelsVacancyAttach,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoAttachUpdate(
    id: string,
    body: AvitoapimodelsVacancyAttach,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/avito/${id}/attach`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление вакансии
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoCloseUpdate
   * @summary Удаление вакансии
   * @request PUT:/api/v1/space/ext/avito/{id}/close
   */
  public v1SpaceExtAvitoCloseUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoCloseUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoCloseUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/avito/${id}/close`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Публикация вакансии
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoPublishUpdate
   * @summary Публикация вакансии
   * @request PUT:/api/v1/space/ext/avito/{id}/publish
   */
  public v1SpaceExtAvitoPublishUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoPublishUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoPublishUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/avito/${id}/publish`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Статус размещения
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoStatusList
   * @summary Статус размещения
   * @request GET:/api/v1/space/ext/avito/{id}/status
   */
  public v1SpaceExtAvitoStatusList(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsExtVacancyInfo;
    }
  >;
  public v1SpaceExtAvitoStatusList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >
  >;
  public v1SpaceExtAvitoStatusList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsExtVacancyInfo;
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >('GET', this.baseUrl + `/api/v1/space/ext/avito/${id}/status`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Публикация обновления по вакансии
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoUpdateUpdate
   * @summary Публикация обновления по вакансии
   * @request PUT:/api/v1/space/ext/avito/{id}/update
   */
  public v1SpaceExtAvitoUpdateUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoUpdateUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoUpdateUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/avito/${id}/update`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Проверка подключения к HH
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhCheckConnectedList
   * @summary Проверка подключения к HH
   * @request GET:/api/v1/space/ext/hh/check_connected
   */
  public v1SpaceExtHhCheckConnectedList(
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhCheckConnectedList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhCheckConnectedList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/space/ext/hh/check_connected`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение ссылки для авторизации
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhConnectUriList
   * @summary Получение ссылки для авторизации
   * @request GET:/api/v1/space/ext/hh/connect_uri
   */
  public v1SpaceExtHhConnectUriList(
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhConnectUriList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhConnectUriList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'GET',
      this.baseUrl + `/api/v1/space/ext/hh/connect_uri`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Привязать существующую вакансию
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhAttachUpdate
   * @summary Привязать существующую вакансию
   * @request PUT:/api/v1/space/ext/hh/{id}/attach
   */
  public v1SpaceExtHhAttachUpdate(
    id: string,
    body: HhapimodelsVacancyAttach,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhAttachUpdate(
    id: string,
    body: HhapimodelsVacancyAttach,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhAttachUpdate(
    id: string,
    body: HhapimodelsVacancyAttach,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/hh/${id}/attach`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление вакансии
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhCloseUpdate
   * @summary Удаление вакансии
   * @request PUT:/api/v1/space/ext/hh/{id}/close
   */
  public v1SpaceExtHhCloseUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhCloseUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhCloseUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/hh/${id}/close`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Публикация вакансии
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhPublishUpdate
   * @summary Публикация вакансии
   * @request PUT:/api/v1/space/ext/hh/{id}/publish
   */
  public v1SpaceExtHhPublishUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhPublishUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhPublishUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/hh/${id}/publish`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Статус размещения
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhStatusList
   * @summary Статус размещения
   * @request GET:/api/v1/space/ext/hh/{id}/status
   */
  public v1SpaceExtHhStatusList(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsExtVacancyInfo;
    }
  >;
  public v1SpaceExtHhStatusList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >
  >;
  public v1SpaceExtHhStatusList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsExtVacancyInfo;
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >('GET', this.baseUrl + `/api/v1/space/ext/hh/${id}/status`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Публикация обновления по вакансии
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhUpdateUpdate
   * @summary Публикация обновления по вакансии
   * @request PUT:/api/v1/space/ext/hh/{id}/update
   */
  public v1SpaceExtHhUpdateUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhUpdateUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhUpdateUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/ext/hh/${id}/update`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Проверка доступности чата через работный сайт
   *
   * @tags Мессенджер
   * @name V1SpaceMessengerJobIsAvailableList
   * @summary Проверка доступности чата через работный сайт
   * @request GET:/api/v1/space/messenger/job/is_available
   */
  public v1SpaceMessengerJobIsAvailableList(
    body: NegotiationapimodelsMessengerAvailableRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: NegotiationapimodelsMessengerAvailableResponse;
    }
  >;
  public v1SpaceMessengerJobIsAvailableList(
    body: NegotiationapimodelsMessengerAvailableRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: NegotiationapimodelsMessengerAvailableResponse;
      }
    >
  >;
  public v1SpaceMessengerJobIsAvailableList(
    body: NegotiationapimodelsMessengerAvailableRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: NegotiationapimodelsMessengerAvailableResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: NegotiationapimodelsMessengerAvailableResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: NegotiationapimodelsMessengerAvailableResponse;
      }
    >('GET', this.baseUrl + `/api/v1/space/messenger/job/is_available`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение списка сообщений чата с кандидатом через работный сайт
   *
   * @tags Мессенджер
   * @name V1SpaceMessengerJobListCreate
   * @summary Получение списка сообщений чата с кандидатом через работный сайт
   * @request POST:/api/v1/space/messenger/job/list
   */
  public v1SpaceMessengerJobListCreate(
    body: NegotiationapimodelsMessageListRequest,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: NegotiationapimodelsMessageItem;
    }
  >;
  public v1SpaceMessengerJobListCreate(
    body: NegotiationapimodelsMessageListRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: NegotiationapimodelsMessageItem;
      }
    >
  >;
  public v1SpaceMessengerJobListCreate(
    body: NegotiationapimodelsMessageListRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: NegotiationapimodelsMessageItem;
        }
      >
    | (ApimodelsResponse & {
        data?: NegotiationapimodelsMessageItem;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: NegotiationapimodelsMessageItem;
      }
    >('POST', this.baseUrl + `/api/v1/space/messenger/job/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Отправка нового сообщение кандидату через работный сайт
   *
   * @tags Мессенджер
   * @name V1SpaceMessengerJobSendMessageCreate
   * @summary Отправка нового сообщение кандидату через работный сайт
   * @request POST:/api/v1/space/messenger/job/send_message
   */
  public v1SpaceMessengerJobSendMessageCreate(
    body: NegotiationapimodelsNewMessageRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMessengerJobSendMessageCreate(
    body: NegotiationapimodelsNewMessageRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMessengerJobSendMessageCreate(
    body: NegotiationapimodelsNewMessageRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/messenger/job/send_message`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesCreate
   * @summary Создание
   * @request POST:/api/v1/space/msg-templates
   */
  public v1SpaceMsgTemplatesCreate(
    body: MsgtemplateapimodelsMsgTemplateData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceMsgTemplatesCreate(
    body: MsgtemplateapimodelsMsgTemplateData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceMsgTemplatesCreate(
    body: MsgtemplateapimodelsMsgTemplateData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/space/msg-templates`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Список шаблонов сообщений
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesListList
   * @summary Список шаблонов сообщений
   * @request GET:/api/v1/space/msg-templates/list
   */
  public v1SpaceMsgTemplatesListList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: MsgtemplateapimodelsMsgTemplateView[];
    }
  >;
  public v1SpaceMsgTemplatesListList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: MsgtemplateapimodelsMsgTemplateView[];
      }
    >
  >;
  public v1SpaceMsgTemplatesListList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: MsgtemplateapimodelsMsgTemplateView[];
        }
      >
    | (ApimodelsResponse & {
        data?: MsgtemplateapimodelsMsgTemplateView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: MsgtemplateapimodelsMsgTemplateView[];
      }
    >('GET', this.baseUrl + `/api/v1/space/msg-templates/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Отправить сообщение кандидату на почту
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesSendEmailMsgCreate
   * @summary Отправить сообщение кандидату на почту
   * @request POST:/api/v1/space/msg-templates/send-email-msg
   */
  public v1SpaceMsgTemplatesSendEmailMsgCreate(
    body: MsgtemplateapimodelsSendMessage,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesSendEmailMsgCreate(
    body: MsgtemplateapimodelsSendMessage,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesSendEmailMsgCreate(
    body: MsgtemplateapimodelsSendMessage,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/msg-templates/send-email-msg`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Переменные шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesVariablesList
   * @summary Переменные шаблона
   * @request GET:/api/v1/space/msg-templates/variables
   */
  public v1SpaceMsgTemplatesVariablesList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: MsgtemplateapimodelsTemplateItem[];
    }
  >;
  public v1SpaceMsgTemplatesVariablesList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: MsgtemplateapimodelsTemplateItem[];
      }
    >
  >;
  public v1SpaceMsgTemplatesVariablesList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: MsgtemplateapimodelsTemplateItem[];
        }
      >
    | (ApimodelsResponse & {
        data?: MsgtemplateapimodelsTemplateItem[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: MsgtemplateapimodelsTemplateItem[];
      }
    >('GET', this.baseUrl + `/api/v1/space/msg-templates/variables`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/space/msg-templates/{id}
   */
  public v1SpaceMsgTemplatesDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView;
    }
  >;
  public v1SpaceMsgTemplatesDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >
  >;
  public v1SpaceMsgTemplatesDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: DictapimodelsCompanyView;
        }
      >
    | (ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >('GET', this.baseUrl + `/api/v1/space/msg-templates/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesUpdate
   * @summary Обновление
   * @request PUT:/api/v1/space/msg-templates/{id}
   */
  public v1SpaceMsgTemplatesUpdate(
    id: string,
    body: MsgtemplateapimodelsMsgTemplateData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesUpdate(
    id: string,
    body: MsgtemplateapimodelsMsgTemplateData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesUpdate(
    id: string,
    body: MsgtemplateapimodelsMsgTemplateData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/msg-templates/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesDelete
   * @summary Удаление
   * @request DELETE:/api/v1/space/msg-templates/{id}
   */
  public v1SpaceMsgTemplatesDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/space/msg-templates/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать изображение логотипа компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesLogoList
   * @summary Скачать изображение логотипа компании для шаблона
   * @request GET:/api/v1/space/msg-templates/{id}/logo
   */
  public v1SpaceMsgTemplatesLogoList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesLogoList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesLogoList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/logo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить изображение логотипа компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesLogoCreate
   * @summary Загрузить изображение логотипа компании для шаблона
   * @request POST:/api/v1/space/msg-templates/{id}/logo
   */
  public v1SpaceMsgTemplatesLogoCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesLogoCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesLogoCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/logo`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить изображение логотипа компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesLogoDelete
   * @summary Удалить изображение логотипа компании для шаблона
   * @request DELETE:/api/v1/space/msg-templates/{id}/logo
   */
  public v1SpaceMsgTemplatesLogoDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesLogoDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesLogoDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/logo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Предпросмотр pdf на основе шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesPreviewPdfList
   * @summary Предпросмотр pdf на основе шаблона
   * @request GET:/api/v1/space/msg-templates/{id}/preview_pdf
   */
  public v1SpaceMsgTemplatesPreviewPdfList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesPreviewPdfList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesPreviewPdfList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/preview_pdf`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать изображение подписи для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesSignList
   * @summary Скачать изображение подписи для шаблона
   * @request GET:/api/v1/space/msg-templates/{id}/sign
   */
  public v1SpaceMsgTemplatesSignList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesSignList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesSignList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/sign`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить изображение подписи для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesSignCreate
   * @summary Загрузить изображение подписи для шаблона
   * @request POST:/api/v1/space/msg-templates/{id}/sign
   */
  public v1SpaceMsgTemplatesSignCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesSignCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesSignCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/sign`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить изображение подписи для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesSignDelete
   * @summary Удалить изображение подписи для шаблона
   * @request DELETE:/api/v1/space/msg-templates/{id}/sign
   */
  public v1SpaceMsgTemplatesSignDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesSignDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesSignDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/sign`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать изображение печати компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesStampList
   * @summary Скачать изображение печати компании для шаблона
   * @request GET:/api/v1/space/msg-templates/{id}/stamp
   */
  public v1SpaceMsgTemplatesStampList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesStampList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesStampList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/stamp`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить изображение печати компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesStampCreate
   * @summary Загрузить изображение печати компании для шаблона
   * @request POST:/api/v1/space/msg-templates/{id}/stamp
   */
  public v1SpaceMsgTemplatesStampCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceMsgTemplatesStampCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceMsgTemplatesStampCreate(
    id: string,
    data: {
      /** Фото */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/stamp`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить изображение печати компании для шаблона
   *
   * @tags Шаблоны сообщений
   * @name V1SpaceMsgTemplatesStampDelete
   * @summary Удалить изображение печати компании для шаблона
   * @request DELETE:/api/v1/space/msg-templates/{id}/stamp
   */
  public v1SpaceMsgTemplatesStampDelete(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceMsgTemplatesStampDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceMsgTemplatesStampDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'DELETE',
      this.baseUrl + `/api/v1/space/msg-templates/${id}/stamp`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Список
   *
   * @tags Отклики
   * @name V1SpaceNegotiationListCreate
   * @summary Список
   * @request POST:/api/v1/space/negotiation/list
   */
  public v1SpaceNegotiationListCreate(
    body: DbmodelsNegotiationFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: NegotiationapimodelsNegotiationView[];
    }
  >;
  public v1SpaceNegotiationListCreate(
    body: DbmodelsNegotiationFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView[];
      }
    >
  >;
  public v1SpaceNegotiationListCreate(
    body: DbmodelsNegotiationFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: NegotiationapimodelsNegotiationView[];
        }
      >
    | (ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView[];
      }
    >('POST', this.baseUrl + `/api/v1/space/negotiation/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Отклики
   * @name V1SpaceNegotiationDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/space/negotiation/{id}
   */
  public v1SpaceNegotiationDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: NegotiationapimodelsNegotiationView;
    }
  >;
  public v1SpaceNegotiationDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView;
      }
    >
  >;
  public v1SpaceNegotiationDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: NegotiationapimodelsNegotiationView;
        }
      >
    | (ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: NegotiationapimodelsNegotiationView;
      }
    >('GET', this.baseUrl + `/api/v1/space/negotiation/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Сохранить комментарий
   *
   * @tags Отклики
   * @name V1SpaceNegotiationCommentUpdate
   * @summary Сохранить комментарий
   * @request PUT:/api/v1/space/negotiation/{id}/comment
   */
  public v1SpaceNegotiationCommentUpdate(
    id: string,
    body: NegotiationapimodelsCommentData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceNegotiationCommentUpdate(
    id: string,
    body: NegotiationapimodelsCommentData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceNegotiationCommentUpdate(
    id: string,
    body: NegotiationapimodelsCommentData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/negotiation/${id}/comment`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Смена статуса
   *
   * @tags Отклики
   * @name V1SpaceNegotiationStatusChangeUpdate
   * @summary Смена статуса
   * @request PUT:/api/v1/space/negotiation/{id}/status_change
   */
  public v1SpaceNegotiationStatusChangeUpdate(
    id: string,
    body: NegotiationapimodelsStatusData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceNegotiationStatusChangeUpdate(
    id: string,
    body: NegotiationapimodelsStatusData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceNegotiationStatusChangeUpdate(
    id: string,
    body: NegotiationapimodelsStatusData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/negotiation/${id}/status_change`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение профиля
   *
   * @tags Профиль организации
   * @name V1SpaceProfileList
   * @summary Получение профиля
   * @request GET:/api/v1/space/profile
   */
  public v1SpaceProfileList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: SpaceapimodelsProfileData;
    }
  >;
  public v1SpaceProfileList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsProfileData;
      }
    >
  >;
  public v1SpaceProfileList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SpaceapimodelsProfileData;
        }
      >
    | (ApimodelsResponse & {
        data?: SpaceapimodelsProfileData;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SpaceapimodelsProfileData;
      }
    >('GET', this.baseUrl + `/api/v1/space/profile`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление профиля
   *
   * @tags Профиль организации
   * @name V1SpaceProfileUpdate
   * @summary Обновление профиля
   * @request PUT:/api/v1/space/profile
   */
  public v1SpaceProfileUpdate(
    body: SpaceapimodelsProfileData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceProfileUpdate(
    body: SpaceapimodelsProfileData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceProfileUpdate(
    body: SpaceapimodelsProfileData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/profile`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать фото
   *
   * @tags Профиль организации
   * @name V1SpaceProfilePhotoList
   * @summary Скачать фото
   * @request GET:/api/v1/space/profile/photo
   */
  public v1SpaceProfilePhotoList(options?: RequestOptions): Observable<void>;
  public v1SpaceProfilePhotoList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceProfilePhotoList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/space/profile/photo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить фото
   *
   * @tags Профиль организации
   * @name V1SpaceProfilePhotoCreate
   * @summary Загрузить фото
   * @request POST:/api/v1/space/profile/photo
   */
  public v1SpaceProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1SpaceProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1SpaceProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/space/profile/photo`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отправка заявки на связь с отделом продаж
   *
   * @tags Профиль организации
   * @name V1SpaceProfileSendLicenseRequestUpdate
   * @summary Отправка заявки на связь с отделом продаж
   * @request PUT:/api/v1/space/profile/send_license_request
   */
  public v1SpaceProfileSendLicenseRequestUpdate(
    body: SpaceapimodelsSalesRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceProfileSendLicenseRequestUpdate(
    body: SpaceapimodelsSalesRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceProfileSendLicenseRequestUpdate(
    body: SpaceapimodelsSalesRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/profile/send_license_request`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Список настроек
   *
   * @tags Настройки space
   * @name V1SpaceSettingsListList
   * @summary Список настроек
   * @request GET:/api/v1/space/settings/list
   */
  public v1SpaceSettingsListList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: SpaceapimodelsSpaceSettingView[];
    }
  >;
  public v1SpaceSettingsListList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceSettingView[];
      }
    >
  >;
  public v1SpaceSettingsListList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SpaceapimodelsSpaceSettingView[];
        }
      >
    | (ApimodelsResponse & {
        data?: SpaceapimodelsSpaceSettingView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceSettingView[];
      }
    >('GET', this.baseUrl + `/api/v1/space/settings/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновить значение настройки пространства
   *
   * @tags Настройки space
   * @name V1SpaceSettingsUpdate
   * @summary Обновить значение настройки пространства
   * @request PUT:/api/v1/space/settings/{code}
   */
  public v1SpaceSettingsUpdate(
    code: string,
    body: SpaceapimodelsUpdateSpaceSettingValue,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceSettingsUpdate(
    code: string,
    body: SpaceapimodelsUpdateSpaceSettingValue,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceSettingsUpdate(
    code: string,
    body: SpaceapimodelsUpdateSpaceSettingValue,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/settings/${code}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получение гостевого токена
   *
   * @tags Superset
   * @name V1SpaceSupersetGuestTokenList
   * @summary Получение гостевого токена
   * @request GET:/api/v1/space/superset/guest_token
   */
  public v1SpaceSupersetGuestTokenList(
    query?: {
      /** Код дашборда */
      dashboard_code?: string;
    },
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: SupersetapimodelsGuestTokenResponse;
    }
  >;
  public v1SpaceSupersetGuestTokenList(
    query?: {
      /** Код дашборда */
      dashboard_code?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SupersetapimodelsGuestTokenResponse;
      }
    >
  >;
  public v1SpaceSupersetGuestTokenList(
    query?: {
      /** Код дашборда */
      dashboard_code?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SupersetapimodelsGuestTokenResponse;
        }
      >
    | (ApimodelsResponse & {
        data?: SupersetapimodelsGuestTokenResponse;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SupersetapimodelsGuestTokenResponse;
      }
    >('GET', this.baseUrl + `/api/v1/space/superset/guest_token`, {
      params: query,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Создание
   *
   * @tags Вакансия
   * @name V1SpaceVacancyCreate
   * @summary Создание
   * @request POST:/api/v1/space/vacancy
   */
  public v1SpaceVacancyCreate(
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceVacancyCreate(
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceVacancyCreate(
    body: VacancyapimodelsVacancyData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Список
   *
   * @tags Вакансия
   * @name V1SpaceVacancyListCreate
   * @summary Список
   * @request POST:/api/v1/space/vacancy/list
   */
  public v1SpaceVacancyListCreate(
    body: VacancyapimodelsVacancyFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: VacancyapimodelsVacancyView[];
    }
  >;
  public v1SpaceVacancyListCreate(
    body: VacancyapimodelsVacancyFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyView[];
      }
    >
  >;
  public v1SpaceVacancyListCreate(
    body: VacancyapimodelsVacancyFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: VacancyapimodelsVacancyView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyView[];
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Вакансия
   * @name V1SpaceVacancyDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/space/vacancy/{id}
   */
  public v1SpaceVacancyDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyView;
    }
  >;
  public v1SpaceVacancyDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView;
      }
    >
  >;
  public v1SpaceVacancyDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsVacancyView;
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView;
      }
    >('GET', this.baseUrl + `/api/v1/space/vacancy/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Вакансия
   * @name V1SpaceVacancyUpdate
   * @summary Обновление
   * @request PUT:/api/v1/space/vacancy/{id}
   */
  public v1SpaceVacancyUpdate(
    id: string,
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyUpdate(
    id: string,
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyUpdate(
    id: string,
    body: VacancyapimodelsVacancyData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Вакансия
   * @name V1SpaceVacancyDelete
   * @summary Удаление
   * @request DELETE:/api/v1/space/vacancy/{id}
   */
  public v1SpaceVacancyDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/space/vacancy/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Изменение статуса вакансии
   *
   * @tags Вакансия
   * @name V1SpaceVacancyChangeStatusUpdate
   * @summary Изменение статуса вакансии
   * @request PUT:/api/v1/space/vacancy/{id}/change_status
   */
  public v1SpaceVacancyChangeStatusUpdate(
    id: string,
    body: VacancyapimodelsStatusChangeRequest,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyChangeStatusUpdate(
    id: string,
    body: VacancyapimodelsStatusChangeRequest,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyChangeStatusUpdate(
    id: string,
    body: VacancyapimodelsStatusChangeRequest,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/change_status`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Добавить комментарий к вакансии
   *
   * @tags Вакансия
   * @name V1SpaceVacancyCommentCreate
   * @summary Добавить комментарий к вакансии
   * @request POST:/api/v1/space/vacancy/{id}/comment
   */
  public v1SpaceVacancyCommentCreate(
    id: string,
    body: VacancyapimodelsComment,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyCommentCreate(
    id: string,
    body: VacancyapimodelsComment,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyCommentCreate(
    id: string,
    body: VacancyapimodelsComment,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/vacancy/${id}/comment`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description В избранное
   *
   * @tags Вакансия
   * @name V1SpaceVacancyFavoriteUpdate
   * @summary В избранное
   * @request PUT:/api/v1/space/vacancy/{id}/favorite
   */
  public v1SpaceVacancyFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/favorite`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Закрепить
   *
   * @tags Вакансия
   * @name V1SpaceVacancyPinUpdate
   * @summary Закрепить
   * @request PUT:/api/v1/space/vacancy/{id}/pin
   */
  public v1SpaceVacancyPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/pin`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Добавить этап подбора
   *
   * @tags Вакансия
   * @name V1SpaceVacancyStageCreate
   * @summary Добавить этап подбора
   * @request POST:/api/v1/space/vacancy/{id}/stage
   */
  public v1SpaceVacancyStageCreate(
    id: string,
    body: VacancyapimodelsSelectionStageAdd,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyStageCreate(
    id: string,
    body: VacancyapimodelsSelectionStageAdd,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyStageCreate(
    id: string,
    body: VacancyapimodelsSelectionStageAdd,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'POST',
      this.baseUrl + `/api/v1/space/vacancy/${id}/stage`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление этап подбора
   *
   * @tags Вакансия
   * @name V1SpaceVacancyStageDelete
   * @summary Удаление этап подбора
   * @request DELETE:/api/v1/space/vacancy/{id}/stage
   */
  public v1SpaceVacancyStageDelete(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyStageDelete(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyStageDelete(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/space/vacancy/${id}/stage`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Изменение порядка этапов подбора
   *
   * @tags Вакансия
   * @name V1SpaceVacancyStageChangeOrderUpdate
   * @summary Изменение порядка этапов подбора
   * @request PUT:/api/v1/space/vacancy/{id}/stage/change_order
   */
  public v1SpaceVacancyStageChangeOrderUpdate(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
      /** новый порядковый номер */
      stage_order?: number;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyStageChangeOrderUpdate(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
      /** новый порядковый номер */
      stage_order?: number;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyStageChangeOrderUpdate(
    id: string,
    query?: {
      /** идентификатор этапа */
      stage_id?: string;
      /** новый порядковый номер */
      stage_order?: number;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/stage/change_order`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Список этапов подбора
   *
   * @tags Вакансия
   * @name V1SpaceVacancyStageListCreate
   * @summary Список этапов подбора
   * @request POST:/api/v1/space/vacancy/{id}/stage/list
   */
  public v1SpaceVacancyStageListCreate(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: VacancyapimodelsSelectionStageView[];
    }
  >;
  public v1SpaceVacancyStageListCreate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsSelectionStageView[];
      }
    >
  >;
  public v1SpaceVacancyStageListCreate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: VacancyapimodelsSelectionStageView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: VacancyapimodelsSelectionStageView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsSelectionStageView[];
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy/${id}/stage/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение анкеты HR (генерация, в случае отсутствия)
   *
   * @tags Анкета HR по вакансии
   * @name V1SpaceVacancySurveyList
   * @summary Получение анкеты HR (генерация, в случае отсутствия)
   * @request GET:/api/v1/space/vacancy/{id}/survey
   */
  public v1SpaceVacancySurveyList(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: SurveyapimodelsHRSurveyView;
    }
  >;
  public v1SpaceVacancySurveyList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      }
    >
  >;
  public v1SpaceVacancySurveyList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SurveyapimodelsHRSurveyView;
        }
      >
    | (ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      }
    >('GET', this.baseUrl + `/api/v1/space/vacancy/${id}/survey`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Сохранение анкеты HR (перегенерация вопросов в случае если вопрос не подходит)
   *
   * @tags Анкета HR по вакансии
   * @name V1SpaceVacancySurveyCreate
   * @summary Сохранение анкеты HR (перегенерация вопросов в случае если вопрос не подходит)
   * @request POST:/api/v1/space/vacancy/{id}/survey
   */
  public v1SpaceVacancySurveyCreate(
    id: string,
    body: SurveyapimodelsHRSurvey,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: SurveyapimodelsHRSurveyView;
    }
  >;
  public v1SpaceVacancySurveyCreate(
    id: string,
    body: SurveyapimodelsHRSurvey,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      }
    >
  >;
  public v1SpaceVacancySurveyCreate(
    id: string,
    body: SurveyapimodelsHRSurvey,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SurveyapimodelsHRSurveyView;
        }
      >
    | (ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SurveyapimodelsHRSurveyView;
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy/${id}/survey`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Команда
   *
   * @tags Вакансия
   * @name V1SpaceVacancyTeamListCreate
   * @summary Команда
   * @request POST:/api/v1/space/vacancy/{id}/team/list
   */
  public v1SpaceVacancyTeamListCreate(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsTeamPerson[];
    }
  >;
  public v1SpaceVacancyTeamListCreate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >
  >;
  public v1SpaceVacancyTeamListCreate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsTeamPerson[];
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy/${id}/team/list`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Команда. Список пользователей в системе
   *
   * @tags Вакансия
   * @name V1SpaceVacancyTeamUsersListCreate
   * @summary Команда. Список пользователей в системе
   * @request POST:/api/v1/space/vacancy/{id}/team/users_list
   */
  public v1SpaceVacancyTeamUsersListCreate(
    id: string,
    body: VacancyapimodelsPersonFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsTeamPerson[];
    }
  >;
  public v1SpaceVacancyTeamUsersListCreate(
    id: string,
    body: VacancyapimodelsPersonFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >
  >;
  public v1SpaceVacancyTeamUsersListCreate(
    id: string,
    body: VacancyapimodelsPersonFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsTeamPerson[];
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy/${id}/team/users_list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Команда. Исключить участника
   *
   * @tags Вакансия
   * @name V1SpaceVacancyTeamExcludeUpdate
   * @summary Команда. Исключить участника
   * @request PUT:/api/v1/space/vacancy/{id}/team/{user_id}/exclude
   */
  public v1SpaceVacancyTeamExcludeUpdate(
    id: string,
    userId: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyTeamExcludeUpdate(
    id: string,
    userId: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyTeamExcludeUpdate(
    id: string,
    userId: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/team/${userId}/exclude`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Команда. Пригласить участника
   *
   * @tags Вакансия
   * @name V1SpaceVacancyTeamInviteUpdate
   * @summary Команда. Пригласить участника
   * @request PUT:/api/v1/space/vacancy/{id}/team/{user_id}/invite
   */
  public v1SpaceVacancyTeamInviteUpdate(
    id: string,
    userId: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsTeamPerson[];
    }
  >;
  public v1SpaceVacancyTeamInviteUpdate(
    id: string,
    userId: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >
  >;
  public v1SpaceVacancyTeamInviteUpdate(
    id: string,
    userId: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsTeamPerson[];
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsTeamPerson[];
      }
    >(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy/${id}/team/${userId}/invite`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Команда. Сделать ответственным
   *
   * @tags Вакансия
   * @name V1SpaceVacancyTeamSetAsResponsibleUpdate
   * @summary Команда. Сделать ответственным
   * @request PUT:/api/v1/space/vacancy/{id}/team/{user_id}/set_as_responsible
   */
  public v1SpaceVacancyTeamSetAsResponsibleUpdate(
    id: string,
    userId: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyTeamSetAsResponsibleUpdate(
    id: string,
    userId: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyTeamSetAsResponsibleUpdate(
    id: string,
    userId: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl +
        `/api/v1/space/vacancy/${id}/team/${userId}/set_as_responsible`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создание
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestCreate
   * @summary Создание
   * @request POST:/api/v1/space/vacancy_request
   */
  public v1SpaceVacancyRequestCreate(
    body: VacancyapimodelsVacancyRequestCreateData,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceVacancyRequestCreate(
    body: VacancyapimodelsVacancyRequestCreateData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceVacancyRequestCreate(
    body: VacancyapimodelsVacancyRequestCreateData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: string;
        }
      >
    | (ApimodelsResponse & {
        data?: string;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: string;
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy_request`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Список
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestListCreate
   * @summary Список
   * @request POST:/api/v1/space/vacancy_request/list
   */
  public v1SpaceVacancyRequestListCreate(
    body: VacancyapimodelsVrFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: VacancyapimodelsVacancyRequestView[];
    }
  >;
  public v1SpaceVacancyRequestListCreate(
    body: VacancyapimodelsVrFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      }
    >
  >;
  public v1SpaceVacancyRequestListCreate(
    body: VacancyapimodelsVrFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: VacancyapimodelsVacancyRequestView[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      }
    >('POST', this.baseUrl + `/api/v1/space/vacancy_request/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получение по ИД
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestDetail
   * @summary Получение по ИД
   * @request GET:/api/v1/space/vacancy_request/{id}
   */
  public v1SpaceVacancyRequestDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyRequestView;
    }
  >;
  public v1SpaceVacancyRequestDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView;
      }
    >
  >;
  public v1SpaceVacancyRequestDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsVacancyRequestView;
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView;
      }
    >('GET', this.baseUrl + `/api/v1/space/vacancy_request/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновление
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestUpdate
   * @summary Обновление
   * @request PUT:/api/v1/space/vacancy_request/{id}
   */
  public v1SpaceVacancyRequestUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestEditData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestEditData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestEditData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удаление
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestDelete
   * @summary Удаление
   * @request DELETE:/api/v1/space/vacancy_request/{id}
   */
  public v1SpaceVacancyRequestDelete(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestDelete(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestDelete(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Обновление цепочки согласования
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestApprovalStagesUpdate
   * @summary Обновление цепочки согласования
   * @request PUT:/api/v1/space/vacancy_request/{id}/approval_stages
   */
  public v1SpaceVacancyRequestApprovalStagesUpdate(
    id: string,
    body: VacancyapimodelsApprovalStages[],
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestApprovalStagesUpdate(
    id: string,
    body: VacancyapimodelsApprovalStages[],
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestApprovalStagesUpdate(
    id: string,
    body: VacancyapimodelsApprovalStages[],
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/approval_stages`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Согласовать
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestApproveUpdate
   * @summary Согласовать
   * @request PUT:/api/v1/space/vacancy_request/{id}/approve
   */
  public v1SpaceVacancyRequestApproveUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestApproveUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestApproveUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/approve`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отменить заявку
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestCancelUpdate
   * @summary Отменить заявку
   * @request PUT:/api/v1/space/vacancy_request/{id}/cancel
   */
  public v1SpaceVacancyRequestCancelUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestCancelUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestCancelUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/cancel`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description В избранное
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestFavoriteUpdate
   * @summary В избранное
   * @request PUT:/api/v1/space/vacancy_request/{id}/favorite
   */
  public v1SpaceVacancyRequestFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/favorite`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отправить на согласование
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestOnApprovalUpdate
   * @summary Отправить на согласование
   * @request PUT:/api/v1/space/vacancy_request/{id}/on_approval
   */
  public v1SpaceVacancyRequestOnApprovalUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestOnApprovalUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestOnApprovalUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/on_approval`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Перевести шаблон на статус заявка создана
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestOnCreateUpdate
   * @summary Перевести шаблон на статус заявка создана
   * @request PUT:/api/v1/space/vacancy_request/{id}/on_create
   */
  public v1SpaceVacancyRequestOnCreateUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestOnCreateUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestOnCreateUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/on_create`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Закрепить
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestPinUpdate
   * @summary Закрепить
   * @request PUT:/api/v1/space/vacancy_request/{id}/pin
   */
  public v1SpaceVacancyRequestPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/pin`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создать вакансию
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestPublishUpdate
   * @summary Создать вакансию
   * @request PUT:/api/v1/space/vacancy_request/{id}/publish
   */
  public v1SpaceVacancyRequestPublishUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestPublishUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestPublishUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/publish`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Отклонить
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestRejectUpdate
   * @summary Отклонить
   * @request PUT:/api/v1/space/vacancy_request/{id}/reject
   */
  public v1SpaceVacancyRequestRejectUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestRejectUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestRejectUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/reject`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description На доработку
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestToRevisionUpdate
   * @summary На доработку
   * @request PUT:/api/v1/space/vacancy_request/{id}/to_revision
   */
  public v1SpaceVacancyRequestToRevisionUpdate(
    id: string,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestToRevisionUpdate(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestToRevisionUpdate(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/to_revision`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Получить профиль пользователя
   *
   * @tags Профиль пользователя space
   * @name V1UserProfileList
   * @summary Получить профиль пользователя
   * @request GET:/api/v1/user_profile
   */
  public v1UserProfileList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: SpaceapimodelsSpaceUserProfileView;
    }
  >;
  public v1UserProfileList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUserProfileView;
      }
    >
  >;
  public v1UserProfileList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SpaceapimodelsSpaceUserProfileView;
        }
      >
    | (ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUserProfileView;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUserProfileView;
      }
    >('GET', this.baseUrl + `/api/v1/user_profile`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновить профиль пользователя
   *
   * @tags Профиль пользователя space
   * @name V1UserProfileUpdate
   * @summary Обновить профиль пользователя
   * @request PUT:/api/v1/user_profile
   */
  public v1UserProfileUpdate(
    id: string,
    body: SpaceapimodelsSpaceUserProfileData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1UserProfileUpdate(
    id: string,
    body: SpaceapimodelsSpaceUserProfileData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1UserProfileUpdate(
    id: string,
    body: SpaceapimodelsSpaceUserProfileData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/user_profile`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Изменить пароль
   *
   * @tags Профиль пользователя space
   * @name V1UserProfileChangePasswordUpdate
   * @summary Изменить пароль
   * @request PUT:/api/v1/user_profile/change_password
   */
  public v1UserProfileChangePasswordUpdate(
    body: SpaceapimodelsPasswordChange,
    options?: RequestOptions
  ): Observable<void>;
  public v1UserProfileChangePasswordUpdate(
    body: SpaceapimodelsPasswordChange,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1UserProfileChangePasswordUpdate(
    body: SpaceapimodelsPasswordChange,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'PUT',
      this.baseUrl + `/api/v1/user_profile/change_password`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать фото
   *
   * @tags Профиль пользователя space
   * @name V1UserProfilePhotoList
   * @summary Скачать фото
   * @request GET:/api/v1/user_profile/photo
   */
  public v1UserProfilePhotoList(options?: RequestOptions): Observable<void>;
  public v1UserProfilePhotoList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1UserProfilePhotoList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/user_profile/photo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Загрузить фото
   *
   * @tags Профиль пользователя space
   * @name V1UserProfilePhotoCreate
   * @summary Загрузить фото
   * @request POST:/api/v1/user_profile/photo
   */
  public v1UserProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions
  ): Observable<void>;
  public v1UserProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1UserProfilePhotoCreate(
    data: {
      /** Фото */
      photo: File;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'POST',
      this.baseUrl + `/api/v1/user_profile/photo`,
      {
        body: data,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Push уведомления - список событий
   *
   * @tags Профиль пользователя space
   * @name V1UserProfilePushSettingsList
   * @summary Push уведомления - список событий
   * @request GET:/api/v1/user_profile/push_settings
   */
  public v1UserProfilePushSettingsList(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: SpaceapimodelsPushSettings;
    }
  >;
  public v1UserProfilePushSettingsList(
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsPushSettings;
      }
    >
  >;
  public v1UserProfilePushSettingsList(
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SpaceapimodelsPushSettings;
        }
      >
    | (ApimodelsResponse & {
        data?: SpaceapimodelsPushSettings;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SpaceapimodelsPushSettings;
      }
    >('GET', this.baseUrl + `/api/v1/user_profile/push_settings`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Push уведомления - настройка уведомлений по событию
   *
   * @tags Профиль пользователя space
   * @name V1UserProfilePushSettingsUpdate
   * @summary Push уведомления - настройка уведомлений по событию
   * @request PUT:/api/v1/user_profile/push_settings
   */
  public v1UserProfilePushSettingsUpdate(
    body: SpaceapimodelsPushSettingData,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1UserProfilePushSettingsUpdate(
    body: SpaceapimodelsPushSettingData,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1UserProfilePushSettingsUpdate(
    body: SpaceapimodelsPushSettingData,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/user_profile/push_settings`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Push уведомления - настройка отправки
   *
   * @tags Профиль пользователя space
   * @name V1UserProfilePushSettingsEnableUpdate
   * @summary Push уведомления - настройка отправки
   * @request PUT:/api/v1/user_profile/push_settings/enable
   */
  public v1UserProfilePushSettingsEnableUpdate(
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1UserProfilePushSettingsEnableUpdate(
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1UserProfilePushSettingsEnableUpdate(
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/user_profile/push_settings/enable`,
      {
        params: query,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Создать нового пользователя
   *
   * @tags Пользователи space
   * @name V1UsersCreate
   * @summary Создать нового пользователя
   * @request POST:/api/v1/users
   */
  public v1UsersCreate(
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions
  ): Observable<void>;
  public v1UsersCreate(
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1UsersCreate(
    body: SpaceapimodelsCreateUser,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>('POST', this.baseUrl + `/api/v1/users`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получить список пользователей space
   *
   * @tags Пользователи space
   * @name V1UsersListCreate
   * @summary Получить список пользователей space
   * @request POST:/api/v1/users/list
   */
  public v1UsersListCreate(
    body: SpaceapimodelsSpaceUserFilter,
    options?: RequestOptions
  ): Observable<
    ApimodelsScrollerResponse & {
      data?: SpaceapimodelsSpaceUser[];
    }
  >;
  public v1UsersListCreate(
    body: SpaceapimodelsSpaceUserFilter,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsScrollerResponse & {
        data?: SpaceapimodelsSpaceUser[];
      }
    >
  >;
  public v1UsersListCreate(
    body: SpaceapimodelsSpaceUserFilter,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsScrollerResponse & {
          data?: SpaceapimodelsSpaceUser[];
        }
      >
    | (ApimodelsScrollerResponse & {
        data?: SpaceapimodelsSpaceUser[];
      })
  > {
    return this.http.request<
      ApimodelsScrollerResponse & {
        data?: SpaceapimodelsSpaceUser[];
      }
    >('POST', this.baseUrl + `/api/v1/users/list`, {
      body: body,
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Получить пользователя space по ID
   *
   * @tags Пользователи space
   * @name V1UsersDetail
   * @summary Получить пользователя space по ID
   * @request GET:/api/v1/users/{id}
   */
  public v1UsersDetail(
    id: string,
    options?: RequestOptions
  ): Observable<
    ApimodelsResponse & {
      data?: SpaceapimodelsSpaceUser;
    }
  >;
  public v1UsersDetail(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUser;
      }
    >
  >;
  public v1UsersDetail(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: SpaceapimodelsSpaceUser;
        }
      >
    | (ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUser;
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceUser;
      }
    >('GET', this.baseUrl + `/api/v1/users/${id}`, {
      ...(options as unknown as { observe: 'response' }),
    });
  }
  /**
   * @description Обновить пользователя
   *
   * @tags Пользователи space
   * @name V1UsersUpdate
   * @summary Обновить пользователя
   * @request PUT:/api/v1/users/{id}
   */
  public v1UsersUpdate(
    id: string,
    body: SpaceapimodelsUpdateUser,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1UsersUpdate(
    id: string,
    body: SpaceapimodelsUpdateUser,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1UsersUpdate(
    id: string,
    body: SpaceapimodelsUpdateUser,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'PUT',
      this.baseUrl + `/api/v1/users/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Удалить пользователя
   *
   * @tags Пользователи space
   * @name V1UsersDelete
   * @summary Удалить пользователя
   * @request DELETE:/api/v1/users/{id}
   */
  public v1UsersDelete(
    id: string,
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions
  ): Observable<ApimodelsResponse>;
  public v1UsersDelete(
    id: string,
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1UsersDelete(
    id: string,
    body: SpaceapimodelsCreateUser,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      'DELETE',
      this.baseUrl + `/api/v1/users/${id}`,
      {
        body: body,
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
  /**
   * @description Скачать фото
   *
   * @tags Пользователи space
   * @name V1UsersPhotoList
   * @summary Скачать фото
   * @request GET:/api/v1/users/{id}/photo
   */
  public v1UsersPhotoList(
    id: string,
    options?: RequestOptions
  ): Observable<void>;
  public v1UsersPhotoList(
    id: string,
    options?: RequestOptions & { observe: 'response' }
  ): Observable<HttpResponse<void>>;
  public v1UsersPhotoList(
    id: string,
    options: RequestOptions & { observe: 'response' } = { observe: 'response' }
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>(
      'GET',
      this.baseUrl + `/api/v1/users/${id}/photo`,
      {
        ...(options as unknown as { observe: 'response' }),
      }
    );
  }
}
