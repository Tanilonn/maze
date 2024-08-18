import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  public try: string = '';
  elements: HTMLElement[] = [];
  @ViewChild('one')
  d1!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  input() {
    if (this.try == 'star') {
      document.getElementById('star')!.className = 'star';
    }
  }

  ngOnDestroy(): void {
    for (let element of this.elements) {
      document.body.removeChild(element);
    }
  }


}
