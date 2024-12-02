import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { TimerComponent } from './pages/timer/timer.component';
import { PendingComponent } from './pages/pending/pending.component';
import { CompleteComponent } from './pages/complete/complete.component';
import { AllComponent } from './pages/all/all.component';
import { SearchComponent } from './component/search/search.component';
import { TaskItemComponent } from './component/task-item/task-item.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    TimerComponent,
    PendingComponent,
    CompleteComponent,
    AllComponent,
    SearchComponent,
    TaskItemComponent,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
