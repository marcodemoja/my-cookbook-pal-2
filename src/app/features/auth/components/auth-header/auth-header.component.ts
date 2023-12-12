import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-header',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthHeaderComponent {

}
