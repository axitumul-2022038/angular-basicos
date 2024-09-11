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

  addPerson(person: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', person.nombre);
    formData.append('poder', person.poder.toString());
    formData.append('funcion', person.funcion);
    if (file) {
      formData.append('imagen', file, file.name);
    }
    return this.http.post<any>(this.apiUrl, formData);
  }

  updatePerson(id: number, person: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', person.nombre);
    formData.append('poder', person.poder.toString());
    formData.append('funcion', person.funcion);
    if (file) {
      formData.append('imagen', file, file.name);
    }
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
