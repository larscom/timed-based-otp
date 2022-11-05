import { ClipboardModule } from '@angular/cdk/clipboard';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QrcodeSvgModule } from '@larscom/ng-qrcode-svg';
import { BadgeModule } from '@shared/badge/badge.module';
import { MaterialModule } from '@shared/material/material.module';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountTimerComponent } from './account-card/account-timer/account-timer.component';
import { AccountTokenComponent } from './account-card/account-token/account-token.component';
import { TokenCopyComponent } from './account-card/token-copy/token-copy.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountQrComponent } from './account-detail/account-qr/account-qr.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountService } from './services/account.service';
import { TimerService } from './services/timer.service';
import { TotpService } from './services/totp.service';

@NgModule({
  declarations: [
    AccountListComponent,
    AccountCardComponent,
    AccountDetailComponent,
    AccountTimerComponent,
    AccountTokenComponent,
    TokenCopyComponent,
    AccountQrComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MaterialModule,
    ScrollingModule,
    BadgeModule,
    ClipboardModule,
    QrcodeSvgModule,
    ReactiveFormsModule
  ],
  providers: [TimerService, TotpService, AccountService]
})
export class AccountsModule {}
