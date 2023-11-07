import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgIf } from '@angular/common';
import { studentInfo } from '../../shared/modules/interface/interface'
import { StudentService } from '../../shared/services/student.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class EditStudentComponent implements OnInit {
  constructor(private fb: FormBuilder, private api: StudentService, private route: ActivatedRoute) { }

  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{ id: 0, studentId: 0, date: new Date(), Status: "" }] }

  apiData: any = []
  updatedData: Array<studentInfo['studentDetails']> = []

  editProfile: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
  })


  id: number = 0
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.id = params['id']
      console.log("Getting id: " + this.id);

      this.api.getApiDataById(this.id).subscribe((response) => {
        // console.log(response);
        this.apiData = response
        // console.log(this.apiData);
        
        this.editProfile.patchValue({
          name: this.apiData.name,
          email: this.apiData.email,
          password: this.apiData.password,
          phone: this.apiData.phone
        });
      })


    })
  }

  onClick(): void
  {
    this.updatedData = this.editProfile.value;
    console.log(this.updatedData);
    alert("Student Details edited Successfully")
    this.api.updateData(this.id, this.updatedData)
  }
}
