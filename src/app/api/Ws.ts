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


import { HttpClient,HttpResponse } from "@angular/common/http";
import { Inject,Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { RequestOptions } from "./http-client";

    import { WsmodelsServerMessage } from "./data-contracts";
        
import { API_BASE_URL } from "../tokens/api.token";

@Injectable({providedIn: 'root'})
export class WsService {
constructor(private readonly http: HttpClient, @Inject(API_BASE_URL) private readonly baseUrl: string = ''){}
            /**
 * @description Системные пуши
 *
 * @tags Websocket Системные пуши
 * @name GetWs
 * @summary Системные пуши
 * @request GET:/ws
 */
public getWs (options?: RequestOptions): Observable<WsmodelsServerMessage>;
public getWs (options?: RequestOptions & { observe: 'response' }): Observable<HttpResponse<WsmodelsServerMessage>>;
public getWs (options: RequestOptions & { observe: 'response' } = {observe: 'response'}): Observable<HttpResponse<WsmodelsServerMessage> | WsmodelsServerMessage> {
    return this.http.request<WsmodelsServerMessage>(
        'GET',
        this.baseUrl + `/ws`,
        {
                                ...options as unknown as {observe: "response"},
    })
}
    }