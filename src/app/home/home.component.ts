import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flipped: boolean = false;
  interval: number = 0;
  playing: boolean = true;
  activateMenu = false;

  constructor(public app: AppComponent) {
    window.setTimeout(function(home){
      home.flipped = !home.flipped;
    }, 2000, this);
    this.playSlider();
  }

  playSlider(flip?) {
    if (flip) this.flipped = !this.flipped;
    this.interval = window.setInterval(function(home){
      home.flipped = !home.flipped;
    }, 10000, this);
  }

  pauseSlider() {
    if (this.interval) window.clearInterval(this.interval);
  }

  ngOnInit() {
  }

}
