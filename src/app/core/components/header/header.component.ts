import { Component, inject } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { StoreFacadeService } from '../../../store/store.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly storeSvc = inject(StoreFacadeService);
  private readonly authSvc = inject(AuthenticationService);
  user = this.authSvc.userInfo;

  onSingOut() {
    this.storeSvc.signOut();
  }
}
