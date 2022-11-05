import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent {
  account$ = this.activatedRoute.params.pipe(
    switchMap(({ id }) => this.accountService.getById(id)),
    tap((account) => !account && this.router.navigate(['accounts']))
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly accountService: AccountService,
    private readonly router: Router
  ) {}
}
