import { Component, OnInit } from '@angular/core';
import { Line } from 'src/app/interfaces/line';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { LinesService } from 'src/app/services/lines.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.page.html',
  styleUrls: ['./lines-list.page.scss'],
})
export class LinesListPage implements OnInit {

  loggedUser: User = null;

  lines:Line[] = [];
  constructor(private apiService: LinesService,
              private refreshService: RefreshService,
              private authService: AuthService) { }

   ngOnInit(){
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "lines") {
          this.getLines()     
        }
      }
    )
    this.getLines();
    this.loadUser();
  }

  loadUser(){
    this.authService.getUser().subscribe(
      res=>{
        this.loggedUser = res;
      }
    )
  }

  getLines() {
    this.apiService.getLinesList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.lines = response.lines;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
