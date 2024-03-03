import { Injectable } from '@angular/core';

import * as SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {

    constructor() { }

    public connect() {
        let socket = new SockJS(`http://localhost:8765/sockjs-websocket`);
        let stompClient = Stomp.over(socket);
        return stompClient;
    }
}
