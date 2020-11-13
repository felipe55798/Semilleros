import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-single-seedling',
  templateUrl: './single-seedling.page.html',
  styleUrls: ['./single-seedling.page.scss'],
})
export class SingleSeedlingPage implements OnInit {

  id: string;
  seedling:Seedling = {};
  teachers:User[] = [];
  students:User[] = [];
  constructor(private route: ActivatedRoute,
    private apiService: SeedlingsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSeedling();
  }

  getSeedling(){
    return this.apiService.getSeedling(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.seedling = response.seedling;
    this.teachers = response.teachers;
    this.students = response.students;
    
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
