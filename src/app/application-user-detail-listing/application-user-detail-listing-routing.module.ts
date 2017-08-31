import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationUserDetailListingComponent } from './application-user-detail-listing.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { ApplicationGroupApplicationsListingComponent } from './application-group-applications-listing/application-group-applications-listing.component';
import { AuthenticationGuard } from '../core/_services/authentication.guard';
import { ActivityResolveService } from '../core/_services/activity-resolve.service';
const routes: Routes = [
    {
        path: '',
        component: ApplicationUserDetailListingComponent,
        canActivate: [AuthenticationGuard],
        resolve: {
            activitesFound: ActivityResolveService
        },
        children: [
            {
                path: 'users',
                component: UsersListingComponent,
                resolve: {
                    activitesFound: ActivityResolveService
                }
            },
            {
                path: 'activites',
                component: ApplicationGroupApplicationsListingComponent,
                resolve: {
                    activitesFound: ActivityResolveService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationUserDetailListingRoutingModule { }
