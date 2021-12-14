import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';
import { RouteGuard } from '@guards/route.guard';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'docs', loadChildren:() => import('./pages/doc/doc.module').then((m) => m.DocModule),
        canLoad: [ AuthGuard, RouteGuard ]
      },
      { path: 'request', loadChildren:() => import('./pages/request/request.module').then((m) => m.RequestModule),
        canLoad: [ AuthGuard, RouteGuard ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
