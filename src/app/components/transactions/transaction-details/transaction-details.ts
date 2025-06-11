import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardApiService } from '../../../lib/dashboard/api';
import { Transaction } from '../../../lib/dashboard/types';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-details.html',
  styleUrls: ['./transaction-details.scss']
})
export class TransactionDetailsComponent implements OnInit {
  transaction: Transaction | null = null;
  loading = true;
  error: string | null = null;
  uploading = false;
  uploadError: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardApi: DashboardApiService
  ) {}

  ngOnInit() {
    const transactionId = this.route.snapshot.paramMap.get('id');
    if (transactionId) {
      this.loadTransactionDetails(transactionId);
    } else {
      this.error = 'Transaction ID not found';
      this.loading = false;
    }
  }

  loadTransactionDetails(transactionId: string) {
    this.loading = true;
    this.error = null;

    this.dashboardApi.getTransactionDetails(transactionId).subscribe({
      next: (response) => {
        console.log('Transaction details loaded:', response);
        this.transaction = response.data.transaction;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading transaction details:', err);
        this.error = 'Failed to load transaction details. Please try again.';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile);
      this.uploadError = null;
    }
  }

  uploadPaymentProof() {
    if (!this.selectedFile || !this.transaction) {
      console.error('No file selected or no transaction');
      this.uploadError = 'Please select a file to upload';
      return;
    }

    console.log('Starting upload for transaction:', this.transaction._id);
    this.uploading = true;
    this.uploadError = null;

    this.dashboardApi.uploadPaymentProof(this.transaction._id, this.selectedFile).subscribe({
      next: (response) => {
        console.log('Upload successful:', response);
        this.transaction = response.data.transaction;
        this.uploading = false;
        this.selectedFile = null;
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      error: (err) => {
        console.error('Upload failed:', err);
        this.uploadError = 'Failed to upload payment proof. Please try again.';
        this.uploading = false;
      }
    });
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

  goBack() {
    this.router.navigate(['/dashboard/transactions']);
  }
}