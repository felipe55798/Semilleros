import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  teachers:User[] = [];
  constructor(private route: ActivatedRoute,
    private authService: UserService) { }

  ngOnInit() {
    this.getTeachersList();
  }

  getTeachersList(){
    return this.authService.getTeachers().subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.teachers = response;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
