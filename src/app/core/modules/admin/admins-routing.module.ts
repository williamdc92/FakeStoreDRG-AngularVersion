import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../../guards/authguard.service';
import { IsAdminGuardService } from '../../guards/is-admin-guard.service';
import { EditDbComponent } from './pages/edit-db/edit-db.component';
import { GrantPComponent } from './pages/grant-p/grant-p.component';




const routes: Routes = [
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
