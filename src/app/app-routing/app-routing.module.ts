import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../user/user.component';
import { AddUserComponent } from '../user/adduser.component';
import { CustomerComponent } from '../customer/customer.component';
import { HomeComponent } from '../home/home.component';
import { DefaultComponent } from '../default/default.component';

const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path:'user',
    component: UserComponent
  },
  {
    path:'customer',
    component : CustomerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
