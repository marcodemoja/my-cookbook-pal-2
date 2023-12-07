import { CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardActions, MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly authSvc = inject(AuthenticationService);

  protected readonly form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      })

  onSubmit() {
    if(this.form.valid) {
      //dispatch login action
      this.authSvc.login(this.form.get('email')?.value as string,
       this.form.get('password')?.value as string)
    }
  }

  ngOnInit() {

  }


}
