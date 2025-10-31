import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
 isOpened: boolean = false;
  drawerDirection: 'ltr' | 'rtl' = 'rtl'; // set to 'rtl' for Arabic
}
