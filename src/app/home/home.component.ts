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
  validateForm: (()=>boolean)[] = [
    () => { return $('.contact-form .slide:first-child input').val().trim().length > 1 },
    () => { return /.+@.+\..+/i.test($('.contact-form .slide:nth-child(2) input').val()) },
    () => { return $('.contact-form textarea').val().trim() }
  ];

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
    switch (action) {
      case 'close' : this.showContactForm = false; $('.contact-modal').removeClass('open-form'); break;
      case 'open' : this.showContactForm = true; $('.contact-modal').addClass('open-form'); break;
      case 'reset' : $('.contact-form').removeClass().addClass('contact-form'); break;
      case 'toName' : $('.contact-form').removeClass('to-email'); break;
      case 'toEmail' :
        if (this.validateForm[0]()) $('.contact-form').removeClass('to-msg').addClass('to-email');
        else $('.contact-form .slide:first-child').addClass('error');
        break;
      case 'toMessage' :
        if (this.validateForm[1]()) $('.contact-form').removeClass('to-send').addClass('to-msg');
        else $('.contact-form .slide:nth-child(2)').addClass('error');
        break;
      case 'toSend' :
        if (this.validateForm[2]()) {
          $('.contact-form').addClass('to-send');
          // send email logic
        } else $('.contact-form .slide:nth-child(3)').addClass('error');
        break;
      default: return;
    }
  }

  validateInput(type) {
    switch (type) {
      case 'name' :
        if (this.validateForm[0]()) $('.contact-form .slide:first-child').removeClass('error');
        else $('.contact-form .slide:first-child').addClass('error');
        break;
      case 'email' :
        if (this.validateForm[1]()) $('.contact-form .slide:nth-child(2)').removeClass('error');
        else $('.contact-form .slide:nth-child(2)').addClass('error');
        break;
      case 'message' :
        if (this.validateForm[2]()) $('.contact-form .slide:nth-child(3)').removeClass('error');
        else $('.contact-form .slide:nth-child(3)').addClass('error');
        break;
      default: return;
    }
  }

  setSize(textarea) {
    let size: number = textarea.value.length,
        list: any = textarea.classList;
    console.log(textarea.classList.contains('zoom-1'), size);
    if (size > 60 && !list.contains('zoom-1')) list.add('zoom-1');
    else if (size < 60 && list.contains('zoom-1')) list.remove('zoom-1');
    if (size > 170 && !list.contains('zoom-2')) list.add('zoom-2');
    else if (size < 170 && list.contains('zoom-2')) list.remove('zoom-2');
    if (size > 700 && !list.contains('zoom-3')) list.add('zoom-3');
    else if (size < 700 && list.contains('zoom-3')) list.remove('zoom-3');
  }

  ngOnInit() {
  }

}
