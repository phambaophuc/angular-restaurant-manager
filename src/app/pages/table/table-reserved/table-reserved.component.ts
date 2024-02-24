import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from 'src/app/services/table.service';

@Component({
    selector: 'app-table-reserved',
    templateUrl: './table-reserved.component.html',
    styleUrls: ['./table-reserved.component.scss']
})
export class TableReservedComponent implements OnInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['tableNumber', 'status', 'bookingTime', 'customer', 'phoneNumber', 'actions'];

    dataSource!: MatTableDataSource<any>;

    constructor(
        private tableService: TableService,
        private _liveAnnouncer: LiveAnnouncer
    ) { }

    ngOnInit(): void {
        this.getTables();
    }

    getTables() {
        this.tableService.getTablesByStatus('reserved').subscribe((tables) => {
            this.dataSource = new MatTableDataSource(tables);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
