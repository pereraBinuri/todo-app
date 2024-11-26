import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CompletedTasksComponent } from './component/completed-tasks/completed-tasks.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  //{ path: 'completed', component: CompletedTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
