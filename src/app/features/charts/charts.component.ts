import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { studentInfo } from '../../shared/modules/interface/interface'
import { StudentService } from '../../shared/services/student.service';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor(private studentService: StudentService) { }


  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{ id: 0, studentId: 0, date: new Date(), Status: "" }] }

  chartData: any

  chartDate: any[] = [];
  chartStudentId: any[] = [];

  ngOnInit(): void {
    this.studentService.getAttendenceApiData().subscribe(data => {
        this.chartData = data
        if (this.chartData != null) {
          for (let i = 0; i < data.length; i++) {
            // console.log(this.chartData[i].date);
            // console.log(this.chartData[i].studentId);
            this.chartDate.push(this.chartData[i].date)
            this.chartStudentId.push(this.chartData[i].studentId)
          }
          console.log(this.chartDate);
          console.log(this.chartStudentId);
          this.renderChartData(this.chartDate, this.chartStudentId);
        }
    })
  }

  renderChartData(chartDate: any, chartStudentId: any) {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: chartDate,
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
