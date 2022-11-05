import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <div>
        <button (click)="navigate('/')" mat-icon-button aria-label="App icon">
          <mat-icon>access_time</mat-icon>
        </button>
        <span>timed-based-otp</span>
      </div>
      <div>
        <button
          (click)="navigate('accounts')"
          mat-icon-button
          aria-label="All accounts"
          matTooltip="Accounts"
          matTooltipShowDelay="500"
        >
          <mat-icon>supervisor_accounts</mat-icon>
        </button>
        <button
          (click)="navigate('export')"
          mat-icon-button
          aria-label="Export accounts"
          matTooltip="Export accounts"
          matTooltipShowDelay="500"
        >
          <mat-icon>download</mat-icon>
        </button>
        <button
          (click)="navigate('import')"
          mat-icon-button
          aria-label="Import accounts"
          matTooltip="Import accounts"
          matTooltipShowDelay="500"
        >
          <mat-icon>upload</mat-icon>
        </button>
        <button
          (click)="openGithub()"
          mat-icon-button
          aria-label="Open Github"
          matTooltip="Open Github (source code)"
          matTooltipShowDelay="500"
        >
          <mat-icon class="github" svgIcon="github"></mat-icon>
        </button>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      mat-toolbar {
        display: flex;
        justify-content: space-between;
      }
      .github {
        color: #cfd8dc;
      }
    `
  ]
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  openGithub(): void {
    window.open('https://github.com/larscom/timed-based-otp', '_blank');
  }
}
