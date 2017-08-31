import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/_services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userInfo: any;
  constructor(private auth: AuthenticationService,
  private router: Router) {
    this.userInfo = this.auth.user;
   }
  logout() {
    this.auth.logout();
  }
  home() {
    this.router.navigate(['/']);
  }
}
