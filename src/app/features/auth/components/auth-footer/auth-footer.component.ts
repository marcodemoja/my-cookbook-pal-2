import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-footer',
  standalone: true,
  imports: [CommonModule,
  MatCardModule, MatButtonModule],
  templateUrl: './auth-footer.component.html',
  styleUrl: './auth-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFooterComponent {

  @Output()
  actionClick = new EventEmitter();

  @Input()
  actionLabel!: string;

  onActionClick() {
    this.actionClick.emit();
  }
}
