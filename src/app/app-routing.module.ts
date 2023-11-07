import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './features/main/main.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddStudentComponent } from './features/add-student/add-student.component';
import { MarkAttendenceComponent } from './features/mark-attendence/mark-attendence.component';
import { ViewAttendenceComponent } from './features/view-attendence/view-attendence.component';
import { ChartsComponent } from './features/charts/charts.component';
import { EditStudentComponent } from './features/edit-student/edit-student.component';


  const routes: Routes = [
    {
      path: "",
      component: MainComponent
    },
    {
      path: "dashboard",
      component: DashboardComponent
    },
    {
      path: 'add_student',
      component: AddStudentComponent
    },
    {
      path: 'mark_attendence',
      component: MarkAttendenceComponent
    },
    {
      path: 'viewAttendance',
      component: ViewAttendenceComponent
    },
    {
      path: 'Charts',
      component: ChartsComponent
    },
    {
      path: 'edit',
      component: EditStudentComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
