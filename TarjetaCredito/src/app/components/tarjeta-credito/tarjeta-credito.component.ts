import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from '../../services/tarjeta.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrl: './tarjeta-credito.component.css'
})
export class TarjetaCreditoComponent {
listarTarjetas: any[] = [];
accion = 'agregar';
id: number | undefined;

form: FormGroup;

constructor(private fb: FormBuilder,
  private toastr: ToastrService,
  private _tarjetaservice: TarjetaService) {
this.form = this.fb.group({
  titular: ['', Validators.required],
  numerotarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
  fechaexpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
  cvv: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
})
}

      ngOnInit(): void{
        this.obtenertarjetas();
      }

      obtenertarjetas(){
      this._tarjetaservice.getlisttarjetas().subscribe(data => {
        console.log(data);
        this.listarTarjetas = data;
        
      }, error => {
        console.log(error);
      })

}

guardartarjeta(){


const tarjeta: any ={
  titular: this.form.get('titular')?.value,
  numerotarjeta: this.form.get('numerotarjeta')?.value,
  fechaexpiracion: this.form.get('fechaexpiracion')?.value,
  cvv: this.form.get('cvv')?.value,
}

if(this.id == undefined) {
  //agrega la tarjeta
  this._tarjetaservice.savetarjeta(tarjeta).subscribe(data => {
    this.toastr.success('la Tarjeta fue Registrada con exito!', 'Tarjeta registrada!');
    this.obtenertarjetas();
    this.form.reset();
  },error => {
    this.toastr.error('opps... ocurrio un error','error')
    console.log(error);
  })
}else{
  tarjeta.id = this.id;
  //edita tarjeta
  this._tarjetaservice.updatetarjeta(this.id,tarjeta).subscribe(data => {
    this.form.reset();
    this.accion = 'agregar';
    this.id = undefined;
    this.toastr.info('la tarjeta fue actualizada con exito', 'Tarjeta Actualizada')
    this.obtenertarjetas();
  },  error => {
    console.log(error)
  } )
}  
}

  eliminartarjeta(id: number){
    this._tarjetaservice.deletetarjeta(id).subscribe(data => {

      this.toastr.error('La Tarjeta fue eliminada con exito','Tarjeta Eliminada'); 
      this.obtenertarjetas();

    }, error => {
      console.log(error)
    } )
    
  }

 editartarjeta(tarjeta: any){
    this.accion = 'editar';
    this.id = tarjeta.id;

    this.form.patchValue({

      titular: tarjeta.titular,
      numerotarjeta: tarjeta.numerotarjeta,
      fechaexpiracion: tarjeta.fechaexpiracion,
      cvv: tarjeta.cvv

    })
    

  }
}
