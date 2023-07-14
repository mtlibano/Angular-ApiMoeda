import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Moeda } from '../../models/moeda';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

  constructor(private http: HttpClient) {}

  public moeda!: Moeda;
  public valor!: number;

  getMoeda(): Observable<any> {
    let url = `https://api.hgbrasil.com/finance?format=json-cors&key=01239b88`;
    return this.http.get(url).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  public buscarMoeda() {
    this.getMoeda().subscribe((valorAPI) => {
      this.moeda = {
        valorReal: this.valor,
        valorDolar: this.valor / valorAPI['results']['currencies']['USD']['buy'],
        valorEuro: this.valor / valorAPI['results']['currencies']['EUR']['buy'],
        valorPeso: this.valor / valorAPI['results']['currencies']['ARS']['buy']
      }
    });
  }

}
