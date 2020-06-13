import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LocalStoreManager } from './local-store-manager.service';
import { stringify } from 'querystring';
@Injectable({
    providedIn: 'root'
})

export class EndpointFactory {
    baseUrl = 'http://localhost:8080/';
    constructor(private httpclient: HttpClient, private localStoreManager: LocalStoreManager) {

    }
    protected getRequestHeaders(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.localStoreManager.getToken()
            })
        };
    }

    public getEndPointByHeader<T>(endpointUrl): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.localStoreManager.getToken()
            })
        };
        return this.httpclient.get<T>(this.baseUrl + endpointUrl, httpOptions).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.getEndPointByHeader(endpointUrl));
            })
        );
    }

    public getEndPointWithResponeHeader(endpointUrl): Observable<any> {
        return this.httpclient.get<any>(this.baseUrl + endpointUrl, { observe: 'response' }).pipe<any>(
            catchError((error) => {
                return this.handleError(error, () => this.getEndPointWithResponeHeader(endpointUrl));
            })
        );
    }

    public getEndPoint<T>(endpointUrl): Observable<any> {
        return this.httpclient.get<T>(this.baseUrl + endpointUrl).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.getEndPoint(endpointUrl));
            })
        );
    }
    public getEndPointByParam<T>(endpointUrl, params: any): Observable<any> {
        const url: string = this.baseUrl + endpointUrl;
        return this.httpclient.post<T>(url, params).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.getEndPointByParam(params, endpointUrl));
            })
        );
    }

    public postByHeader<T>(params: any, suburl: string): Observable<any> {
        const url: string = this.baseUrl + suburl;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.localStoreManager.getToken()
            })
        };
        return this.httpclient.post<T>(url, params, httpOptions).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.postByHeader(params, suburl));
            })
        );
    }

    public putByHeader<T>(params: any, suburl: string): Observable<any> {
        const url: string = this.baseUrl + suburl;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': this.localStoreManager.getToken()
            })
        };
        return this.httpclient.put<T>(url, params, httpOptions).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.putByHeader(params, suburl));
            })
        );
    }
    public postEndPoint<T>(params: any, suburl: string): Observable<any> {
        return this.httpclient.post<T>(this.baseUrl + suburl, params).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.postEndPoint(params, suburl));
            })
        );
    }
    public putEndPoint<T>(params: any, suburl: string): Observable<any> {
        return this.httpclient.put<T>(this.baseUrl + suburl, params).pipe<T>(
            catchError((error) => {
                return this.handleError(error, () => this.putEndPoint(params, suburl));
            })
        );
    }
    public deleteEndPoint<T>(params: any, suburl: string): Observable<any> {
        return this.httpclient.delete<T>(this.baseUrl + suburl, params);
    }
    protected handleError(error, continuation: () => Observable<any>) {
        if (error.status === 401) {

        }
        return throwError(error);
    }
}
