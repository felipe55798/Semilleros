import { Component, OnInit } from '@angular/core';
import { Line } from 'src/app/interfaces/line';
import { LinesService } from 'src/app/services/lines.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-lines-list',
  templateUrl: './lines-list.page.html',
  styleUrls: ['./lines-list.page.scss'],
})
export class LinesListPage implements OnInit {

  lines:Line[] = [];
  constructor(private apiService: LinesService,
              private refreshService: RefreshService) { }

   ngOnInit(){
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "lines") {
          this.getLines()     
        }
      }
    )
    this.getLines();
  }

  getLines() {
    this.apiService.getLinesList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response.lines);
    this.lines = response.lines;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
