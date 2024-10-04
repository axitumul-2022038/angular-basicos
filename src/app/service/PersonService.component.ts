import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

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
    formData.append('usuario', person.usuario);
    formData.append('contrasenia', person.contrasenia);
    if (file) {
      formData.append('imagen', file, file.name);
    }
    return this.http.post<any>(this.apiUrl, formData);
  }

  updatePerson(id: number, person: any, file?: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', person.nombre)
    formData.append('usuario', person.usuario);
    
    // Solo agregar la contraseña si se proporciona
  
    formData.append('administrador', person.administrador);
    if (file) {
      formData.append('imagen', file, file.name);
    }
  
    return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
  }

  updateImgPerson(id: number, file?: File): Observable<any> {
    const formData = new FormData();
    if (file) {
      formData.append('imagen', file, file.name);
    }
    return this.http.put<any>(`${this.apiUrl}/image/${id}`, formData);
  }

  updatePasswordPerson(id: number, passwordUpdateData: { contraseniaAntigua: string; contraseniaU: string; }): Observable<any> {
    return this.http.put(`${this.apiUrl}/password/${id}`, passwordUpdateData);
}


  deletePerson(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

 // person.service.ts
login(usuario: string, contrasenia: string): Observable<any> {
  return this.http.post<any>('http://localhost:3000/api/login', { usuario, contrasenia });
}

exportToExcel(data: any[]): void {
  // Crear un nuevo libro de trabajo
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  
  // Agregar la hoja de trabajo al libro
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Personas');

  // Generar el archivo Excel
  XLSX.writeFile(workbook, 'personas.xlsx');
}  

}
