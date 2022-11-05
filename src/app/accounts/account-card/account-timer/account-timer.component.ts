import { TimerService } from '@accounts/services/timer.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-account-timer',
  template: '<mat-progress-bar mode="determinate" [ngClass]="progressClass$ | async" [value]="progress$ | async"></mat-progress-bar>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountTimerComponent implements OnInit {
  @Input() period: number = 30;

  progress$!: Observable<number>;
  progressClass$!: Observable<string>;

  constructor(private readonly timerService: TimerService) {}

  ngOnInit(): void {
    const { period } = this;

    this.progress$ = this.timerService.getTimer(period).pipe(map((timer) => (timer / period) * 100));
    this.progressClass$ = this.timerService.getTimerLevel(period).pipe(map((level) => `${level}-progress-bar`));
  }
}
