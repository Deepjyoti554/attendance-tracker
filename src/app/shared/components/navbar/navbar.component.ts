import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [MatBadgeModule, MatButtonModule, MatIconModule],
})
export class NavbarComponent {
  // initialize hidden to false
  hidden = false;

  // define the toggleBadgeVisibility function to toggle the value of hidden
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
}
