import { Component, ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  navActive = false;
  navBarActive = false;

  makeChecks(grid: Array<number>): string {
    let board = $('<figure>'), row = $('<div>'), check = $('<span>');

    for (let i = 0, l = grid[1]; i < l; i++) {
      let o = true, y = row.clone();
      i % 2 == 0 ? y.addClass('o') : y.addClass('e');
      for (let j = 0, k = grid[0]; j < k; j++) {
        let x = check.clone();
        if (i == 0 && j == 0){} else o ? x.addClass('o') : x.addClass('e'); o = !o;
        y.append(x);
      }
      board.append(y);
    }
    return board.html();
  }

  spell(message: string, elem: any): void {

  }

  openMenu(): void {
    let w = $(window).width(), h = $(window).height(), c = w < 800 ? 40 : 72,
        grid = [Math.floor(w/c), Math.ceil(h/c)], v = c * grid[1];

    $('.nav-menu')
      .show().find('.checks')
        .css("height", v)
        .append(this.makeChecks(grid));
  }

  closeMenu(): void {
    $('.nav-menu').hide().find('.checks').empty();
  }
}
