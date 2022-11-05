import { AccountService } from '@accounts/services/account.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  readonly search = new FormControl('');
  readonly accounts$ = this.search.valueChanges.pipe(
    startWith(this.search.value),
    debounceTime(150),
    distinctUntilChanged(),
    switchMap((query) => this.accountService.search(query!))
  );

  constructor(private readonly accountService: AccountService) {}
}
