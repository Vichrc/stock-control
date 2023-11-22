import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../services/user/user.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { authRequest } from 'src/app/models/interfaces/user/auth/authRequest';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder,
    private UserService: UserService,
    private CookieService: CookieService,

    ) {}

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid){
      this.UserService.authUser(this.loginForm.value as authRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            this.CookieService.set('USER_INFO', response?.token);

            this.loginForm.reset();
          }
        },
        error: (err) => console.log(err),
      })
    }
  }

  onSubmitRegisterForm(): void {
    if (this.registerForm.value && this.registerForm.valid){
      this.UserService.signupUser(this.registerForm.value as SignupUserRequest)
      .subscribe({
        next: (response) => {
          if (response) {
            alert('Usuario Criado com sucesso!');
            this.registerForm.reset();
            this.loginCard = true;
          }
        },
          error: (err) => console.log(err),
      })
    }
  }
}
