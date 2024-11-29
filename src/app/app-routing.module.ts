import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './pages/timer/timer.component';
import { AllComponent } from './pages/all/all.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompleteComponent } from './pages/complete/complete.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'all', component: AllComponent, canActivate: [authGuard] },
  { path: 'pending', component: PendingComponent, canActivate: [authGuard] },
  { path: 'complete', component: CompleteComponent, canActivate: [authGuard] },
  { path: 'timer', component: TimerComponent, canActivate: [authGuard] },
  //{ path: 'completed', component: CompletedTasksComponent }
  { path: '**', redirectTo: 'login' }  // Redirect to login for any unknown route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
