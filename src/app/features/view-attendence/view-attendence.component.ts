import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StudentService } from '../../shared/services/student.service';
import { studentInfo } from '../../shared/modules/interface/interface'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-attendence',
  templateUrl: './view-attendence.component.html',
  styleUrls: ['./view-attendence.component.scss'],
  standalone: true,
  imports: [CommonModule]
})

export class ViewAttendenceComponent implements OnInit {
  constructor(private route: ActivatedRoute, private studentService: StudentService) { }

  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{ id: 0, studentId: 0, date: new Date(), Status: "" }] }

  attendeceData: Array<studentInfo['attendenceDetails']> = [];
  SingleAttendeceData: Array<any> = [];

  id: number = 0
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id']
      // console.log("Getting id: " + this.id);

      this.studentService.getAttendenceApiData().subscribe((data) => {
          this.attendeceData = []
          this.attendeceData = data;
          console.log("View data", this.attendeceData);
          this.SingleAttendeceData = this.attendeceData.filter((val: any) => val.studentId === this.id)
          console.log("SingleAttendeceData", this.SingleAttendeceData);
        });
    })
  }

}
