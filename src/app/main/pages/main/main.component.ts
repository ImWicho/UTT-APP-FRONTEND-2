import { Component, OnInit, ViewChild } from '@angular/core';
import { SidenavService } from '@services/sidenav.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/init.reducer';
import { UserService } from 'app/main/services/user.service';
import { saveUser } from 'app/main/store/userStore/actions';
import { isLoading, stopLoading } from '@redux/app.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DataService } from 'app/auth/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('matDrawer') drawer!: MatDrawer;
  public isSmall = false;

  constructor(private sidenavService: SidenavService,
              private store: Store<AppState>,
              private userService: UserService,
              private dataService: DataService){}

  ngOnInit(): void{
    // this.store.select('ui').subscribe((data) => this.isSmall = data.isResponsive);
    // this.sidenavService.toggle$.subscribe(() => this.drawer.toggle());
    // this.store.dispatch( isLoading());
    // this.userService.onGetUser().subscribe((data) => {
    //   this.store.dispatch( saveUser({ user: data }) );
    //   this.store.dispatch( stopLoading());
    //   this.dataService.onSaveCookie('views', JSON.stringify(data.area.views.map((x: any) => x.path)));
    // }, (error: HttpErrorResponse) => {
    //   this.store.dispatch( stopLoading());
    // });
  }

}
