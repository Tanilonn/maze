import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-heat',
  templateUrl: './heat.component.html',
  styleUrls: ['./heat.component.scss']
})
export class HeatComponent implements OnInit, OnDestroy {
  clusters: Cluster[] = [];
  body!: HTMLDivElement;
  constructor(private element: ElementRef) { }

  async ngOnInit(): Promise<void> {
    this.body = this.element.nativeElement.querySelector('.body');
    //start with some heat clusters
    let randomNClusters = 20 * Math.random();
    for (let i = 0; i < randomNClusters; i++) {
      this.addHeatCluster(100 * Math.random());
    }

    //heat gets closer
    await this.delay(4000);
    this.compactClusters();

    await this.delay(1000);
    this.fadeClusters();

    //heat shapes suns
    await this.delay(1000);
    this.shapeSuns();

    //suns explode

    //their remains start orbitting living suns
  }

  addHeatCluster(size: number) {
    let randomTop = (document.body.clientHeight - 300) * Math.random() + 100;
    let randomLeft = (document.body.clientWidth - 200) * Math.random();
    let divs: HTMLDivElement[] = [];
    for (let i = 0; i < size; i++) {
      const div = document.createElement("div");
      div.classList.add('heat');

      let bellCruveRandom = this.randn_bm();
      let bellCruveRandom2 = this.randn_bm();

      div.style.top = (randomTop + (bellCruveRandom * 250)) + 'px';
      div.style.left = (randomLeft + (bellCruveRandom2 * 250)) + 'px';
      divs.push(div);

      this.body.appendChild(div);
    }
    this.clusters.push(new Cluster(divs, randomLeft, randomTop))

  }

  compactClusters() {
    for (let cluster of this.clusters) {
      for (let div of cluster.div) {
        let leftMove = (cluster.x - div.offsetLeft) / 1.2;
        let topMove = (cluster.y - div.offsetTop) / 1.2;
        div.style.transition = "3s ease-in-out";
        div.style.transform = "translate(" + leftMove + "px, " + topMove + "px)";

      }
    }
  }

  fadeClusters() {
    for (let cluster of this.clusters) {
      for (let div of cluster.div) {
        div.classList.add('fading-star');
      }
    }
  }

  shapeSuns() {
    for (let cluster of this.clusters) {
      const sun = document.createElement("div");
      sun.classList.add('star');
      sun.style.top = (cluster.y - 10) + 'px' ;
      sun.style.left = (cluster.x - 10) + 'px';
      cluster.div.push(sun);

      this.body.appendChild(sun);
    }
  }

  randn_bm(): number {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return this.randn_bm() // resample between 0 and 1
    return num - 0.5; //-0.5 so it's between -0.5 and 0.5 
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngOnDestroy(): void {
    for (let cluster of this.clusters) {
      for (let div of cluster.div) {
        this.body.removeChild(div);
      }
    }
  }

}

export class Cluster {
  constructor(public div: HTMLDivElement[], public x: number, public y: number) { }
}
