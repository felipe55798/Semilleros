import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  id: string;
  user:User = null;
  constructor(private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this.authService.getUser().subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(res){
    this.user = res;
  }

  handleError(err){
    console.log(err);
  }
}