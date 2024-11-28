import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TimerComponent } from './pages/timer/timer.component';
import { AllComponent } from './pages/all/all.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompleteComponent } from './pages/complete/complete.component';

const routes: Routes = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: AllComponent },
  { path: 'pending', component: PendingComponent },
  { path: 'complete', component: CompleteComponent },
  { path: 'timer', component: TimerComponent },
  //{ path: 'completed', component: CompletedTasksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
