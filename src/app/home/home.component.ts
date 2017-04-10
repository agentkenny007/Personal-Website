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
  showContactForm: boolean = false;

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

  contactForm(action) {
    console.log('form something...');
    switch (action) {
      case 'close' : this.showContactForm = false; $('.contact-modal').removeClass('open-form'); break;
      case 'open' : this.showContactForm = true; $('.contact-modal').addClass('open-form'); break;
      case 'toName' : $('.contact-form').removeClass('to-email'); break;
      case 'toEmail' : $('.contact-form').removeClass('to-msg').addClass('to-email'); break;
      case 'toMessage' : $('.contact-form').removeClass('to-send').addClass('to-msg'); break;
      case 'toSend' :
        $('.contact-form').addClass('to-send');
        break;
      default: return;
    }
  }

  ngOnInit() {
  }

}
