import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    apiURL = 'http://localhost:3000/api/v1/order';

    constructor(private http: HttpClient) { }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}`);
    }

    getOrdersCompleted(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}/completed`);
    }

    getOrdersCancelled(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiURL}/cancelled`);
    }

    changeOrderStatus(id: string, status: string): Observable<any> {
        const URL = `${this.apiURL}/${id}/change-status?status=${status}`;
        return this.http.put<any>(URL, {});
    }
}
