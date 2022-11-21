import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from '../../../core/services/auth.service';
import { CompanyService } from '../../../core/services/company.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  companyProfile: any;

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private companyService: CompanyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.companyService.getProfile();
    this.companyService.profile$.subscribe((data) => {
      this.companyProfile = data[0];
    });
  }

  logOut() {
    this.authService.logout();
  }
}
