import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="app-shell">
      <!-- Sidebar -->
      <aside class="app-sidebar">
        <div class="sidebar-header">
          <mat-icon class="logo-icon">terminal</mat-icon>
          <span class="logo-text">AutoAnalyst</span>
        </div>
        
        <mat-divider style="background: rgba(255,255,255,0.1); margin: 10px 0;"></mat-divider>
        
        <nav class="sidebar-nav">
          <button mat-button 
                  routerLink="/user-history-creator" 
                  routerLinkActive="active-link"
                  class="nav-item">
            <mat-icon>description</mat-icon>
            <span>Story Synthesis</span>
          </button>

          <button mat-button 
                  routerLink="/qa-automation" 
                  routerLinkActive="active-link"
                  class="nav-item">
            <mat-icon>auto_fix_high</mat-icon>
            <span>Compliance Automator</span>
          </button>
        </nav>

        <div class="sidebar-footer">
          <span class="version-tag">v2.1.0-AI</span>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="main-layout">
        <mat-toolbar class="top-bar">
          <span class="breadcrumb">System / {{ getActiveRoute() }}</span>
          <div class="spacer"></div>
          <div class="user-badge">
            <span class="status-dot"></span>
            Local Environment
          </div>
        </mat-toolbar>

        <main class="content-area">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }

    .app-shell {
      display: flex;
      height: 100vh;
      width: 100vw;
      background: #f1f5f9;
    }

    /* Sidebar Styles */
    .app-sidebar {
      width: 260px;
      background: #0f172a; /* Dark sleek blue-black */
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
      z-index: 100;
    }

    .sidebar-header {
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-icon {
      color: #38bdf8; /* Bright blue accent */
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.5px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .nav-item {
      width: 100% !important;
      justify-content: flex-start !important;
      text-align: left !important;
      padding: 24px 16px !important;
      border-radius: 8px !important;
      color: #94a3b8 !important;
      transition: all 0.2s ease;
    }

    .nav-item mat-icon {
      margin-right: 12px;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.05) !important;
      color: white !important;
    }

    .active-link {
      background: #38bdf8 !important; /* Material Sky Blue */
      color: #0f172a !important; /* Dark text for contrast */
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
    }

    .sidebar-footer {
      padding: 20px;
      text-align: center;
      opacity: 0.5;
    }

    .version-tag {
      font-size: 0.7rem;
      font-family: monospace;
    }

    /* Main Layout Styles */
    .main-layout {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-bar {
      background: white !important;
      color: #1e293b !important;
      border-bottom: 1px solid #e2e8f0;
      height: 64px;
      display: flex;
      padding: 0 24px !important;
    }

    .breadcrumb {
      font-size: 0.9rem;
      color: #64748b;
      font-weight: 500;
    }

    .spacer {
      flex: 1;
    }

    .user-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      color: #64748b;
      background: #f8fafc;
      padding: 6px 12px;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .content-area {
      flex: 1;
      padding: 32px;
      overflow-y: auto;
      scroll-behavior: smooth;
    }
  `]
})
export class AppComponent {
  getActiveRoute(): string {
    // Basic route label detection
    if (window.location.pathname.includes('qa-automation')) return 'Compliance Automator';
    if (window.location.pathname.includes('user-history')) return 'Story Synthesis';
    return 'Dashboard';
  }
}
