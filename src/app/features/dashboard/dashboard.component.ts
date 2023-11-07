import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { StudentService } from '../../shared/services/student.service';
import { studentInfo } from '../../shared/modules/interface/interface'
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { concatMap } from 'rxjs/operators';
import { LoadingService } from "../../shared/services/loading.service"
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,   CommonModule, RouterModule, MatProgressSpinnerModule,MatButtonModule, MatSortModule],
})
export class DashboardComponent implements OnInit{
  loading$ = this.loader.loading$;
  
  dashboardData: Array<studentInfo['studentDetails']> = [];
  
  dataSource: any;
  displayedColumns: string[] = ["id", "name", "email", "phone", "action"];
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private studentService: StudentService, public loader: LoadingService, private route: ActivatedRoute) {
  }
  
  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{id: 0, studentId: 0, date: new Date(), Status: "" }] }

  ngOnInit(): void {
    this.studentService.getApiData().subscribe((data) => {
      // this.dashboardData = []
      this.dashboardData = data;
      this.dataSource = new MatTableDataSource<studentInfo['studentDetails']>(this.dashboardData)
      console.log(this.dashboardData);
      this.dataSource.paginator = this.paginator;
    });
  }

  getID(id: Number){
    window.location.href = "./view-attendance?id=" + id;
  }
  
  deleteStudent(id: number): void
  {
    this.studentService.deleteApiData(id).subscribe()
  }

  viewId(id: number)
  {
    window.location.href = "./edit?id=" + id
  }

}