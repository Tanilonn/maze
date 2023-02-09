import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-moon',
  templateUrl: './moon.component.html',
  styleUrls: ['./moon.component.scss']
})
export class MoonComponent implements OnInit, OnDestroy {
  images : HTMLImageElement[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  placeFlag() {
    const img = document.createElement("img");
    img.src = '../../../assets/images/cheese-flag.png';
    img.height = 100;
    img.alt = 'flag';

    // set the position
    img.style.position = 'absolute';
    img.style.top = (document.body.clientHeight - 200) * Math.random() + 100 + 'px';
    img.style.left = (document.body.clientWidth - 100) * Math.random() + 'px';
    console.log(img.style.top);
    this.images.push(img);

    document.body.appendChild(img);
  }

  ngOnDestroy(): void {
    for(let img of this.images){
      document.body.removeChild(img);
    }
  }

}
