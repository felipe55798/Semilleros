import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/interfaces/program';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramService } from 'src/app/services/program.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.page.html',
  styleUrls: ['./programs-list.page.scss'],
})
export class ProgramsListPage implements OnInit {

  programs: Program[] = [];
  admin:boolean = false;
  constructor(private programService: ProgramService,
              private authService: AuthService,
              private refreshService: RefreshService) { }

  ngOnInit() {
    this.loadPrograms();
    this.loadUser();

    this.refreshService.refresh.subscribe(
      res=>{
        if (res === "programs") {
          this.loadPrograms()
        }
      }
    )

  }

  loadUser(){
    this.authService.getUser().subscribe(
      user=>{
        if (user && user.roles[0].id === 1) {
          this.admin = true;
        }
      }
    )
  }

  loadPrograms(){
    this.programService.getPrograms().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    this.programs = res.programs;
  }

  handleError(err){

  }

}
