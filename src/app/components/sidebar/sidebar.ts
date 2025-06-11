import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <h2>Crypto Trader</h2>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li>
            <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <i class="fas fa-chart-line"></i>
              Dashboard
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/market" routerLinkActive="active">
              <i class="fas fa-globe"></i>
              Market
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/trade" routerLinkActive="active">
              <i class="fas fa-exchange-alt"></i>
              Trade
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/transactions" routerLinkActive="active">
              <i class="fas fa-history"></i>
              Transactions
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/portfolio" routerLinkActive="active">
              <i class="fas fa-wallet"></i>
              Portfolio
            </a>
          </li>
          <li>
            <a routerLink="/dashboard/settings" routerLinkActive="active">
              <i class="fas fa-cog"></i>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 250px;
      height: 100vh;
      background: #1a1a1a;
      color: #ffffff;
      padding: 1rem;
      position: fixed;
      left: 0;
      top: 0;
    }

    .sidebar-header {
      padding: 1rem 0;
      border-bottom: 1px solid #333;
      margin-bottom: 1rem;

      h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #5A31AA;
      }
    }

    .sidebar-nav {
      ul {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
          margin-bottom: 0.5rem;

          a {
            display: flex;
            align-items: center;
            padding: 0.75rem 1rem;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            transition: all 0.3s ease;

            i {
              margin-right: 0.75rem;
              width: 20px;
              text-align: center;
            }

            &:hover {
              background: #2a2a2a;
            }

            &.active {
              background: #5A31AA;
              color: #ffffff;
            }
          }
        }
      }
    }
  `]
})
export class SidebarComponent {} 