import { IAccount } from '@accounts/models/account';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, map, Observable, Subject, takeUntil } from 'rxjs';

const defaultAccounts: IAccount[] = [
  {
    uuid: '5ed2495a-2886-4f1a-82de-86660abe313b',
    label: 'test@mytestemail.com',
    issuer: 'Amazon',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'ab170a0d-b993-49e4-b5ba-a95465253c3b',
    label: 'test@mytestemail.com',
    issuer: 'Amazon',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '794a11d2-fa50-4af6-8bb5-217b04e842ae',
    label: 'test@mytestemail.com',
    issuer: 'Binance',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '8a88414f-25b0-41b6-aa28-5f4da0038ebd',
    label: 'test@mytestemail.com',
    issuer: 'Binance',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '0d322005-bc2d-413a-8e8c-25eafdb5afc1',
    label: 'test@mytestemail.com',
    issuer: 'Bitstamp',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '38a542b5-5fb1-4710-9c2d-d7ff70292d11',
    label: 'test@mytestemail.com',
    issuer: 'Bittrex',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '8ff357ab-3071-46c0-b097-81890cb26129',
    label: 'test@mytestemail.com',
    issuer: 'Bitwarden',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '7bf98a55-d59a-4a69-bd9d-7aa2356d55d9',
    label: 'test@mytestemail.com',
    issuer: 'Coin Exchange',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'a1f23261-32e3-41f7-ad7b-6f7daf044089',
    label: 'test@mytestemail.com',
    issuer: 'Coinbase',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '2889e006-aa8b-4cc5-b6cf-c2e5cee8dc92',
    label: 'test@mytestemail.com',
    issuer: 'De GIRO',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'c8d44e5d-f139-4347-873f-286753be9d73',
    label: 'test@mytestemail.com',
    issuer: 'Digital Ocean',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '6d7c8b72-5151-4116-a066-97f1f37bc1e0',
    label: 'test@mytestemail.com',
    issuer: 'Firefox',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '2d6c9922-0421-410b-902b-a4589bb08480',
    label: 'test@mytestemail.com',
    issuer: 'Github',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'fb80fccf-b369-4541-944f-2dc3d06df2ca',
    label: 'test@mytestemail.com',
    issuer: 'Google',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'f71bfe78-1f10-454c-b8af-777805a24a7f',
    label: 'test@mytestemail.com',
    issuer: 'KuCoin',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '064d5ee5-9dfb-412a-abc0-00eb3eab2e25',
    label: 'test@mytestemail.com',
    issuer: 'Last Pass',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '91f80c0e-b5b8-47de-bfa2-a99c959d8ed8',
    label: 'test@mytestemail.com',
    issuer: 'Linode',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '18186d47-b270-4616-8d4c-c12ad3a6fc1a',
    label: 'test@mytestemail.com',
    issuer: 'LiteBit',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: '1a78445e-b6b3-4bf1-8637-fc29e8ef9e45',
    label: 'test@mytestemail.com',
    issuer: 'Microsoft',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  },
  {
    uuid: 'f4b4b8fd-be4a-4f28-8cd1-4f5349061b8b',
    label: 'test@mytestemail.com',
    issuer: 'NPM',
    secret: 'AAAAAAAAAAAAAAAA',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    tags: []
  }
];

@Injectable()
export class AccountService implements OnDestroy {
  private readonly destroy = new Subject<void>();
  private readonly accounts = new BehaviorSubject<IAccount[]>(
    Storage !== void 0
      ? JSON.parse(localStorage.getItem('accounts') ?? JSON.stringify(defaultAccounts))
      : defaultAccounts
  );
  private readonly accounts$ = this.accounts.asObservable();

  constructor() {
    this.syncToStorage();
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  /**
   * @returns all accounts (initialy loaded from localStorage)
   */
  getAll(): Observable<IAccount[]> {
    const sortByIssuer = (accounts: IAccount[]) => accounts.sort((a, b) => a.issuer.localeCompare(b.issuer));
    return this.accounts$.pipe(
      takeUntil(this.destroy),
      map((accounts) => sortByIssuer(accounts))
    );
  }

  /**
   * @returns all accounts filtered by 'issuer' and 'label' for the given query
   */
  search(query: string): Observable<IAccount[]> {
    const filterBy = (value: string) => value.toLocaleLowerCase().includes(query.toLocaleLowerCase());

    return this.getAll().pipe(
      map((accounts) =>
        accounts.filter(({ issuer, label, tags }) => filterBy(issuer) || filterBy(label) || tags.includes(query))
      )
    );
  }

  /**
   * @returns account by given uuid
   */
  getById(id: IAccount['uuid']): Observable<IAccount | undefined> {
    return this.getAll().pipe(map((accounts) => accounts.find(({ uuid }) => uuid === id)));
  }

  private syncToStorage(): void {
    this.getAll()
      .pipe(filter(() => Storage !== void 0))
      .subscribe((accounts) => localStorage.setItem('accounts', JSON.stringify(accounts)));
  }
}
