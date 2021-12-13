import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLoginGuard } from '@guards/auth-login.guard';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [ AuthLoginGuard ]
  },
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canLoad: [ AuthGuard ]
  },
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
