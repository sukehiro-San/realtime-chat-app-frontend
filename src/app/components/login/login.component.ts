import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private LoginSub!: Subscription;

  public email!: string;
  public password!: string;
  ngOnInit(): void {
    //
  }

  login(ev: SubmitEvent) {
    ev.preventDefault();
    this.LoginSub = this.authService
      .login({ email: this.email, password: this.password })
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.LoginSub?.unsubscribe();
  }
}
