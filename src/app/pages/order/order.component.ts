import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['id', 'name', 'status', 'createdAt', 'actions'];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private orderService: OrderService,
        private userService: UserService,
        private _liveAnnouncer: LiveAnnouncer
    ) { }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders() {
        this.orderService.getOrders().subscribe(orders => {
            const observables = orders.map(order => this.userService.getUserById(order.userId));

            forkJoin(observables).subscribe(users => {
                orders = orders.map((order, index) => ({
                    ...order,
                    userName: users[index].fullName
                }));

                this.dataSource = new MatTableDataSource(orders);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
        });
    }

    getNameUser(id: string) {
        this.userService.getUserById(id).subscribe(user => {
            return user.fullName;
        });
    }

    announceSortChange(sortState: Sort) {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }
}
