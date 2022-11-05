import { IAccount } from '@accounts/models/account';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountCardComponent {
  @Input() account!: IAccount;
  @Input() disableNavigation: boolean = false;
}
