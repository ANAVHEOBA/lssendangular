import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoApiService } from '../../lib/crypto/api';
import { CryptoPrice } from '../../lib/crypto/types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  cryptoData: CryptoPrice | null = null;
  loading = true;
  error: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private cryptoService: CryptoApiService, private router: Router) {}

  ngOnInit() {
    this.loadCryptoData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadCryptoData() {
    this.subscription = this.cryptoService.getCurrentPrice().subscribe({
      next: (response) => {
        if (response && response.data && response.data.prices) {
          this.cryptoData = response.data.prices;
          this.loading = false;
          this.error = null;
        } else {
          this.error = 'Invalid data format received';
          this.loading = false;
        }
      },
      error: (err) => {
        this.error = 'Failed to load crypto data';
        this.loading = false;
      }
    });
  }

  startTrading() {
    this.router.navigate(['/register']);
  }
}

 
