import { Injectable } from "@angular/core";
import { User } from '../models/user';

@Injectable()
export class UsersService {

  register(): User[] {
    let users;
    if(localStorage.getItem('users')) {
      users = JSON.parse(localStorage.getItem('users'));
    }
    return users;
  }

  login(form: any): boolean {
    if(localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users'));
      let user = users.find(u => u.username === form.username);

      if(user && user.password === form.password) {
          return true;
      }

      return false;

    }
  }

  isLogged(username: string): boolean {
    if(localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users'));
      let user = users.find(u => u.username === username);

      if(user && user.isLogged) {
        return true;
      }

      return false;
    }
  }

}