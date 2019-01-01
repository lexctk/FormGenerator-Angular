import { Component, OnInit } from '@angular/core';

import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userSubscription: Subscription;
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userSubscription = this.userService.userChanged.subscribe((user: User) => {
      this.user = user;
    });
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']).then();
  }
}
