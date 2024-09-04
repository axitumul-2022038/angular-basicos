import { AfterViewInit, Component, Input, Output, EventEmitter, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor, NgIf } from '@angular/common';
import { Personaje } from '../interfaces/dbz.interface';
import { DialogAnimationsExampleDialog } from './eliminar-personaje.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatTooltipModule],
  templateUrl: 'personajes.component.html'
})
export class PersonajesComponent implements AfterViewInit {
  @Input() personajes: Personaje[] = [];
  @Output() eliminar = new EventEmitter<number>();
  @Output() editar = new EventEmitter<number>();
  @Output() agregar = new EventEmitter<boolean>();

  readonly dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'foto', 'nombre', 'funcion', 'poder', 'acciones'];
  dataSource = new MatTableDataSource<Personaje>(this.personajes);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource.data = this.personajes;
  }

  openDialog(id: number): void {
    const personaje = this.personajes.find(p => p.id === id);
    if (personaje) {
      this.dialog.open(DialogAnimationsExampleDialog, {
        width: '250px',
        data: { id, personaje, personajes: this.personajes }
      }).afterClosed().subscribe((result: Personaje[]) => {
        if (result) {
          this.personajes = result;
          this.dataSource.data = this.personajes;
        }
      });
    }
  }

  onAgregar() {
    this.agregar.emit();
  }

  onEditar(id: number) {
    this.editar.emit(id);
  }

  onEliminar(id: number) {
    this.eliminar.emit(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
