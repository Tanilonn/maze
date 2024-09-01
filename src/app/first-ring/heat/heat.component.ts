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

    //half of suns explode
    for (let cluster of this.clusters.filter((element, index) => { return index % 2 === 0; })) {
      await this.delay(3000 * Math.random() + 1000); // make this random
      cluster.sun?.classList.add('fading-sun');
      // this creates new clusters without a sun
      this.addExplosion(cluster.x, cluster.y);
    }
    let suns = this.clusters.filter((element, index) => { return element.sun != undefined && !element.sun.classList.contains('fading-sun'); })

    //their remains start orbitting living suns, so get clusters without a sun
    for (let cluster of this.clusters.filter((element, index) => { return element.sun == undefined; })) {
      //find the closest living star
      cluster.newSun = this.findClosestStar(cluster, suns);
    }
    // move each point in the cluster towards the new sun
    this.compactClustersSun();

    // start orbit
    await this.delay(4000);
    for (let cluster of this.clusters.filter((element, index) => { return element.sun == undefined; })) {
      for (let div of cluster.div) {
        div.classList.add('orbit');
      }
    }
  }

  findClosestStar(cluster: Cluster, suns: Cluster[]): Cluster {
    let closest = suns[0];
    let shortestDistance = this.DistSquared(cluster, suns[0]);
    for (const element of suns) {
      let d = this.DistSquared(cluster, element);
      if (d < shortestDistance) {
        closest = element;
        shortestDistance = d;
      }
    }
    return closest;
  }

  DistSquared(cluster: Cluster, sun: Cluster): number {
    let diffX = cluster.x - sun.x;
    let diffY = cluster.y - sun.y;
    return (diffX * diffX + diffY * diffY);
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

  addExplosion(x: number, y: number) {
    let divs: HTMLDivElement[] = [];
    for (let i = 0; i < (100 * Math.random()); i++) {

      const div = document.createElement("div");
      div.classList.add('heat');

      let bellCruveRandom = this.randn_bm();
      let bellCruveRandom2 = this.randn_bm();

      div.style.top = (y + (bellCruveRandom * 250)) + 'px';
      div.style.left = (x + (bellCruveRandom2 * 250)) + 'px';
      divs.push(div);

      this.body.appendChild(div);
    }
    this.clusters.push(new Cluster(divs, x, y))

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

  compactClustersSun() {
    for (let cluster of this.clusters) {
      if (cluster.newSun) {
        for (let div of cluster.div) {
          let bellCruveRandom = this.randn_bm() + 0.1;
          let bellCruveRandom2 = this.randn_bm() + 0.1;
          let leftMove = (cluster.newSun.x - div.offsetLeft) - (bellCruveRandom * 200) - 20;
          let topMove = (cluster.newSun.y - div.offsetTop) - (bellCruveRandom2 * 200) - 20;
          div.style.transition = "3s ease-in-out";
          div.style.transform = "translate(" + leftMove + "px, " + topMove + "px)";

        }
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
      sun.style.top = (cluster.y - 10) + 'px';
      sun.style.left = (cluster.x - 10) + 'px';
      cluster.sun = sun;

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
  sun?: HTMLDivElement;
  newSun?: Cluster;

}
