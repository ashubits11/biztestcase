import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/_services/authentication.guard';
import { AppComponent } from './app.component';
const routes: Routes = [
    {
        path: 'applications',
        loadChildren: 'app/applications-listing/applications-listing.module#ApplicationsListingModule'
    },
    {
        path: 'applications/:id/allUserGroups',
        loadChildren: 'app/application-group-detail/application-group-detail.module#ApplicationsGroupDetailModule'
    },
    {
        path: 'applications/:id/policyGroups/:policyGroupName/localUserGroups/:userGroupName',
        loadChildren: 'app/application-user-detail-listing/application-user-detail-listing.module#ApplicationsUserDetailModule'
    },
    {
        path: '',
        redirectTo: 'applications',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
