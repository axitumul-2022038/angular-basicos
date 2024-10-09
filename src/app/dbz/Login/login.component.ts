import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { PersonService } from '../../service/PersonService.component';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatTooltipModule, ReactiveFormsModule, NgIf]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; // Nueva propiedad para el mensaje de error

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required]
    });
  }

  CerrarLogin(): void {
    this.router.navigate(['/home']);
    this.dialogRef.close(); // Cerrar el diálogo
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, contrasenia } = this.loginForm.value;
      this.personService.login(usuario, contrasenia).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          this.dialogRef.close(); // Guarda el token
          this.router.navigate(['/home']);
           // Redirigir a la página de inicio
        },
        error: (error) => {
          // Asignar mensaje de error
          this.errorMessage = 'Usuario o contraseña incorrectos. Intenta de nuevo.';
        }
      });
    }
  }
}
