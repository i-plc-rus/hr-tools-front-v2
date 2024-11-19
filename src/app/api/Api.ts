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

import { HttpClient, HttpResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { RequestOptions } from "./http-client";

import {
  AdminpanelapimodelsUser,
  AdminpanelapimodelsUserUpdate,
  AdminpanelapimodelsUserView,
  ApimodelsPagination,
  ApimodelsResponse,
  AuthapimodelsJWTRefreshRequest,
  AuthapimodelsJWTResponse,
  AuthapimodelsLoginRequest,
  AuthapimodelsSendEmail,
  AvitoapimodelsVacancyAttach,
  DbmodelsVacancyFilter,
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
  GptmodelsGenVacancyDescRequest,
  GptmodelsGenVacancyDescResponse,
  HhapimodelsVacancyAttach,
  SpaceapimodelsCreateOrganization,
  SpaceapimodelsCreateUser,
  SpaceapimodelsSpaceSettingView,
  SpaceapimodelsSpaceUser,
  SpaceapimodelsUpdateSpaceSettingValue,
  SpaceapimodelsUpdateUser,
  VacancyapimodelsApprovalStages,
  VacancyapimodelsExtVacancyInfo,
  VacancyapimodelsVacancyData,
  VacancyapimodelsVacancyRequestData,
  VacancyapimodelsVacancyRequestEditData,
  VacancyapimodelsVacancyRequestView,
  VacancyapimodelsVacancyView,
} from "./data-contracts";
import {API_BASE_URL} from '../tokens/api.token';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_BASE_URL) private readonly baseUrl: string = "",
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AdminPanelLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AdminPanelLoginCreate(
    body: AuthapimodelsLoginRequest,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/admin_panel/login`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1AdminPanelUserCreateCreate(
    body: AdminpanelapimodelsUser,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserCreateCreate(
    body: AdminpanelapimodelsUser,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("POST", this.baseUrl + `/api/v1/admin_panel/user/create`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление пользователя
   *
   * @tags Админ панель. Пользователи
   * @name V1AdminPanelUserDeleteDelete
   * @summary Удаление пользователя
   * @request DELETE:/api/v1/admin_panel/user/delete/{userID}
   */
  public v1AdminPanelUserDeleteDelete(userId: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1AdminPanelUserDeleteDelete(
    userId: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserDeleteDelete(
    userId: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/admin_panel/user/delete/${userId}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: AdminpanelapimodelsUserView;
    }
  >;
  public v1AdminPanelUserGetDetail(
    userId: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView;
      }
    >
  >;
  public v1AdminPanelUserGetDetail(
    userId: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/admin_panel/user/get/${userId}`, {
      ...(options as unknown as { observe: "response" }),
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
  public v1AdminPanelUserListCreate(options?: RequestOptions & { observe: "response" }): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AdminpanelapimodelsUserView[];
      }
    >
  >;
  public v1AdminPanelUserListCreate(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/admin_panel/user/list`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1AdminPanelUserUpdateUpdate(
    userId: string,
    body: AdminpanelapimodelsUserUpdate,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1AdminPanelUserUpdateUpdate(
    userId: string,
    body: AdminpanelapimodelsUserUpdate,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/admin_panel/user/update/${userId}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Проверить почту
   *
   * @tags Регистрация_организации
   * @name V1AuthCheckEmailCreate
   * @summary Проверить почту
   * @request POST:/api/v1/auth/check-email
   */
  public v1AuthCheckEmailCreate(body: AuthapimodelsSendEmail, options?: RequestOptions): Observable<void>;
  public v1AuthCheckEmailCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1AuthCheckEmailCreate(
    body: AuthapimodelsSendEmail,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/auth/check-email`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AuthLoginCreate(
    body: AuthapimodelsLoginRequest,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AuthLoginCreate(
    body: AuthapimodelsLoginRequest,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/auth/login`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
  public v1AuthMeList(options?: RequestOptions): Observable<SpaceapimodelsSpaceUser>;
  public v1AuthMeList(
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<SpaceapimodelsSpaceUser>>;
  public v1AuthMeList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<SpaceapimodelsSpaceUser> | SpaceapimodelsSpaceUser> {
    return this.http.request<SpaceapimodelsSpaceUser>("GET", this.baseUrl + `/api/v1/auth/me`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: AuthapimodelsJWTResponse;
    }
  >;
  public v1AuthRefreshTokenCreate(
    body: AuthapimodelsJWTRefreshRequest,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: AuthapimodelsJWTResponse;
      }
    >
  >;
  public v1AuthRefreshTokenCreate(
    body: AuthapimodelsJWTRefreshRequest,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/auth/refresh-token`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
  public v1AuthRegisterCreate(body: AuthapimodelsSendEmail, options?: RequestOptions): Observable<void>;
  public v1AuthRegisterCreate(
    body: AuthapimodelsSendEmail,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1AuthRegisterCreate(
    body: AuthapimodelsSendEmail,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/auth/register`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<void>;
  public v1AuthVerifyEmailList(
    query?: {
      /** код подтверждения */
      code?: string;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1AuthVerifyEmailList(
    query?: {
      /** код подтверждения */
      code?: string;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("GET", this.baseUrl + `/api/v1/auth/verify-email`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCityView[];
    }
  >;
  public v1DictCityFindCreate(
    body: DictapimodelsCityData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCityView[];
      }
    >
  >;
  public v1DictCityFindCreate(
    body: DictapimodelsCityData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/city/find`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCityView;
    }
  >;
  public v1DictCityDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCityView;
      }
    >
  >;
  public v1DictCityDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/dict/city/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictCompanyCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictCompanyCreate(
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/company`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView[];
    }
  >;
  public v1DictCompanyFindCreate(
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >
  >;
  public v1DictCompanyFindCreate(
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/company/find`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView;
    }
  >;
  public v1DictCompanyDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >
  >;
  public v1DictCompanyDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/dict/company/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyUpdate(
    id: string,
    body: DictapimodelsCompanyData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyUpdate(
    id: string,
    body: DictapimodelsCompanyData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/dict/company/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Компания
   * @name V1DictCompanyDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/company/{id}
   */
  public v1DictCompanyDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1DictCompanyDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/dict/company/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictCompanyStructCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictCompanyStructCreate(
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/company_struct`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyStructView[];
    }
  >;
  public v1DictCompanyStructFindCreate(
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView[];
      }
    >
  >;
  public v1DictCompanyStructFindCreate(
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/company_struct/find`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyStructView;
    }
  >;
  public v1DictCompanyStructDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyStructView;
      }
    >
  >;
  public v1DictCompanyStructDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/dict/company_struct/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1DictCompanyStructUpdate(
    id: string,
    body: DictapimodelsCompanyStructData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyStructUpdate(
    id: string,
    body: DictapimodelsCompanyStructData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/dict/company_struct/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Структура компании
   * @name V1DictCompanyStructDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/company_struct/{id}
   */
  public v1DictCompanyStructDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1DictCompanyStructDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictCompanyStructDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/dict/company_struct/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictDepartmentCreate(
    body: DictapimodelsDepartmentData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictDepartmentCreate(
    body: DictapimodelsDepartmentData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/department`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsDepartmentView[];
    }
  >;
  public v1DictDepartmentFindCreate(
    body: DictapimodelsDepartmentFind,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView[];
      }
    >
  >;
  public v1DictDepartmentFindCreate(
    body: DictapimodelsDepartmentFind,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/department/find`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsDepartmentView;
    }
  >;
  public v1DictDepartmentDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsDepartmentView;
      }
    >
  >;
  public v1DictDepartmentDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/dict/department/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1DictDepartmentUpdate(
    id: string,
    body: DictapimodelsDepartmentData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictDepartmentUpdate(
    id: string,
    body: DictapimodelsDepartmentData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/dict/department/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Подразделение
   * @name V1DictDepartmentDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/department/{id}
   */
  public v1DictDepartmentDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1DictDepartmentDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictDepartmentDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/dict/department/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1DictJobTitleCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1DictJobTitleCreate(
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/job_title`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView[];
    }
  >;
  public v1DictJobTitleFindCreate(
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView[];
      }
    >
  >;
  public v1DictJobTitleFindCreate(
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/dict/job_title/find`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: DictapimodelsCompanyView;
    }
  >;
  public v1DictJobTitleDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: DictapimodelsCompanyView;
      }
    >
  >;
  public v1DictJobTitleDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/dict/job_title/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1DictJobTitleUpdate(
    id: string,
    body: DictapimodelsJobTitleData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictJobTitleUpdate(
    id: string,
    body: DictapimodelsJobTitleData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/dict/job_title/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Справочник. Штатные должности
   * @name V1DictJobTitleDelete
   * @summary Удаление
   * @request DELETE:/api/v1/dict/job_title/{id}
   */
  public v1DictJobTitleDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1DictJobTitleDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1DictJobTitleDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/dict/job_title/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: GptmodelsGenVacancyDescResponse;
    }
  >;
  public v1GptGenerateVacancyDescriptionCreate(
    body: GptmodelsGenVacancyDescRequest,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: GptmodelsGenVacancyDescResponse;
      }
    >
  >;
  public v1GptGenerateVacancyDescriptionCreate(
    body: GptmodelsGenVacancyDescRequest,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/gpt/generate_vacancy_description`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1OauthCallbackAvitoList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1OauthCallbackAvitoList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/oauth/callback/avito`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1OauthCallbackHhList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1OauthCallbackHhList(
    query: {
      /** space ID */
      state: string;
      /** authorization_code */
      code?: string;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/oauth/callback/hh`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Создание организации
   *
   * @tags Организации
   * @name V1OrganizationsCreate
   * @summary Создание организации
   * @request POST:/api/v1/organizations
   */
  public v1OrganizationsCreate(body: SpaceapimodelsCreateOrganization, options?: RequestOptions): Observable<void>;
  public v1OrganizationsCreate(
    body: SpaceapimodelsCreateOrganization,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsCreate(
    body: SpaceapimodelsCreateOrganization,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/organizations`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<void>;
  public v1OrganizationsRetrieveCreate(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsRetrieveCreate(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/organizations/retrieve`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<void>;
  public v1OrganizationsSuggestList(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1OrganizationsSuggestList(
    query?: {
      /** параметры запроса в дадату */
      query?: string;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("GET", this.baseUrl + `/api/v1/organizations/suggest`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Проверка подключения к Avito
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoCheckConnectedList
   * @summary Проверка подключения к Avito
   * @request GET:/api/v1/space/ext/avito/check_connected
   */
  public v1SpaceExtAvitoCheckConnectedList(options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoCheckConnectedList(
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoCheckConnectedList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/space/ext/avito/check_connected`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Получение ссылки для авторизации
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoConnectUriList
   * @summary Получение ссылки для авторизации
   * @request GET:/api/v1/space/ext/avito/connect_uri
   */
  public v1SpaceExtAvitoConnectUriList(options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoConnectUriList(
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoConnectUriList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/space/ext/avito/connect_uri`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoAttachUpdate(
    id: string,
    body: AvitoapimodelsVacancyAttach,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoAttachUpdate(
    id: string,
    body: AvitoapimodelsVacancyAttach,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/avito/${id}/attach`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление вакансии
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoCloseUpdate
   * @summary Удаление вакансии
   * @request PUT:/api/v1/space/ext/avito/{id}/close
   */
  public v1SpaceExtAvitoCloseUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoCloseUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoCloseUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/avito/${id}/close`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Публикация вакансии
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoPublishUpdate
   * @summary Публикация вакансии
   * @request PUT:/api/v1/space/ext/avito/{id}/publish
   */
  public v1SpaceExtAvitoPublishUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoPublishUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoPublishUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/avito/${id}/publish`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Статус размещения
   *
   * @tags Интеграция Avito
   * @name V1SpaceExtAvitoStatusUpdate
   * @summary Статус размещения
   * @request PUT:/api/v1/space/ext/avito/{id}/status
   */
  public v1SpaceExtAvitoStatusUpdate(
    id: string,
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsExtVacancyInfo;
    }
  >;
  public v1SpaceExtAvitoStatusUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >
  >;
  public v1SpaceExtAvitoStatusUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("PUT", this.baseUrl + `/api/v1/space/ext/avito/${id}/status`, {
      ...(options as unknown as { observe: "response" }),
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
  public v1SpaceExtAvitoUpdateUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtAvitoUpdateUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtAvitoUpdateUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/avito/${id}/update`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Проверка подключения к HH
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhCheckConnectedList
   * @summary Проверка подключения к HH
   * @request GET:/api/v1/space/ext/hh/check_connected
   */
  public v1SpaceExtHhCheckConnectedList(options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtHhCheckConnectedList(
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhCheckConnectedList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/space/ext/hh/check_connected`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Получение ссылки для авторизации
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhConnectUriList
   * @summary Получение ссылки для авторизации
   * @request GET:/api/v1/space/ext/hh/connect_uri
   */
  public v1SpaceExtHhConnectUriList(options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtHhConnectUriList(
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhConnectUriList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("GET", this.baseUrl + `/api/v1/space/ext/hh/connect_uri`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceExtHhAttachUpdate(
    id: string,
    body: HhapimodelsVacancyAttach,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhAttachUpdate(
    id: string,
    body: HhapimodelsVacancyAttach,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/hh/${id}/attach`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление вакансии
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhCloseUpdate
   * @summary Удаление вакансии
   * @request PUT:/api/v1/space/ext/hh/{id}/close
   */
  public v1SpaceExtHhCloseUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtHhCloseUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhCloseUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/hh/${id}/close`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Публикация вакансии
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhPublishUpdate
   * @summary Публикация вакансии
   * @request PUT:/api/v1/space/ext/hh/{id}/publish
   */
  public v1SpaceExtHhPublishUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtHhPublishUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhPublishUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/hh/${id}/publish`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Статус размещения
   *
   * @tags Интеграция HeadHunter
   * @name V1SpaceExtHhStatusUpdate
   * @summary Статус размещения
   * @request PUT:/api/v1/space/ext/hh/{id}/status
   */
  public v1SpaceExtHhStatusUpdate(
    id: string,
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsExtVacancyInfo;
    }
  >;
  public v1SpaceExtHhStatusUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsExtVacancyInfo;
      }
    >
  >;
  public v1SpaceExtHhStatusUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("PUT", this.baseUrl + `/api/v1/space/ext/hh/${id}/status`, {
      ...(options as unknown as { observe: "response" }),
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
  public v1SpaceExtHhUpdateUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceExtHhUpdateUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceExtHhUpdateUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/ext/hh/${id}/update`, {
      ...(options as unknown as { observe: "response" }),
    });
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
  public v1SpaceSettingsListList(options?: RequestOptions & { observe: "response" }): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: SpaceapimodelsSpaceSettingView[];
      }
    >
  >;
  public v1SpaceSettingsListList(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/space/settings/list`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<void>;
  public v1SpaceSettingsUpdate(
    code: string,
    body: SpaceapimodelsUpdateSpaceSettingValue,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1SpaceSettingsUpdate(
    code: string,
    body: SpaceapimodelsUpdateSpaceSettingValue,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("PUT", this.baseUrl + `/api/v1/space/settings/${code}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceVacancyCreate(
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceVacancyCreate(
    body: VacancyapimodelsVacancyData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/space/vacancy`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    body: DbmodelsVacancyFilter,
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyView[];
    }
  >;
  public v1SpaceVacancyListCreate(
    body: DbmodelsVacancyFilter,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView[];
      }
    >
  >;
  public v1SpaceVacancyListCreate(
    body: DbmodelsVacancyFilter,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsVacancyView[];
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView[];
      }
    >("POST", this.baseUrl + `/api/v1/space/vacancy/list`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyView;
    }
  >;
  public v1SpaceVacancyDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyView;
      }
    >
  >;
  public v1SpaceVacancyDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/space/vacancy/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyUpdate(
    id: string,
    body: VacancyapimodelsVacancyData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyUpdate(
    id: string,
    body: VacancyapimodelsVacancyData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Вакансия
   * @name V1SpaceVacancyDelete
   * @summary Удаление
   * @request DELETE:/api/v1/space/vacancy/{id}
   */
  public v1SpaceVacancyDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceVacancyDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/space/vacancy/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyFavoriteUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy/${id}/favorite`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyPinUpdate(
    id: string,
    query?: {
      /** выбрано/не выбрано */
      set?: boolean;
    },
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy/${id}/pin`, {
      params: query,
      ...(options as unknown as { observe: "response" }),
    });
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
    body: VacancyapimodelsVacancyRequestEditData,
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: string;
    }
  >;
  public v1SpaceVacancyRequestCreate(
    body: VacancyapimodelsVacancyRequestEditData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: string;
      }
    >
  >;
  public v1SpaceVacancyRequestCreate(
    body: VacancyapimodelsVacancyRequestEditData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("POST", this.baseUrl + `/api/v1/space/vacancy_request`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
  public v1SpaceVacancyRequestListCreate(options?: RequestOptions): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyRequestView[];
    }
  >;
  public v1SpaceVacancyRequestListCreate(options?: RequestOptions & { observe: "response" }): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      }
    >
  >;
  public v1SpaceVacancyRequestListCreate(
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<
    | HttpResponse<
        ApimodelsResponse & {
          data?: VacancyapimodelsVacancyRequestView[];
        }
      >
    | (ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      })
  > {
    return this.http.request<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView[];
      }
    >("POST", this.baseUrl + `/api/v1/space/vacancy_request/list`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<
    ApimodelsResponse & {
      data?: VacancyapimodelsVacancyRequestView;
    }
  >;
  public v1SpaceVacancyRequestDetail(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<
    HttpResponse<
      ApimodelsResponse & {
        data?: VacancyapimodelsVacancyRequestView;
      }
    >
  >;
  public v1SpaceVacancyRequestDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
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
    >("GET", this.baseUrl + `/api/v1/space/vacancy_request/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestEditData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestEditData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy_request/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удаление
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestDelete
   * @summary Удаление
   * @request DELETE:/api/v1/space/vacancy_request/{id}
   */
  public v1SpaceVacancyRequestDelete(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestDelete(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestDelete(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("DELETE", this.baseUrl + `/api/v1/space/vacancy_request/${id}`, {
      ...(options as unknown as { observe: "response" }),
    });
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestApprovalStagesUpdate(
    id: string,
    body: VacancyapimodelsApprovalStages[],
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestApprovalStagesUpdate(
    id: string,
    body: VacancyapimodelsApprovalStages[],
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      "PUT",
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/approval_stages`,
      {
        body: body,
        ...(options as unknown as { observe: "response" }),
      },
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestApproveUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestApproveUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy_request/${id}/approve`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Отменить заявку
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestCancelUpdate
   * @summary Отменить заявку
   * @request PUT:/api/v1/space/vacancy_request/{id}/cancel
   */
  public v1SpaceVacancyRequestCancelUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestCancelUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestCancelUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy_request/${id}/cancel`, {
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Отправить на согласование
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestOnApprovalUpdate
   * @summary Отправить на согласование
   * @request PUT:/api/v1/space/vacancy_request/{id}/on_approval
   */
  public v1SpaceVacancyRequestOnApprovalUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestOnApprovalUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestOnApprovalUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      "PUT",
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/on_approval`,
      {
        ...(options as unknown as { observe: "response" }),
      },
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
    options?: RequestOptions,
  ): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestRejectUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestRejectUpdate(
    id: string,
    body: VacancyapimodelsVacancyRequestData,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>("PUT", this.baseUrl + `/api/v1/space/vacancy_request/${id}/reject`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description На доработку
   *
   * @tags Заявка
   * @name V1SpaceVacancyRequestToRevisionUpdate
   * @summary На доработку
   * @request PUT:/api/v1/space/vacancy_request/{id}/to_revision
   */
  public v1SpaceVacancyRequestToRevisionUpdate(id: string, options?: RequestOptions): Observable<ApimodelsResponse>;
  public v1SpaceVacancyRequestToRevisionUpdate(
    id: string,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse>>;
  public v1SpaceVacancyRequestToRevisionUpdate(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<ApimodelsResponse> | ApimodelsResponse> {
    return this.http.request<ApimodelsResponse>(
      "PUT",
      this.baseUrl + `/api/v1/space/vacancy_request/${id}/to_revision`,
      {
        ...(options as unknown as { observe: "response" }),
      },
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
  public v1UsersCreate(body: SpaceapimodelsCreateUser, options?: RequestOptions): Observable<void>;
  public v1UsersCreate(
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1UsersCreate(
    body: SpaceapimodelsCreateUser,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/users`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
  public v1UsersListCreate(body: ApimodelsPagination, options?: RequestOptions): Observable<void>;
  public v1UsersListCreate(
    body: ApimodelsPagination,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1UsersListCreate(
    body: ApimodelsPagination,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("POST", this.baseUrl + `/api/v1/users/list`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
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
  public v1UsersDetail(id: string, options?: RequestOptions): Observable<void>;
  public v1UsersDetail(id: string, options?: RequestOptions & { observe: "response" }): Observable<HttpResponse<void>>;
  public v1UsersDetail(
    id: string,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("GET", this.baseUrl + `/api/v1/users/${id}`, {
      ...(options as unknown as { observe: "response" }),
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
  public v1UsersUpdate(id: string, body: SpaceapimodelsUpdateUser, options?: RequestOptions): Observable<void>;
  public v1UsersUpdate(
    id: string,
    body: SpaceapimodelsUpdateUser,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1UsersUpdate(
    id: string,
    body: SpaceapimodelsUpdateUser,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("PUT", this.baseUrl + `/api/v1/users/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
  /**
   * @description Удалить пользователя
   *
   * @tags Пользователи space
   * @name V1UsersDelete
   * @summary Удалить пользователя
   * @request DELETE:/api/v1/users/{id}
   */
  public v1UsersDelete(id: string, body: SpaceapimodelsCreateUser, options?: RequestOptions): Observable<void>;
  public v1UsersDelete(
    id: string,
    body: SpaceapimodelsCreateUser,
    options?: RequestOptions & { observe: "response" },
  ): Observable<HttpResponse<void>>;
  public v1UsersDelete(
    id: string,
    body: SpaceapimodelsCreateUser,
    options: RequestOptions & { observe: "response" } = { observe: "response" },
  ): Observable<HttpResponse<void> | void> {
    return this.http.request<void>("DELETE", this.baseUrl + `/api/v1/users/${id}`, {
      body: body,
      ...(options as unknown as { observe: "response" }),
    });
  }
}
