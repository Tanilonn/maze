import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private currentLang: string;

  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    translateService.use(localStorage.getItem('lang') || 'en')
    this.currentLang = localStorage.getItem('language') || 'en';
  }

  ngOnInit(): void {
  }

  getLanguage(): string {
    return this.currentLang;
  }

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'en' ? 'nl' : 'en';
    localStorage.setItem('language', this.currentLang);
    this.translateService.use(this.currentLang);
  }

}
