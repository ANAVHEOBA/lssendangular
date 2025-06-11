import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './features-section.html',
  styleUrl: './features-section.scss'
})
export class FeaturesSectionComponent {
  features: Feature[] = [
    {
      icon: 'security',
      title: 'Secure Wallet',
      description: 'Your funds are protected with industry-leading security and custody solutions.'
    },
    {
      icon: 'show_chart',
      title: 'Advanced Trading Tools',
      description: 'Access powerful charting, real-time order books, and analysis tools to inform your trades.'
    },
    {
      icon: 'payments',
      title: 'Competitive Fees',
      description: 'Our transparent and low fee structure means you keep more of your profits.'
    },
    {
      icon: 'support_agent',
      title: '24/7 Customer Support',
      description: 'Our dedicated support team is always available to help you with any issues.'
    }
  ];
}
