import { Descripcion } from './descripcion';
import { Component } from '@angular/core';
import { ConsultaGeneral } from './consultageneral';
import { Pokemon} from './pokemon';
import { HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { OnInit, Input } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';
    //pokemon?offset=0&limit=20  ?offset=5&limit=5   '?_limit=20'
    @Input() pokes: Pokemon[] = [];
    consulta: ConsultaGeneral[];
    @Input() varOffset = 0;  // valor de inicio de conteo de la lista total de pokes. Se incrementa.
    @Input() totalPokes = 0;
    @Input() varLimit = 5;   // cuantos pokemones muestra
    httpClient: HttpClient;
    @Input() totalPaginas = 0;
    @Input() paginaActual = 1;
  
    constructor(http: HttpClient){
      this.httpClient = http;
      this.traerDesc();
      this.obtenerPokemons();
    };

    traerDesc(){
      this.httpClient.get<[Descripcion]>('http://localhost:3001/api/pokes')
      .subscribe(response => {
        for(var i = 0; i < response.length; i++){
          if(response[i].descr){
            var id1 = response[i].id;
            for(var j = 0; j < this.pokes.length; j++){
              if(this.pokes[j].id === id1){
                this.pokes[i].descr = response[i].descr;
                this.httpClient.put<[Descripcion]>('http://localhost:3001/api/pokes', this.pokes[i].descr);
                
              }           
            }
        }
      }
      });
    }
  
    async obtenerPokemons() {
      
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': 'my-auth-token'
        })
      }; 
  
      await this.httpClient.get<ConsultaGeneral>('https://pokeapi.co/api/v2/pokemon' + '?offset=' + this.varOffset + '&limit=' + this.varLimit , httpOptions)
        .subscribe(response => {
          this.totalPokes = response.count;
          this.totalPaginas = Math.round((this.totalPokes / this.varLimit) + 1);
          this.pokes = [];
          this.consulta = response.results;
          for (let index = 0; index < this.consulta.length; index++) {
            let url = this.consulta[index]['url'];
            this.httpClient.get<Pokemon>(url)
            .subscribe(response => {
              this.pokes.push(response);
              this.traerDesc();
            });
          };
      });
    }
 
    // traerDesc(){
    //   this.httpClient.get<[Descripcion]>('http://localhost:3001/api/pokes')
    //   .subscribe(response => {
    //     for(var i = 0; i < response.length; i++){
    //       if(response[i].descr){
    //         var id1 = response[i].id;
    //         console.log(this.pokes.length);
    //         for(var j = 0; j < this.pokes.length; j++){
    //           if(this.pokes[j].id === id1){
    //             console.log("anda");
    //           }           
    //         }
    //     }
    //   }
    //   });
    // }

    
    enviarDescripcion($event, poke: Pokemon){
      console.log($event.target.value);
      poke.descr = $event.target.value;
      this.httpClient.post('http://localhost:3001/api/pokes', {
        id: poke.id,
        desc: poke.descr
      }).subscribe();
      
    }
    //sólo para probar directives 
    log(desc){
      console.log(desc);
    }

    submit(f){
      console.log(f.value);
    }
    //////////////////////////////7

    borrarDescripcion(poke: Pokemon){
      this.httpClient.delete('http://localhost:3001/api/pokes/' + poke.id)
      .subscribe();
    }
  

    // PAGINADO

    obtenerSiguientes() {
      this.varOffset = this.varOffset + this.varLimit;
      this.paginaActual = (this.varOffset / this.varLimit) + 1;
      this.obtenerPokemons();
    }
  
    obtenerAnteriores() {
      if (this.varOffset !== 0){
        this.varOffset = this.varOffset - this.varLimit;
        this.paginaActual = (this.varOffset / this.varLimit) + 1;
        this.obtenerPokemons();
      }
        return;
    }
}
