import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { MainComponent } from './features/main/main.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { MarkAttendenceComponent } from './features/mark-attendence/mark-attendence.component';
import { ViewAttendenceComponent } from './features/view-attendence/view-attendence.component';
import { RouterModule } from '@angular/router';
import { ChartsComponent } from './features/charts/charts.component';
import { EditStudentComponent } from './features/edit-student/edit-student.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NavbarComponent,
    RouterModule.forRoot([
      { path: 'view-attendance', component: ViewAttendenceComponent },
    ]),
    MarkAttendenceComponent,
    ViewAttendenceComponent,
    EditStudentComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
