import {Component, OnInit} from '@angular/core';
import {DataService} from '../../service/data.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
pokemons: any[] = [];
pokemonname: any;

  constructor(private dataService: DataService) {}
  offset: any;
  limit: any;
  colors: {[index: string]: any} = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  };
  // tslint:disable-next-line:variable-name
  ngOnInit(): void {
    this.offset = 0;
    this.limit = 10;
    this.dataService.getP(this.offset, this.limit)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
          this.dataService.getMore(result.name)
          // tslint:disable-next-line:no-shadowed-variable
            .subscribe((uniqresponse: any) => {
              this.pokemons.push(uniqresponse);
            });
        })
        );
      });
  }
  // tslint:disable-next-line:typedef
  Next(){
    this.pokemons = [];
    this.dataService.getP(this.offset = this.offset + this.limit + 1, this.limit)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
            console.log(result.name);
            this.dataService.getMore(result.name)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe((uniqresponse: any) => {
                this.pokemons.push(uniqresponse);
              });
          })
        );
      });
  };
  // tslint:disable-next-line:typedef
  Back() {
    if (this.offset - this.limit + 1 >= 0) {
      this.pokemons = [];
      this.dataService.getP(this.offset = this.offset - this.limit - 1, this.limit)
        .subscribe((response: any) => {
          response.results.forEach(((result: any) => {
              console.log(result.name);
              this.dataService.getMore(result.name)
              // tslint:disable-next-line:no-shadowed-variable
                .subscribe((uniqresponse: any) => {
                  this.pokemons.push(uniqresponse);
                });
            })
          );
        });
    }
  }
  // tslint:disable-next-line:typedef
  Change({value}: { value: any }){
    this.pokemons = [];
    this.dataService.getP(this.offset, this.limit = value)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
            console.log(result.name);
            this.dataService.getMore(result.name)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe((uniqresponse: any) => {
                this.pokemons.push(uniqresponse);
              });
          })
        );
      });
  }
  // tslint:disable-next-line:typedef
  Typesearch({type}: { type: any }){
    this.pokemons = [];
    this.dataService.getP(0, 400)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
            this.dataService.getMore(result.name)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe((uniqresponse: any) => {
                this.pokemons.push(uniqresponse);
                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < this.pokemons.length; i++) {
                  if (this.pokemons[i].types[0].type.name.indexOf(type) > -1) {
                    continue;
                  }
                  else {
                    this.pokemons.splice(i, 1);
                  }
            }
              });
          })
        );
      });

  }
  // tslint:disable-next-line:typedef
  Namehandler({pigeonhole}: { pigeonhole: any }){
    const inputValue = pigeonhole.target.value.toLocaleLowerCase();
    if (inputValue === '' || typeof inputValue === 'undefined'){
      this.pokemons = [];
      this.dataService.getP(this.offset, this.limit)
        .subscribe((response: any) => {
          response.results.forEach(((result: any) => {
              this.dataService.getMore(result.name)
              // tslint:disable-next-line:no-shadowed-variable
                .subscribe((uniqresponse: any) => {
                  this.pokemons.push(uniqresponse);
                });
            })
          );
        });
    }
    else {
      this.pokemonname = inputValue;
    }
  }
  Namesearch(){
    if (typeof this.pokemonname === 'undefined'){
      this.Namehandler({pigeonhole: ''});
    }
    this.pokemons = [];
    this.dataService.getP(0, 400)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
          console.log(result.name);
          console.log(this.pokemonname);
          if (result.name.indexOf(this.pokemonname) > -1){
            this.dataService.getMore(result.name)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe((uniqresponse: any) => {
                this.pokemons.push(uniqresponse);
              });
          }
          else {
            console.log(`${result.name} Не подходит`);
          }
          })
        );
      });
  }
  All(){
    this.pokemons = [];
    this.dataService.getP(this.offset, this.limit)
      .subscribe((response: any) => {
        response.results.forEach(((result: any) => {
            this.dataService.getMore(result.name)
            // tslint:disable-next-line:no-shadowed-variable
              .subscribe((uniqresponse: any) => {
                this.pokemons.push(uniqresponse);
              });
          })
        );
      });
  }

}

