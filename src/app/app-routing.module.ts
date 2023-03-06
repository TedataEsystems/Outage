import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LogsComponent } from './component/logs/logs.component';
import { ApproveStatusComponent } from './component/settings/approve-status/approve-status.component';
import { RoleComponent } from './component/settings/role/role.component';
import { UserComponent } from './component/settings/user/user.component';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { LoginComponent } from './shared/component/login/login.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { OutageComponent } from './component/outage/outage.component';
import { ProblemPlaceComponent } from './component/settings/problem-place/problem-place.component';
import { ProblemTypeComponent } from './component/settings/problem-type/problem-type.component';

const routes: Routes = [
  {
    path:'',
  component:LoginComponent,
 },
  {
    path:'login',
  component:LoginComponent,
 },

  {
    path:'outage',
    component: LayoutComponent,
    children: [
      {
      path:'',
      component: DashboardComponent,
      //canActivate:[AuthGuardGuard]

    },
    {
      path:'outages',
      component:OutageComponent
 //canActivate:[AuthGuardGuard]


    },
{
  path:'problemPlace',
  component:ProblemPlaceComponent,
  // canActivate:[AuthGuardGuard]
},
{
  path:'problemType',
  component:ProblemTypeComponent,
  // canActivate:[AuthGuardGuard]
},


    {
      path:'user',
      component: UserComponent,
     // canActivate:[AuthGuardGuard]
    },
    {
      path:'role',
      component: RoleComponent,
//canActivate:[AuthGuardGuard]
    },

    {
      path:'status',
      component: ApproveStatusComponent,
     // canActivate:[AuthGuardGuard]
    },

    {
      path:'history',
      component: LogsComponent,
     // canActivate:[AuthGuardGuard]

    }
    ,
    {
      path:'**',
     pathMatch: 'full',
    component:ErrorPageComponent,
    }




    ]

  },
  {
    path:'**',
   pathMatch: 'full',
  component:ErrorPageComponent,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
