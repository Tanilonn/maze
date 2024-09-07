import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { YoutubeSubscriptionResponse } from '../models/response.model';
import { YoutubeSearchResponse } from '../models/search-response.model';
import { VideoItem } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey = 'YOUR_API_KEY'; // Replace with your YouTube Data API key

  constructor(private http: HttpClient) { }

  // Get the user's subscriptions
  getSubscriptions(accessToken: string): Observable<YoutubeSubscriptionResponse> {
    const url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50&key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<YoutubeSubscriptionResponse>(url, { headers }).pipe(
      catchError(this.handleError) // Handle errors using a method
    );
  }

  // Get the most recent video from a channel
  getMostRecentVideo(channelId: string, accessToken: string): Observable<VideoItem> {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=1&key=${this.apiKey}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
    return this.http.get<YoutubeSearchResponse>(url, { headers }).pipe(
      map(response => response.items[0]),
      catchError(this.handleError)
    );
  }

  getRecentVideosFromSubscriptions(accessToken: string): Observable<VideoItem[]> {
    return this.getSubscriptions(accessToken).pipe(
      switchMap(subscriptionsData => {
        const channelIds = subscriptionsData.items.map(item => item.snippet.resourceId.channelId);
        const videoRequests = channelIds.map(channelId => this.getMostRecentVideo(channelId, accessToken));
        return forkJoin(videoRequests).pipe(
          map(results => results.flat()), // Flatten the array of arrays
          map(videos => videos.sort((a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime())), // Sort by date descending
          map(videos => videos.slice(0, 20)), // Take the top 20 most recent videos
          catchError(this.handleError)
        );
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);

    // Create a user-friendly error message
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      const err = error.error as { error?: { message?: string } };
      const apiErrorMessage = err.error?.message || error.message;
      errorMessage = `Server-side error: ${apiErrorMessage} (Status: ${error.status})`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
