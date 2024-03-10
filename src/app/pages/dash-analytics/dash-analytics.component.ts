import { CommonModule, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Review } from 'src/app/common/review';
import { EmotionService } from 'src/app/services/emotion.service';
import { ReviewService } from 'src/app/services/review.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-dash-analytics',
    standalone: true,
    imports: [CommonModule, SharedModule, MatIconModule],
    templateUrl: './dash-analytics.component.html',
    styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {

    reviews: Review[] = [];

    constructor(private reviewService: ReviewService, private emotionService: EmotionService) { }

    ngOnInit(): void {
        this.reviewService.getTop6NewReviews().subscribe(
            (reviews) => {
                this.reviews = reviews;
                this.reviews.forEach(review => {
                    this.emotionService.predictEmotion(review.comment).subscribe(
                        (data: any) => {
                            review.emotion = data.emotion;
                        }
                    );
                });
            }
        );
    }

    formatDateTime(dateTimeString: string): string {
        return formatDate(dateTimeString, 'dd-MM-yyyy', 'en-US');
    }

    getEmotionIcon(emotion: string): string {
        switch (emotion) {
            case 'Positive':
                return 'add_reaction';
            case 'Negative':
                return 'mood_bad';
            case 'Neutral':
                return 'sentiment_neutral';
            default:
                return 'sentiment_neutral';
        }
    }

    getEmotionColor(emotion: string): string {
        switch (emotion) {
            case 'Positive':
                return '#4CAF50';
            case 'Negative':
                return '#F44336';
            case 'Neutral':
                return '#FFC107';
            default:
                return '#757575';
        }
    }

    cards = [
        {
            background: 'bg-c-blue',
            title: 'Orders Received',
            icon: 'icon-shopping-cart',
            text: 'Completed Orders',
            number: '486',
            no: '351'
        },
        {
            background: 'bg-c-green',
            title: 'Total Sales',
            icon: 'icon-tag',
            text: 'This Month',
            number: '1641',
            no: '213'
        },
        {
            background: 'bg-c-yellow',
            title: 'Revenue',
            icon: 'icon-repeat',
            text: 'This Month',
            number: '$42,56',
            no: '$5,032'
        },
        {
            background: 'bg-c-red',
            title: 'Total Profit',
            icon: 'icon-shopping-cart',
            text: 'This Month',
            number: '$9,562',
            no: '$542'
        }
    ];

    images = [
        {
            src: 'assets/images/gallery-grid/img-grd-gal-1.jpg',
            title: 'Old Scooter',
            size: 'PNG-100KB'
        },
        {
            src: 'assets/images/gallery-grid/img-grd-gal-2.jpg',
            title: 'Wall Art',
            size: 'PNG-150KB'
        },
        {
            src: 'assets/images/gallery-grid/img-grd-gal-3.jpg',
            title: 'Microphone',
            size: 'PNG-150KB'
        }
    ];
}
