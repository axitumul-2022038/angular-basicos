import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-HomePage',
  standalone: true,
  imports: [NgIf],
  templateUrl:'home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Returns true if token exists
  }
}
