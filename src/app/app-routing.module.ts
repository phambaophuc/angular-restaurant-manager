import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layouts/admin/admin.component';
import { DashAnalyticsComponent } from './pages/dash-analytics/dash-analytics.component';
import { ProductComponent } from './pages/product/product.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderCompletedComponent } from './pages/order/order-completed/order-completed.component';
import { OrderCancelledComponent } from './pages/order/order-cancelled/order-cancelled.component';
import { TableComponent } from './pages/table/table.component';
import { TableReservedComponent } from './pages/table/table-reserved/table-reserved.component';

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
                path: 'p',
                component: ProductComponent
            },
            {
                path: 'order',
                component: OrderComponent
            },
            {
                path: 'order/completed',
                component: OrderCompletedComponent
            },
            {
                path: 'order/cancelled',
                component: OrderCancelledComponent
            },
            {
                path: 'table/available',
                component: TableComponent
            },
            {
                path: 'table/reserved',
                component: TableReservedComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
