import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDbComponent } from './admin-components/edit-db/edit-db.component';
import { GrantPComponent } from './admin-components/grant-p/grant-p.component';
import { AuthguardService } from '../providers/guards/authguard.service';
import { IsAdminGuardService } from '../providers/guards/is-admin-guard.service';


const routes: Routes = [
  { 
    path:'',
    redirectTo: 'grant_permissions',
    pathMatch: 'full'
   },

  {
    path:'grant_permissions',
    component:GrantPComponent,
    canActivate : [AuthguardService,IsAdminGuardService]
  },

  {
    path: 'edit_db',
    component:EditDbComponent,
    canActivate : [AuthguardService,IsAdminGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
