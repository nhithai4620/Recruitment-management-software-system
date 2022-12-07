import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmptyDataModule } from 'src/app/shared/components/empty-data/empty-data.module';
import { AddContactModule } from './add-contact/add-contact.module';
import { ContactDetailsModule } from './contact-details/contact-details.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent,
    data: {
      title: 'Contacts',
    },
  },
  {
    path: ':id',
    component: ContactDetailsComponent,
    data: {
      title: 'contact details',
    },
  },
];

@NgModule({
  declarations: [ContactsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    NgbModule,
    EmptyDataModule,
    AddContactModule,
    ContactDetailsModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
})
export class ContactsModule {}
