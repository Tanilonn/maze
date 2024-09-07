import { Component, OnInit } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  CLIENT_ID = '500954188018-pl7ri0a7qbq1gd4gd71gaafkp4udf1n1.apps.googleusercontent.com';
  accessToken: string | null = null;

  tokenClient: any;

  ngOnInit(): void {
    this.initializeGoogleSignIn();
  }
  initializeGoogleSignIn() {
    // First, initialize the sign-in process and render the button
    // @ts-ignore
    console.log('test');
    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: this.handleCredentialResponse.bind(this), // Bind this to keep context
    });
    console.log('Google Sign-In initialized');

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );

    // Set up the token client for OAuth
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

    // Fetch YouTube subscriptions now that we have the access token
    this.getYouTubeSubscriptions();
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
}
