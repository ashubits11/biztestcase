import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './404-not-found/404-not-found.component';
const routes: Routes = [
    {
        path: '404-not-found',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CoreRoutingModule { }
