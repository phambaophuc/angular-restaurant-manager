import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EmotionService {

    private apiURL = 'http://localhost:5000/predict-emotion';

    constructor(private httpClient: HttpClient) { }

    predictEmotion(text: string) {
        return this.httpClient.post(this.apiURL, { text: text });
    }
}
