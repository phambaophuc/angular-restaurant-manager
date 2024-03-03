import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../enums/status.enum';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    apiURL = `${environment.apiUrl}/api/orders`;

    constructor(private http: HttpClient) { }

    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}`);
    }

    deleteOrderById(id: string) {
        return this.http.delete(`${this.apiURL}/${id}`);
    }

    updateOrderStatus(id: string, status: Status): Observable<any> {
        const URL = `${this.apiURL}/${id}/status`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.put<any>(URL, `"${status}"`, { headers });
    }
}
