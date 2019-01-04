import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../api/api.service';
import { User } from '../survey/models/user.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private apiService: ApiService,
              private userService: UserService) {
  }

  get isAuthenticated() {
    return this.authenticated.asObservable();
  }

  login() {
    this.authenticated.next(true);
    this.apiService.getUserJson().subscribe(
      (user: User) => this.success(user), () => this.failed()
    );
  }

  logout() {
    this.authenticated.next(false);
    this.userService.setUser(null);
  }

  private success(user: User) {
    this.userService.setUser(user);
  }

  private failed() {
    this.router.navigate(['/404']).then();
  }
}
