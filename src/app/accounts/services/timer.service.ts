import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

const calculateSeconds = (period: number) => period - (Math.round(Date.now() / 1000) % period);
const getLevel = (count: number) => (count <= 5 ? 'low' : count <= 10 ? 'medium' : 'high');

@Injectable()
export class TimerService implements OnDestroy {
  private timers: Record<number, Observable<number>> = {};
  private intervals: NodeJS.Timer[] = [];

  ngOnDestroy(): void {
    this.intervals.forEach((i) => clearInterval(i));
  }

  /**
   * @returns time left (in seconds) for given period
   */
  getTimer(period: number): Observable<number> {
    if (this.timers[period]) {
      return this.timers[period];
    }

    const subject = new BehaviorSubject(calculateSeconds(period));
    this.timers[period] = subject.asObservable();

    this.intervals.push(setInterval(() => subject.next(calculateSeconds(period)), 1000));

    return this.timers[period];
  }

  /**
   * @returns timer level for given period
   * @example
   * if (timeleft <= 5) low
   * if (timeleft <= 10) medium
   * else high
   */
  getTimerLevel(period: number): Observable<'low' | 'medium' | 'high'> {
    return this.getTimer(period).pipe(map((count) => getLevel(count)));
  }
}
