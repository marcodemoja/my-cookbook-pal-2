import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BaseFormDirective } from '../../directives/base-form.directive';
import { AuthFooterComponent } from '../auth-footer/auth-footer.component';
import { AuthHeaderComponent } from '../auth-header/auth-header.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    AuthHeaderComponent,
    AuthFooterComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent extends BaseFormDirective {
}
