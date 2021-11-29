import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { shareReplay, subscribeOn } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ApiService } from '../metod/api.service';
import {RecordModel} from './information-dash board.model';

@Component({
  selector: 'app-information-board',
  templateUrl: './information-board.component.html',
  styleUrls: ['./information-board.component.css']
})
export class InformationBoardComponent implements OnInit {

  formValue !:FormGroup;
  recordData !:any ;
  RecordsModelObj: RecordModel = new RecordModel();
  constructor(private formBuilder : FormBuilder,
    private api :ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nombre : [''],
      correo : [''],
      password : [''],
      rol : [''],
    })
    this.getRecord();
  }
  posRecord(){
    this.RecordsModelObj.nombre = this. formValue.value.nombre;
    this.RecordsModelObj.correo =this.formValue.value.correo;
    this.RecordsModelObj.rol = this.formValue.value.rol;
    this.RecordsModelObj.password = this.formValue.value.password ;
    //publicamos los datos 
    this.api.postResgistration(this.RecordsModelObj)
    .subscribe (res =>{
      console.log(res);
      Swal.fire('Empleado agregado')
      let ref
    },
    err=>{
      Swal.fire('Algo salio mal')
    })
  }

  getRecord(){
    this.api.getResgistration()
    .subscribe (res=>{
      this.recordData = res.usuarios;
    })
  }

  deleteRecord(row:any){
    this.api.deleteRegistration(row.uid)
    .subscribe(res=>{
      Swal.fire ('Eliminado con Exito')
      this.getRecord();
    },
    err=>{
      Swal.fire('No hay token para validar')
    }
    )

  }

  onEdit(row: any){
    this.RecordsModelObj.id =row.id;
    this.formValue.controls ['nombre'].setValue(row.nombre);
    this.formValue.controls ['correo'].setValue(row.correo);
    this.formValue.controls ['rol'].setValue(row.rol);
  }
  updateRecord(){
    this.RecordsModelObj.nombre = this. formValue.value.nombre;
    this.RecordsModelObj.correo =this.formValue.value.correo;
    this.RecordsModelObj.rol = this.formValue.value.rol;
    this.RecordsModelObj.password = this.formValue.value.password ;

    this.api.updateRegistration(this.RecordsModelObj,this.RecordsModelObj.id)
    .subscribe(res=>{
      Swal.fire ('Actualizado con Exito')
      this.getRecord();
    },
    err=>{
      Swal.fire('Algo salio mal')
    }
    )

  }
  
  

}
 