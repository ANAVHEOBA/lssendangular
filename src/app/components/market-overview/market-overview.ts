import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CryptoApiService } from '../../lib/crypto/api';
import { TopCrypto } from '../../lib/crypto/types';

@Component({
  selector: 'app-market-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './market-overview.html',
  styleUrl: './market-overview.scss'
})
export class MarketOverviewComponent implements OnInit, OnDestroy {
  topCryptos: TopCrypto[] = [];
  loading = true;
  error: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private cryptoService: CryptoApiService) {}

  ngOnInit(): void {
    this.loadTopCryptos();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadTopCryptos(): void {
    this.subscription = this.cryptoService.getTopCryptos().subscribe({
      next: (response) => {
        this.topCryptos = response.data.cryptos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load market data.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}

