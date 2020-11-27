import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckRoleGuard implements CanActivate {

  constructor(private authService: AuthService){}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean>{
    const { role, role2 } = next.data;
    return await this.authService.checkRole(Number(role), Number(role2))
  }
  
}
