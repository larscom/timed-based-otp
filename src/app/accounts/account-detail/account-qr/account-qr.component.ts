import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IAccount } from '@app/accounts/models/account';
import { TotpService } from '@app/accounts/services/totp.service';

@Component({
  selector: 'app-account-qr',
  template: `<qrcode-svg (click)="toggle()" [style.opacity]="visible ? 1 : 0.1" [value]="uri"></qrcode-svg>`,
  host: { class: 'flex justify-center' },
  styles: ['qrcode-svg { cursor: pointer; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountQrComponent implements OnInit {
  @Input() account!: IAccount;

  visible: boolean = false;
  uri!: string;

  constructor(private readonly totpService: TotpService) {}

  ngOnInit(): void {
    this.uri = this.totpService.getURI(this.account);
  }

  toggle(): void {
    this.visible = !this.visible;
  }
}
