import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerConfiguration } from './owner-configuration/owner-configuration.component';
import { OwnersCars } from './owners-cars/owners-cars.component';

const routes: Routes = [
  {path: '', component: OwnersCars},
  {path: 'newOwner', component: OwnerConfiguration},
  {path: 'newOwner/:id', component: OwnerConfiguration}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
