import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { studentInfo } from '../../shared/modules/interface/interface'
import { StudentService } from '../../shared/services/student.service';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mark-attendence',
  templateUrl: './mark-attendence.component.html',
  styleUrls: ['./mark-attendence.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, FormsModule],
})
export class MarkAttendenceComponent implements OnInit {
  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) { }

  studentInfo: Array<any> = [];

  studentAttendance: Array<any> = [];

  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{ id: 0, studentId: 0, date: new Date(), Status: "" }] }

  attendenceFormInfo: FormGroup = this.fb.group({
    studentId: ['', Validators.required],
    date: ['', [Validators.required]],
    Status: ['', [Validators.required]]
  })

  isSubmitting = false;
  onSubmit() {
    this.isSubmitting = true;
    if (this.attendenceFormInfo.valid) {
      const attendanceMatch = this.studentAttendance.find(student => {
        return student.studentId == this.attendenceFormInfo.value.studentId && student.date == this.attendenceFormInfo.value.date;
      });

      if (attendanceMatch) {
        alert("!!!!!!!!!Attendance already marked");
        return;
      } else {
        this.studentService.getAttendenceData(this.attendenceFormInfo.value)
        this.router.navigate(['/dashboard']);
        alert("Successfully Marked Attendence")
      }
    }
    this.isSubmitting = false;
  }

  ngOnInit(): void {
    this.fetchTempData()


    this.studentService.getTempApiData().subscribe({
      next: (res) => {
        console.log(res);
        this.studentInfo = res;
        console.log("studentInfo", this.studentInfo)


      },

      error: err => {
        console.log(err);
      }

    })
  }

  fetchTempData() {
    this.studentService.getTempAttendenceApiData().subscribe({
      next: (res) => {
        console.log(res);
        this.studentAttendance = res;
        console.log('sa', this.studentAttendance)


      },

      error: err => {
        console.log(err);
      }
    })
  }
}
