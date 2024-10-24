import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Personaje } from '../dbz/interfaces/dbz.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = 'http://localhost:3000/api/persons';
  private apiUrlSoli = 'http://localhost:3000/api/solicitudes'

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getPerson(id: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.apiUrl}/${id}`);
  }

  getPersonImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/image/${id}`, { responseType: 'blob' });
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

getImage64(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/image64/${id}`).pipe(
    tap((response) => console.log('Respuesta del servidor para la imagen:', response)),
    catchError((error) => {
      console.error('Error al obtener la imagen:', error);
      return of({ imagenUrl: null });  // Devuelve una imagen nula si falla
    })
  );
}

getAllImagesInBase64(): Observable<any[]> {
  return this.http.get<{ imagenes: any[] }>(`${this.apiUrl}/image64`).pipe(
    map(response => response.imagenes || []),  // Asegura que devuelve un array
    tap((response) => {
      console.log('Respuesta del servidor para todas las imágenes:', response);
    }),
    catchError((error) => {
      console.error('Error al obtener las imágenes:', error);
      return of([]);  // Devuelve un array vacío si hay un error
    })
  );
}

updateAdministrador(id: number): Observable<any> {
  const url = `${this.apiUrl}/admin/${id}`;

  return this.http.put<any>(url, {});
}

// -------------------------- Solicitudes --------------------------------

//ver solicitudes

getSolicitudes(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrlSoli);
}

getSolicitudesPendientes(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlSoli}/pendientes`);
}

getSolicitudesAceptadas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlSoli}/aceptadas`);
}

getSolicitudesRechazadas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlSoli}/rechazadas`);
}

getSolicitudUnUsuario(idusuario: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrlSoli}/obtenerusuairo/${idusuario}`);
}


mandarSolicitud(id: number): Observable<any> {
  const url = `${this.apiUrlSoli}/${id}`;
  const body = { solicitudAdmin: true ,estadoSolicitud: 'pendiente' };  // Opcional, si deseas enviar el estado en el cuerpo

  return this.http.post<any>(url, body);

}

aceptarSolicitud(id: number, idResponsable: number): Observable<any> {
  const url = `${this.apiUrlSoli}/${id}`;
  const body = {
    estadoSolicitud: 'aceptado',
    idUsuarioResponsable: idResponsable
  };  // Enviamos el estado y el responsable

  return this.http.put<any>(url, body);
}

rechazarSolicitud(id: number): Observable<any> {
  const url = `http://localhost:3000/api/rechazosolicitudes/${id}`;
  const body = { estadoSolicitud: 'rechazado' };  // Enviamos solo el estado

  return this.http.put<any>(url, body);
}

registrarRechazo(idSolicitud: number, motivoRechazo: string): Observable<any> {
  const body = { idSolicitud, motivoRechazo };
  return this.http.post<any>('http://localhost:3000/api/rechazosolicitudes', body);
}

// ----------------------------------------------------- Otas solicitudes ------------------------------------------------------

crearSolicitud(idUsuario: number, asunto: string, descripcion: string): Observable<any> {
  const url = `${this.apiUrlSoli}/otras/${idUsuario}`;
  const body = { asunto, descripcion };

  return this.http.post(url, body);
}

responderSolicitud(idSolicitud: number, formData: FormData): Observable<any> {
  return this.http.post(`${this.apiUrlSoli}/respuestas/admin/${idSolicitud}`, formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });
}

responderSolicitudUsuario(idSolicitud: number, formData: FormData): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.post(`${this.apiUrlSoli}/respuestas/usuario/${idSolicitud}`, formData, { headers });
}
}


