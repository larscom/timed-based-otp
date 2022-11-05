import { IAccount } from '@accounts/models/account';
import { Injectable } from '@angular/core';
import { TOTP } from 'otpauth';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TimerService } from './timer.service';

@Injectable()
export class TotpService {
  constructor(private readonly timerService: TimerService) {}

  /**
   * @returns generated TOTP token for account
   */
  getToken({ issuer, label, algorithm, digits, period, secret }: IAccount): Observable<string> {
    return this.timerService.getTimer(period).pipe(
      map(() => new TOTP({ issuer, label, algorithm, digits, period, secret }).generate()),
      distinctUntilChanged()
    );
  }

  /**
   * @returns a Google Authenticator key URI.
   */
  getURI({ issuer, label, algorithm, digits, period, secret }: IAccount): string {
    return new TOTP({ issuer, label, algorithm, digits, period, secret }).toString();
  }
}
