import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { SeedlingUserService } from 'src/app/services/seedling-user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user:User = {};
  @Input() edit:boolean = true;
  @Output() update = new EventEmitter<boolean>();
  constructor(private seedling_user_service:SeedlingUserService) { }

  ngOnInit() {
    console.log(this.user);
  } 

  aceptar() {
    let data = {
      seedling_user: this.user['pivot'].id,
      status: 1
    };
    this.seedling_user_service.setStatus(data).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  rechazar() {
  }

  handleResponse(response) {
    console.log(response);
    this.update.emit(true);
  }

  handleError(error:any) {
    console.error(error)
  }
}
