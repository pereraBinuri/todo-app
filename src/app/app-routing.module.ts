import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './pages/timer/timer.component';
import { AllComponent } from './pages/all/all.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompleteComponent } from './pages/complete/complete.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './helpers/auth.guard';
import { LayoutComponent } from './component/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: '', 
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'all', component: AllComponent },
      { path: 'pending', component: PendingComponent },
      { path: 'complete', component: CompleteComponent },
      { path: 'timer', component: TimerComponent },
    ]
  },
  //{ path: 'completed', component: CompletedTasksComponent }
  { path: '**', redirectTo: 'login' }  // Redirect to login for any unknown route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
