import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router,
              private authService: AuthService) {

    this.isAuthenticated$ = this.authService.isAuthenticated;
  }

  ngOnInit() {
  }

  onLoadSurvey() {
    this.router.navigate(['/survey']);
  }

  onLogin() {
    this.authService.login();
  }
}
