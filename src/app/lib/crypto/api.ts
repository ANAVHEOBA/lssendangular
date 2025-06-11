import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay, switchMap, catchError, retry } from 'rxjs/operators';
import { PriceResponse, HistoryResponse, TopCryptosResponse } from './types';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoApiService {
  private baseUrl = environment.apiUrl;
  private cacheTimeout = 30000; // 30 seconds cache
  private priceCache$: Observable<PriceResponse>;
  private historyCache$: Observable<HistoryResponse>;
  private topCryptosCache$: Observable<TopCryptosResponse>;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    this.priceCache$ = this.createCache(() => this.fetchPrice());
    this.historyCache$ = this.createCache(() => this.fetchHistory());
    this.topCryptosCache$ = this.createCache(() => this.fetchTopCryptos());
  }

  private createCache<T>(fetchFn: () => Observable<T>): Observable<T> {
    const source$ = this.isBrowser
      ? timer(0, this.cacheTimeout).pipe(switchMap(fetchFn))
      : fetchFn();

    return source$.pipe(
      retry(3),
      shareReplay(1),
      catchError(error => {
        console.error('API cache error:', error);
        throw error;
      })
    );
  }

  private fetchPrice(): Observable<PriceResponse> {
    return this.http.get<PriceResponse>(`${this.baseUrl}/api/crypto/price`);
  }

  private fetchHistory(): Observable<HistoryResponse> {
    return this.http.get<HistoryResponse>(`${this.baseUrl}/api/crypto/history`);
  }

  private fetchTopCryptos(): Observable<TopCryptosResponse> {
    return this.http.get<TopCryptosResponse>(`${this.baseUrl}/api/crypto/top`);
  }

  getCurrentPrice(): Observable<PriceResponse> {
    return this.priceCache$;
  }

  getPriceHistory(): Observable<HistoryResponse> {
    return this.historyCache$;
  }

  getTopCryptos(): Observable<TopCryptosResponse> {
    return this.topCryptosCache$;
  }
}
