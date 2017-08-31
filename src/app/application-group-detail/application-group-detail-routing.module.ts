import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from '../core/_services/authentication.guard';
import { ActivityResolveService } from '../core/_services/activity-resolve.service';
import { ApplicationGroupDetailComponent } from './application-group-detail.component';
const routes: Routes = [
    {
        path: '',
        component: ApplicationGroupDetailComponent,
        canActivate: [AuthenticationGuard],
        resolve: {
            activitesFound: ActivityResolveService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApplicationGroupDetailRoutingModule {}
