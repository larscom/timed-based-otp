import { IAccount } from '@accounts/models/account';
import { TotpService } from '@accounts/services/totp.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-token',
  template: '{{ token$ | async }}',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountTokenComponent implements OnInit {
  @Input() account!: IAccount;

  token$!: Observable<string>;

  constructor(private readonly totpService: TotpService) {}

  ngOnInit(): void {
    const { account } = this;
    this.token$ = this.totpService.getToken(account);
  }
}
