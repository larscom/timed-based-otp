import { IAccount } from '@accounts/models/account';
import { TimerService } from '@accounts/services/timer.service';
import { TotpService } from '@accounts/services/totp.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '@app/services/notification.service';
import { firstValueFrom, map, Observable } from 'rxjs';

@Component({
  selector: 'app-token-copy',
  template: `
    <button
      [matTooltip]="(tooltip$ | async)!"
      matTooltipShowDelay="500"
      matTooltipPosition="right"
      (click)="$event.stopPropagation()"
      mat-icon-button
      [cdkCopyToClipboard]="(token$ | async)!"
      (cdkCopyToClipboardCopied)="onCopy($event)"
    >
      <mat-icon [ngClass]="className$ | async">content_copy</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenCopyComponent implements OnInit {
  @Input() account!: IAccount;

  token$!: Observable<string>;
  className$!: Observable<string>;
  tooltip$!: Observable<string>;

  constructor(
    private readonly totpService: TotpService,
    private readonly timerService: TimerService,
    private readonly notificationService: NotificationService
  ) {}

  async onCopy(success: boolean) {
    if (success) {
      const token = await firstValueFrom(this.token$);
      this.notificationService.notifiy(`Copied ${token} to clipboard`);
    }
  }

  ngOnInit(): void {
    const { account } = this;
    this.token$ = this.totpService.getToken(account);
    this.tooltip$ = this.token$.pipe(map((token) => `Copy ${token}`));

    this.className$ = this.timerService
      .getTimerLevel(account.period)
      .pipe(map((level) => (level === 'low' ? 'error-text' : level === 'medium' ? 'warning-text' : 'success-text')));
  }
}
