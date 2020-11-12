import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Line } from 'src/app/interfaces/line';
import { LinesService } from 'src/app/services/lines.service';

@Component({
  selector: 'app-single-line',
  templateUrl: './single-line.page.html',
  styleUrls: ['./single-line.page.scss'],
})
export class SingleLinePage implements OnInit {

  id: string;
  line:Line = {};
  constructor(private route: ActivatedRoute,
    private apiService: LinesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLine();
  }

  
  getLine() {
    return this.apiService.getLine(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.line = response.line;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
