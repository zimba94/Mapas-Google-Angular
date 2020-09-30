import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[]=[];

  lat = 19.294001;
  lng = -99.657776;
  //Toluca: 19.294001, -99.657776

  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog) { 
    // const nuevoMarcador = new Marcador(19.294001, -99.657776);
    // this.marcadores.push(nuevoMarcador);
    if (localStorage.getItem('marcadores')) {
      this.marcadores = JSON.parse(localStorage.getItem('marcadores')); 
    }
  }

  ngOnInit(): void {
  }

  agregarMarcador(evento){
    const coords : {lat:number, lng:number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this._snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }
 
  borrarMarcador(i: number){
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this._snackBar.open('Marcador borrado', 'Cerrar',  { duration: 3000 });
  }

  editarMarcador(marcador : Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, descripcion: marcador.desc}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (!result) {
        return;
      }

      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this._snackBar.open('Marcador actualizado', 'Cerrar',  { duration: 3000 });
    });


  }

  guardarStorage(){
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }


}
