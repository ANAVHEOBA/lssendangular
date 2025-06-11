import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardApiService } from '../../lib/dashboard/api';
import { BuyTransactionResponse } from '../../lib/dashboard/types';

@Component({
  selector: 'app-trade',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './trade.html',
  styleUrl: './trade.scss'
})
export class TradeComponent {
  buyForm: FormGroup;
  loading: boolean = false;
  error: string | null = null;
  transactionResponse: BuyTransactionResponse | null = null;

  constructor(
    private fb: FormBuilder,
    private dashboardApi: DashboardApiService
  ) {
    this.buyForm = this.fb.group({
      liskAmount: ['', [Validators.required, Validators.min(0.01)]],
      liskAddress: ['', [Validators.required, Validators.pattern(/^lsk[a-zA-Z0-9]{38}$/)]]
    });
  }

  onSubmit() {
    if (this.buyForm.valid) {
      this.loading = true;
      this.error = null;

      this.dashboardApi.buyLisk(this.buyForm.value).subscribe({
        next: (response) => {
          this.transactionResponse = response;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to process transaction';
          this.loading = false;
        }
      });
    }
  }
}