import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.scss'
  ]
})
export class UsersComponent implements OnInit {

  user: string;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.user = params.username;
    });
  }

  ngOnInit() {
    if(!this.usersService.isLogged(this.user)) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    if(localStorage.getItem('users')) {
      let users = JSON.parse(localStorage.getItem('users'));
      let user = users.find(u => u.username === this.user);
      user.isLogged = false;
      localStorage.setItem('users',  JSON.stringify(users));
      this.router.navigate(['/login']);
    }
  }

}
