import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TimerComponent } from './component/timer/timer.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'timer', component: TimerComponent },
  //{ path: 'completed', component: CompletedTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
