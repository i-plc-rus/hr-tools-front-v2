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

import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";
export type RequestOptions = {
  body?: any;
  headers?: HttpHeaders | { [header: string]: string | string[] };
  context?: HttpContext;
  reportProgress?: boolean;
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
  responseType?: "blob" | "text" | "arraybuffer" | "json";
};
