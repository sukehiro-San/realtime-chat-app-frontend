import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private router = inject(Router);
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
        this.authService.setJWT(res?.token);
        this.router.navigate(['/chat']);
      });
  }

  ngOnDestroy(): void {
    this.LoginSub?.unsubscribe();
  }
}
