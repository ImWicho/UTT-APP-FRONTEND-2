import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from 'app/main/interfaces/i-user';
import { AppStateWithUser } from 'app/main/store/userStore/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  user!: IUser | null;
  sub!: Subscription;
  constructor(private store: Store<AppStateWithUser>) { }

  ngOnInit(): void {
    this.sub = this.store.select('user').subscribe((data) => this.user = data.user);
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

}
