import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IconService } from './shared/services/icon.service';
import { isResponsive } from '@redux/app.actions';
import { AppState } from '@redux/init.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading = false;
  constructor(private iconSvc: IconService,
              private breakpointObserver: BreakpointObserver,
              private store: Store<AppState>,
              private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.breakpointObserver.observe([
      Breakpoints.Small,
      Breakpoints.XSmall
    ]).subscribe((data: any) => {
      this.store.dispatch( isResponsive({ flag: data.matches }));
    });
    this.store.select('ui').subscribe((ui) =>{
      this.isLoading = ui.isLoading;
      this.cd.detectChanges();
    });

  }
}
