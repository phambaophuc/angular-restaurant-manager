import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { DashAnalyticsComponent } from './pages/dashboard/dash-analytics/dash-analytics.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: '/analytics',
                pathMatch: 'full'
            },
            {
                path: 'analytics',
                component: DashAnalyticsComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
