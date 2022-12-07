import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const CompanyProfileRoutes: Routes = [
  {
    path: '',
    component: CompanyProfileComponent,
    data: {
      title: 'Profile',
    },
  },
];

@NgModule({
  declarations: [CompanyProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyProfileRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CompanyProfileModule {}
