import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApiService } from '../../lib/dashboard/api';
import { User, Transaction } from '../../lib/dashboard/types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  transactions: Transaction[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private dashboardApi: DashboardApiService) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadTransactionHistory();
  }

  private loadUserProfile() {
    this.loading = true;
    this.error = null;

    this.dashboardApi.getUserProfile().subscribe({
      next: (response) => {
        this.user = response.data.user;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user profile';
        this.loading = false;
        console.error('Error loading user profile:', err);
      }
    });
  }

  private loadTransactionHistory() {
    this.dashboardApi.getTransactionHistory().subscribe({
      next: (response) => {
        this.transactions = response.data.transactions;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load transaction history';
        this.loading = false;
        console.error('Error loading transaction history:', err);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'pending_payment':
        return 'status-pending';
      case 'failed':
        return 'status-failed';
      default:
        return '';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}





