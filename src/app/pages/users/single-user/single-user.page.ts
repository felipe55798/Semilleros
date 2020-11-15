import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.page.html',
  styleUrls: ['./single-user.page.scss'],
})
export class SingleUserPage implements OnInit {

  id: string;
  user:User = {};
  constructor(private route: ActivatedRoute,
    public apiService: UserService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser(){
    return this.apiService.getUser(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response.user.program.name);
    this.user = response.user;
    console.log('The USER name is: ' + this.user.program.name);
  }
  
  handleError(error: any) {
    console.log(error);
  }

}