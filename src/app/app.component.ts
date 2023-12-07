import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { HeaderComponent } from './core/components/header/header.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-cookbook-pal-2';
  private readonly matIconRegistry = inject(MatIconRegistry);
  private readonly authSvc = inject(AuthenticationService);
  readonly userIsLogged = this.authSvc.isUserLogged();

  constructor() {
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
  }
}
