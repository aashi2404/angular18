import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUser = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
  };

  validateUser(email: string, password: string): boolean {
    return email === this.validUser.email && password === this.validUser.password;
  }
}
