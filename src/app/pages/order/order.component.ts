import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/enums/status.enum';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['id', 'tableNumber', 'status', 'createdAt', 'updatedAt', 'actions'];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private orderService: OrderService,
        private _liveAnnouncer: LiveAnnouncer,
        private toastr: ToastrService,
        private dialog: MatDialog,
        private webSocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        this.getOrders();
        this.updateNewOrder();
    }

    getOrders() {
        this.orderService.getOrders().subscribe(orders => {
            this.dataSource = new MatTableDataSource(orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    updateNewOrder() {
        let stompClient = this.webSocketService.connect();
        stompClient.connect({}, (frame: any) => {
            stompClient.subscribe('/order/newOrder', (order: any) => {
                this.toastr.success('Có đơn hàng mới!', 'New');
                this.getOrders();
            })
        });
    }

    changeStatusPreparing(id: string) {
        this.orderService.changeOrderStatus(id, Status.PREPARING).subscribe(() => {
            this.toastr.success('Đã cập nhật trạng thái.', 'Preparing');
        });
    }

    changeStatusCanceled(id: string) {
        this.orderService.changeOrderStatus(id, Status.CANCELLED).subscribe(() => {
            this.toastr.error('Đơn hàng đã bị huỷ.', 'Cancelled');
            this.getOrders();
        });
    }

    changeStatusCompleted(id: string) {
        this.orderService.changeOrderStatus(id, Status.COMPLETED).subscribe(() => {
            this.toastr.success('Đã hoàn thành đơn hàng.', 'Completed');
            this.getOrders();
        });
    }

    private updateOrderStatus(updatedOrder: any): void {
        const index = this.dataSource.data.findIndex((order: any) => order._id === updatedOrder._id);

        if (index !== -1) {
            this.dataSource.data[index] = updatedOrder;
            this.dataSource.data = [...this.dataSource.data];
        }
    }

    getStatusIcon(status: Status): string {
        switch (status) {
            case Status.PENDING:
                return 'fa-hourglass-half';
            case Status.PREPARING:
                return 'fa-cogs';
            default:
                return '';
        }
    }

    getStatusTranslation(status: string): string {
        const translations: StatusTranslations = {
            'pending': 'Đang chờ',
            'preparing': 'Đang chuẩn bị',
            'completed': 'Đã hoàn thành',
            'cancelled': 'Đã bị huỷ'
        };

        return translations[status.toLowerCase()] || status;
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

interface StatusTranslations {
    pending: string;
    preparing: string;
    completed: string;
    cancelled: string;
    [key: string]: string;
}