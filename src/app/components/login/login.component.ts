import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  loginForm: FormGroup;
  error: string;

  users: User[] = [
    { username: 'user1', password: 'password', isLogged: false },
    { username: 'user2', password: 'password', isLogged: false },
    { username: 'user3', password: 'password', isLogged: false },
    { username: 'user4', password: 'password', isLogged: false },
    { username: 'user5', password: 'password', isLogged: false },
    { username: 'user6', password: 'password', isLogged: false },
  ];

  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g)
      ])]
    });
    this.loginForm = this.fb.group({
      'username': ['', Validators.compose([Validators.required])],
      'password': ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    if(!localStorage.getItem('users')) {
      this.saveUsersToLS();
    }
  }

  saveUsersToLS(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  submitForm(form: any): void {
    let users = this.usersService.register();

    if(users) {
      users.push(form);
      localStorage.setItem('users',  JSON.stringify(users));
    }

    console.log(localStorage.getItem('users'));
  }

  login(form: any): void {
    if(this.usersService.login(form)) {
      console.log(form.username);
      this.router.navigate(['/users'], { queryParams: {username: form.username}});
      
      let users = JSON.parse(localStorage.getItem('users'));
      let user = users.find(u => u.username === form.username);
      user.isLogged = true;
      localStorage.setItem('users',  JSON.stringify(users));

    } else {
      this.error = 'Podano błędne dane';
    }
  }

  logout() {

  }

}
