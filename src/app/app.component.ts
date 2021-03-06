import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeComponent } from './home/home.component';
import * as $ from 'jquery';
import 'jquery-easing';

// declare var skrollr: any;

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class AppComponent {
  contactActive: boolean = false;
  invertToggle: boolean = false;
  navActive: boolean = false;
  navAvailable: boolean = false;
  navBarActive: boolean = false;
  route: ActivatedRoute;
  timers: number[] = [];
  touchable: boolean = 'ontouchstart' in window;

  constructor(public router: Router){
    this.init();
    if (this.navAvailable) this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        let active: number, links: JQuery = $('.nav-menu .links a'), state: string = this.router.url;

        if (links.hasClass('active')) links.removeClass('active');
        switch (state) {
          case '/home' : active = 0; break;
          case '/about' : active = 1; break;
          case '/blog' : active = 2; break;
          case '/contact' : active = 3; break;
          case '/hire' : active = 4; break;
          case '/portfolio' : active = 5; break;
          case '/samples' : active = 6; break;
          case '/testimonials' : active = 7; break;
        }
        if (active != undefined) links[active].classList.add('active');
      }
    });
  }

  makeChecks(grid: Array<number>, callback?: any): JQuery {
    let board: JQuery = $('<figure>'), row: JQuery = $('<div>'), check: JQuery = $('<span>');

    for (let i = 0, l:number = grid[1]; i < l; i++) {
      let o:boolean = true, y:JQuery = row.clone(), yM: string = "matrix";

      i % 2 == 0 ? y.addClass('o ' + yM) : y.addClass('e ' + yM);
      this.timers.push(this.delayClass(y, yM, i * 450, this.timers.length));
      for (let j = 0, k:number = grid[0]; j < k; j++) {
        let x:JQuery = check.clone(), xM: string = "matrix";

        if (i == 0 && j == 0){} else o ? x.addClass('o ' + xM) : x.addClass('e ' + xM); o = !o;
        y.append(x);
        // callback(x, y);
        this.timers.push(this.delayClass(x, xM, (i || 0.75) * j * 45, this.timers.length),);
      }
      board.append(y);
    }
    return board;
  }

  delayClass(elem: JQuery, className: string, delay: number, index: number): number {
    return window.setTimeout(()=>{ elem.removeClass(className); this.timers[index] = null; }, delay);
  }

  randomMenuTransition(check: JQuery, row: JQuery): void {

  }

  onResize(event){
    console.log(event.target.innerWidth, event.target.innerHeight);
  }

  spell(message: string, elem: any): void {

  }

  init(): void {
    $('.load-overlay').addClass('fade-out');
    // this isn't working, why:
    // $(document).on('click', '.nav-menu .links .up', function(){
    //   alert('working');
    //   $('.nav-menu .links').animate({ scrollTop: $(this).height() }, 1000);
    // })
  }

  scrollMenu(to: string): void {
    let links: JQuery = $('.nav-menu .links');

    if (to == "bottom") links.animate({ scrollTop: links.find('div').height() - $(window).height() }, 1075, "easeInOutCirc");
    else if (to == "top") links.animate({ scrollTop: 0 }, 1700, "easeOutBounce");
  }

  openMenu(type?: string): void {
    if (type == "contact") {
      $('.contact-modal').show();
      setTimeout(()=>{ $('.contact-modal').addClass('open') }, 16);
    } else {
      let w:number = $(window).width(), h:number = $(window).height(), c:number = w > 800 ? 72 : 52,
      grid: number[] = [w > 800 ? Math.floor(w/c) : Math.ceil(w/c), Math.ceil(h/c)], v:number = c * grid[1];

      $('.nav-menu')
        .show()
        .find('.checks')
          .css("height", v)
          .append(this.makeChecks(grid));
      setTimeout(()=>{ $('.nav-menu').addClass('open') }, 16);
    }
  }

  closeMenu(type?: string): void {
    this.contactActive = false;
    if (type == "contact") $('.contact-modal').hide().removeClass('open');
    else {
      let app = this;
      $('.nav-menu').removeClass('open');
      setTimeout(()=>{
        $('.nav-menu').hide().find('.checks').empty();
        app.timers.forEach(activeTimer => { if (activeTimer) window.clearTimeout(activeTimer) });
        app.timers = [];
      }, 1000)
    }
  }

  toggleMenu(type?: string): void {
    let activate = this.navActive = !this.navActive; // flip the value of global 'navActive' and store it in let 'activate'
    if (activate) {
      if (type == "contact") this.contactActive = true;
      else this.navBarActive = true;
      this.openMenu(type);
    } else this.closeMenu(type);
  }

  menuScrollable(): boolean {
    return $(window).height() < $('.nav-menu .links div').height();
  }
}
