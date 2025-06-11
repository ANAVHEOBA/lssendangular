import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { 
  UserProfileResponse, 
  DashboardResponse, 
  BuyTransactionResponse,
  BuyTransactionRequest,
  TransactionHistoryResponse,
  TransactionDetailsResponse,
  PaymentProofUploadResponse
} from './types';

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {
  private apiUrl = environment.apiUrl;
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private getHeaders(): HttpHeaders {
    let token: string | null = null;
    if (this.isBrowser) {
      token = localStorage.getItem('token');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUserProfile(): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${this.apiUrl}/api/users/profile`, {
      headers: this.getHeaders()
    });
  }

  getDashboardData(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.apiUrl}/api/dashboard`, {
      headers: this.getHeaders()
    });
  }

  // Additional methods for dashboard functionality
  getPortfolioValue(): Observable<{ status: string; data: { value: number } }> {
    return this.http.get<{ status: string; data: { value: number } }>(
      `${this.apiUrl}/api/dashboard/portfolio/value`,
      { headers: this.getHeaders() }
    );
  }

  getRecentTrades(): Observable<{ status: string; data: { trades: any[] } }> {
    return this.http.get<{ status: string; data: { trades: any[] } }>(
      `${this.apiUrl}/api/dashboard/trades/recent`,
      { headers: this.getHeaders() }
    );
  }

  getActiveTrades(): Observable<{ status: string; data: { trades: any[] } }> {
    return this.http.get<{ status: string; data: { trades: any[] } }>(
      `${this.apiUrl}/api/dashboard/trades/active`,
      { headers: this.getHeaders() }
    );
  }

  // Transaction methods
  buyLisk(request: BuyTransactionRequest): Observable<BuyTransactionResponse> {
    return this.http.post<BuyTransactionResponse>(
      `${this.apiUrl}/api/transactions/buy`,
      request,
      { headers: this.getHeaders() }
    );
  }

  getTransactionHistory(page: number = 1, limit: number = 10): Observable<TransactionHistoryResponse> {
    return this.http.get<TransactionHistoryResponse>(
      `${this.apiUrl}/api/transactions/my-transactions?page=${page}&limit=${limit}`,
      { headers: this.getHeaders() }
    );
  }

  getTransactionDetails(transactionId: string): Observable<TransactionDetailsResponse> {
    return this.http.get<TransactionDetailsResponse>(
      `${this.apiUrl}/api/transactions/${transactionId}`,
      { headers: this.getHeaders() }
    );
  }

  uploadPaymentProof(transactionId: string, file: File): Observable<PaymentProofUploadResponse> {
    const formData = new FormData();
    formData.append('paymentProof', file);

    return this.http.post<PaymentProofUploadResponse>(
      `${this.apiUrl}/api/transactions/${transactionId}/payment-proof`,
      formData,
      { headers: this.getHeaders() }
    );
  }
} 