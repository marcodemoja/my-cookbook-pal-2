import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FooterComponent } from '../../../../core/components/footer/footer.component';
import { HeaderComponent } from '../../../../core/components/header/header.component';
import { SidebarComponent } from '../../../../core/components/sidebar/sidebar.component';

@Component({
  selector: 'app-recipes-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    RouterLinkWithHref,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './recipes-page.component.html',
  styleUrl: './recipes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesPageComponent {
}
