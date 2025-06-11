import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero';
import { FeaturesSectionComponent } from '../features-section/features-section';
import { MarketOverviewComponent } from '../market-overview/market-overview';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, FeaturesSectionComponent, MarketOverviewComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {

}


