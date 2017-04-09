import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contactType: string;
  flipped: boolean = false;
  interval: any;
  playing: boolean = true;
  connectMobile: boolean = this.app.touchable ? true : false;

  constructor(public app: AppComponent) {
    if (this.playing) {
      this.playSlider();
      window.setTimeout(function(home){
        home.flipped = !home.flipped;
      }, 2000, this);
    }
    $(document).on('click', function(){
      console.log('scrolltop: ', $('.contact-modal > div').scrollTop())
      $('.contact-modal > div').animate({'scrollTop':0}, 1500);

    })
    $('.contact-modal > div').on('scroll', function(){
      console.log('something happened.')

      $('.contact-modal > div').animate({'scrollTop':0}, 1500);
    });
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
