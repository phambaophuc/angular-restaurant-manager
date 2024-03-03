import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { DashAnalyticsComponent } from './pages/dash-analytics/dash-analytics.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';
import { TableComponent } from './pages/table/table.component';

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
            },
            {
                path: 'products',
                component: ProductComponent
            },
            {
                path: 'orders',
                component: OrderComponent
            },
            {
                path: 'tables',
                component: TableComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
