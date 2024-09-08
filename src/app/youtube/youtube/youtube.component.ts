import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { YoutubeService } from '../shared/services/youtube.service';
import { firstValueFrom } from 'rxjs';

declare var google: any;

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  recentVideos: any[] = [];
  loading: boolean = true; 
  error: string | null = null;

  constructor(private youtubeService: YoutubeService, private cdr: ChangeDetectorRef) { }
  CLIENT_ID = '500954188018-pl7ri0a7qbq1gd4gd71gaafkp4udf1n1.apps.googleusercontent.com';
  accessToken: string | null = null;

  tokenClient: any;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.initializeGoogleSignIn();
  }

  initializeGoogleSignIn() {
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this),
    });
    console.log('Google Sign-In initialized');

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );

    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: 'https://www.googleapis.com/auth/youtube.readonly',
      callback: this.handleTokenResponse.bind(this)
    });
  }

  handleCredentialResponse(response: any) {
    console.log('Google ID Token:', response.credential);

    // Request the access token using the token client after sign-in
    this.tokenClient.requestAccessToken();
  }

  handleTokenResponse(response: any) {
    console.log('Access Token:', response.access_token);
    this.accessToken = response.access_token;

    // Load user videos after signing in
    this.loadRecentVideos();
  }

  getYouTubeSubscriptions() {
    if (!this.accessToken) {
      console.error('No access token found.');
      return;
    }

    const url = 'https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true';

    fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('YouTube Subscriptions:', data);
      })
      .catch(error => console.error('Error fetching YouTube subscriptions:', error));
  }

  async loadRecentVideos(this: any) {
    try {
      this.loading = true;
      this.recentVideos = await firstValueFrom(this.youtubeService.getRecentVideosFromSubscriptions(this.accessToken));
      console.log('Recent Videos:', this.recentVideos);
    } catch (error) {
      this.error = 'Error fetching recent videos';
      console.error('Error fetching recent videos:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
  
}
