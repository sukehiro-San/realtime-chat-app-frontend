import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  private signUpSub!: Subscription;

  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  ngOnInit(): void {
    //
  }

  signup(ev: SubmitEvent) {
    ev.preventDefault();
    this.signUpSub = this.authService
      .signup({name: this.name, username:this.username, email: this.email, password: this.password })
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnDestroy(): void {
    this.signUpSub?.unsubscribe();
  }
}
