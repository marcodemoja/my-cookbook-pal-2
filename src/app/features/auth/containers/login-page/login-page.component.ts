import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { StoreFacadeService } from '../../../../store/store.facade';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignIn, SignUp } from '../../../../core/interfaces/user';
import { SignupComponent } from '../../components/signup/signup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    SignupComponent,
    LoginComponent,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent{
  private readonly storeSvc = inject(StoreFacadeService);
  readonly fb = inject(FormBuilder);

  @ViewChild(LoginComponent) signInCmp!: LoginComponent

  signInForm = this.fb.group({
    email: ['',  {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur'
      }
    ],
    password: ['', [Validators.required]]
  })

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
    password2: ['', Validators.required]
  })

  isSignUp = false;

  onSignIn() {
    //dispatch login action
    if(this.signInForm.valid) {
      const user: SignIn = {
        email: this.signInForm.get('email')?.value as string,
        password: this.signInForm.get('password')?.value as string
      }
      this.storeSvc.signIn(user);
    }
  }

  onSignUp() {
    const data: SignUp = {
      name: this.signUpForm.get('name')?.value as string,
      email: this.signUpForm.get('email')?.value as string,
      password: this.signUpForm.get('password')?.value as string
    };
    this.storeSvc.signUp(data);
  }

  switchForm() {
    this.isSignUp = !this.isSignUp ? true : false;
  }
}
