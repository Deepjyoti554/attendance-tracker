import { Injectable } from '@angular/core';
import { studentInfo } from '../../shared/modules/interface/interface'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }
  StudentInfo: studentInfo = { studentDetails: { id: 0, name: "", email: "", password: "", phone: 0 }, attendenceDetails: [{ id: 0, studentId: 0, date: new Date(), Status: "" }] }

  // getFormData(data: studentInfo) {
  //   return fetch('https://653feaef45bedb25bfc17209.mockapi.io/details', {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(data)
  //   })
  // }
  getFormData(data: studentInfo): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post<any>('https://653feaef45bedb25bfc17209.mockapi.io/details', JSON.stringify(data), options);
  }

  getTempApiData(): Observable<any> {
    return this.http.get(`https://653feaef45bedb25bfc17209.mockapi.io/details`)
  }

  getApiData(): Observable<any> {
    // return fetch('https://653feaef45bedb25bfc17209.mockapi.io/details')
    //   .then(response => response.json())
    return this.http.get(`https://653feaef45bedb25bfc17209.mockapi.io/details`)
  }

  getApiDataById(id: number): Observable<any> {
    return this.http.get(`https://653feaef45bedb25bfc17209.mockapi.io/details/${id}`)
  }

  getAttendenceData(data: studentInfo) {
    fetch('https://653feaef45bedb25bfc17209.mockapi.io/attendence', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  getAttendenceApiData(): Observable<any> {
    return this.http.get(`https://653feaef45bedb25bfc17209.mockapi.io/attendence`)
  }

  getTempAttendenceApiData(): Observable<any> {
    return this.http.get(`https://653feaef45bedb25bfc17209.mockapi.io/attendence`);
  }

  // deleteApiData(id: number) {
  //   fetch(`https://653feaef45bedb25bfc17209.mockapi.io/details/${id}`, {
  //     method: 'DELETE',
  //   })
  //   fetch(`https://653feaef45bedb25bfc17209.mockapi.io/attendence/${id}`, {
  //     method: 'DELETE',
  //   })
  // }

  deleteApiData(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    const detailsUrl = 'https://653feaef45bedb25bfc17209.mockapi.io/details/' + id;
    const attendanceUrl = 'https://653feaef45bedb25bfc17209.mockapi.io/attendence/' + id;

    const deleteDetails = this.http.delete(detailsUrl, options);
    const deleteAttendance = this.http.delete(attendanceUrl, options);

    return forkJoin([deleteDetails, deleteAttendance]);
  }

  // updateData(id: number, data: any) {
  //   const url = `https://653feaef45bedb25bfc17209.mockapi.io/details/${id}`;

  //   fetch(url, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  // }
  updateData(id: number, data: any) {
    const url = `https://653feaef45bedb25bfc17209.mockapi.io/details/${id}`;

    return from(fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }))
      .pipe(
        catchError(error => throwError('Error updating data')),
        map(response => response.json())
      );
  }
}
