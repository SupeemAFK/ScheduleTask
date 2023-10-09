import { Component, Inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-layout-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
})
export class NavbarComponent {
  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService, public userService: UserService) {}
}
