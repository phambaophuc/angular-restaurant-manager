import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/enums/status.enum';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { WebsocketService } from 'src/app/services/websocket.service';
import { formatDate } from '@angular/common';

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

    stompClient: any;

    constructor(
        private orderService: OrderService,
        private _liveAnnouncer: LiveAnnouncer,
        private toastr: ToastrService,
        private dialog: MatDialog,
        private webSocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        this.getAllOrders();
        if (!this.stompClient) {
            this.updateOrder();
        }
    }

    updateOrder() {
        if (!this.stompClient) {
            this.stompClient = this.webSocketService.connect();
            this.stompClient.connect({}, () => {
                this.stompClient.subscribe('/order/newOrder', (order: any) => {
                    this.toastr.success('Có đơn hàng mới!', 'New');
                    this.getAllOrders();
                });
            });
        }
    }

    getAllOrders() {
        this.orderService.getAllOrders().subscribe(orders => {
            this.dataSource = new MatTableDataSource(orders);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    deleteOrderById(id: string) {
        this.orderService.deleteOrderById(id).subscribe(
            () => {
                this.toastr.error('Đã xoá đơn hàng!', 'Deleted!');
                this.getAllOrders();
            }
        );
    }

    updateOrderStatus(id: string, status: Status) {
        if (status.toLowerCase() === 'pending') {
            this.orderService.updateOrderStatus(id, Status.PROCESSING)
                .subscribe(() => {
                    this.toastr.success('Đã cập nhật trạng thái!', 'Updated!');
                    this.getAllOrders();
                });
        } else {
            this.orderService.updateOrderStatus(id, Status.COMPLETED)
                .subscribe(() => {
                    this.toastr.success('Đã cập nhật trạng thái!', 'Updated!');
                    this.getAllOrders();
                });
        }
    }

    // private updateOrderStatus(updatedOrder: any): void {
    //     const index = this.dataSource.data.findIndex((order: any) => order._id === updatedOrder._id);

    //     if (index !== -1) {
    //         this.dataSource.data[index] = updatedOrder;
    //         this.dataSource.data = [...this.dataSource.data];
    //     }
    // }

    openOrderDetails(data: any) {
        this.dialog.open(OrderDetailComponent, { data });
    }

    formatDateTime(dateTimeString: string): string {
        return formatDate(dateTimeString, 'dd-MM-yyyy HH:mm', 'en-US');
    }

    getStatusTranslation(status: string): string {
        const translations: StatusTranslations = {
            'pending': 'Đang chờ',
            'processing': 'Đang chuẩn bị',
            'completed': 'Đã hoàn thành'
        };

        return translations[status.toLowerCase()] || status;
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
    processing: string;
    completed: string;
    [key: string]: string;
}