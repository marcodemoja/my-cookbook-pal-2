import { CommonModule } from '@angular/common';
import { Component,ChangeDetectionStrategy, inject, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { BaseFormDirective } from '../../directives/base-form.directive';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';
import { AuthFooterComponent } from '../auth-footer/auth-footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    AuthHeaderComponent,
    AuthFooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent extends BaseFormDirective {

}
