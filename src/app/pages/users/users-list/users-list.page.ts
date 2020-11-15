import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  teachers:User[] = [];
  constructor(private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.getTeachersList();
  }

  getTeachersList(){
    
  }

}
