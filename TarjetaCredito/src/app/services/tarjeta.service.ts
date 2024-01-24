import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  private myAppurl = 'https://localhost:44355/';
  private myApiurl = 'api/tarjeta/'

  constructor(private http: HttpClient) {}
    getlisttarjetas(): Observable<any> {
      return this.http.get(this.myAppurl + this.myApiurl)
    }

    deletetarjeta(id: number): Observable<any> {
    return this.http.delete(this.myAppurl + this.myApiurl + id)
  }

    savetarjeta(tarjeta: any): Observable<any>{
    return this.http.post(this.myAppurl + this.myApiurl, tarjeta)
  }


    updatetarjeta(id: number, tarjeta: any): Observable<any> {
      return this.http.put(this.myAppurl + this.myApiurl + id, tarjeta);
    }
}
