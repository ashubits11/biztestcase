import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/_services/authentication.guard';
import { ApplicationsListingComponent } from './applications-listing.component';
const routes: Routes = [
  {
    path: '',
    component: ApplicationsListingComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsListingRoutingModule { }
