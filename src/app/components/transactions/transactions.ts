import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApiService } from '../../lib/dashboard/api';
import { TransactionHistoryResponse, Transaction } from '../../lib/dashboard/types';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  loading = true;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.error = null;

    this.dashboardApi.getTransactionHistory(this.currentPage, this.itemsPerPage)
      .subscribe({
        next: (response: TransactionHistoryResponse) => {
          this.transactions = response.data.transactions;
          this.totalPages = response.data.pagination.pages;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load transactions. Please try again.';
          this.loading = false;
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadTransactions();
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'pending_payment':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-default';
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 