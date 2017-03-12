import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  flipped: boolean = false;
  interval: any;
  playing: boolean = true;

  constructor(public app: AppComponent) {
    if (this.playing) {
      this.playSlider();
      window.setTimeout(function(home){
        home.flipped = !home.flipped;
      }, 2000, this);
    }
  }

  playSlider(flip?) {
    if (flip) this.flipped = !this.flipped;
    this.interval = window.setInterval(function(home){
      home.flipped = !home.flipped;
    }, 10000, this);
  }

  pauseSlider() {
    window.clearInterval(this.interval);
  }

  ngOnInit() {
  }

}
