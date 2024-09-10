import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3000/api/persons';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPerson(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addPerson(person: any): Observable<any> { 
    return this.http.post<any>(this.apiUrl, person);
  }

  updatePerson(id: number, person: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, person);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
