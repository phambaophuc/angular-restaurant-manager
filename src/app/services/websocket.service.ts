import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    constructor() { }

    public connect() {
        let socket = new SockJS(`${environment.apiUrl}/websocket`);
        let stompClient = Stomp.over(socket);
        return stompClient;
    }
}
