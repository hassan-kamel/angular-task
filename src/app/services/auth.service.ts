import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import UsersData from '../../data/users.json';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ILogin, IUser } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _router: Router,
    private _messageService: MessageService
  ) {}

  private _users: IUser[] = UsersData as IUser[];

  private checkUserValidity(username: string, password: string): boolean {
    return !!this._users.find(
      (u) => u.username === username && u.password === password
    );
  }

  public onLogin({ username, password }: ILogin) {
    if (localStorage.getItem('user')) {
      this._router.navigateByUrl('/courses');
      this._messageService.add({
        severity: 'success',
        summary: 'Succeed To Login',
        detail: 'Logged In Successfully ',
      });
    } else if (this.checkUserValidity(username, password)) {
      localStorage.setItem('user', username);
      this._messageService.add({
        severity: 'success',
        summary: 'Succeed To Login',
        detail: 'Logged In Successfully ',
      });
      this._router.navigateByUrl('/courses');
    } else
      this._messageService.add({
        severity: 'error',
        summary: 'Failed To Login',
        detail: 'Username or Password is incorrect',
      });
  }

  public onLogout() {
    localStorage.removeItem('user');
    this._messageService.add({
      severity: 'info',
      summary: 'Log Out ',
      detail: 'Logged Out Successfully ',
    });
    this._router.navigateByUrl('/login');
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
