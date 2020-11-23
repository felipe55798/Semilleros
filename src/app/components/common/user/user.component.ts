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

  @Input() user:User = null;
  @Input() edit:boolean = true;
  @Output() update = new EventEmitter<boolean>();
  sending:boolean = false;
  constructor(private seedling_user_service:SeedlingUserService) { }

  ngOnInit() {
    console.log(this.user);
  } 

  aceptar() {
    let data = {
      seedling_user: this.user['pivot'].id,
      status: 1
    };
    if (!this.sending) {
      this.sending = true;
      this.seedling_user_service.setStatus(data).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      );
    }
  }

  rechazar() {
    let data = {
      seedling_user: this.user['pivot'].id,
    };
    if (!this.sending) {
      this.sending = true;
      this.seedling_user_service.deleteSeedlingUser(data).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      ); 
    }
  }

  handleResponse(response) {
    this.user = null;
    console.log('Cualquier cosa');
    this.update.emit(true);
    this.sending = false;
  }

  handleError(error:any) {
    console.error(error);
    this.update.emit(true);
    this.sending = false;
  }
}