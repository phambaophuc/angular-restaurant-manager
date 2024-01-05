import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
    selector: 'app-order-cancelled',
    templateUrl: './order-cancelled.component.html',
    styleUrls: ['./order-cancelled.component.scss']
})
export class OrderCancelledComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['id', 'tableNumber', 'status', 'createdAt', 'updatedAt', 'actions'];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private orderService: OrderService,
        private _liveAnnouncer: LiveAnnouncer,
        private dialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders() {
        this.orderService.getOrdersCancelled().subscribe(orders => {
            this.dataSource = new MatTableDataSource(orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    openOrderDetails(data: any) {
        this.dialog.open(OrderDetailComponent, { data });
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
