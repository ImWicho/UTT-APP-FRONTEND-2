import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { SidenavService } from '@services/sidenav.service';
import { ToastService } from '@services/toast.service';
import { AuthService } from 'app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() isSmall: boolean | undefined;
  isDarkMode!: boolean;
  constructor(private sideNavService: SidenavService,
              private authService: AuthService,
              private toastService: ToastService,
              private router: Router) {}

  ngOnInit(): void {
  }

  toogleSideNav(): void{
    this.sideNavService.toggle$.next();
  }

  onLogOut(): void{
    this.router.navigate(['/auth/login']);
    // this.authService.onLogOut().subscribe(() => {
    //   this.toastService.addToast({
    //     title: 'Hasta la próxima',
    //     timeOut: 3000,
    //     type: TOAST_TYPE.SUCCESS,
    //     description: 'Vuelve pronto.',
    //     useDefaultImage: false,
    //     resource: 'assets/img/pet.png'
    //   });
    //   this.router.navigate(['/auth/login']);

    // });
  }

}
