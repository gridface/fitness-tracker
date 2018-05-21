import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {

  }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    };
    this.authChange.next(true);
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['./login']);
  }

  getUser() {
    // the "..." spread operator used here creates a new instance of the user object
    // by not returning the original reference, consumers cannot modify the original user
    return { ...this.user };
  }

  // convenience method
  isAuth() {
    return this.user != null;
  }

  private authSuccessfully() {
    this.router.navigate(['/training']);
  }

}
