import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { Pokemon } from "../interfaces/pokemon.interface";
import { APIResponse } from "../interfaces/api-response.interface";
import { BigPokemon } from "../interfaces/big-pokemon.interface";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  public loadPage(pageNumber: number): Observable<Pokemon[]> {
    // if(pageNumber <= 0) return;
    if(pageNumber !== 0 ) {
      pageNumber--;
    }

    pageNumber = Math.max(0, pageNumber);

    return this.httpClient.get<APIResponse>(`${this.baseUrl}?offset=${pageNumber * 20}&limit=20`, {
      params: {
        page: pageNumber
      },
    }).pipe(
      map(resp => {
        const pokemons: Pokemon[] = resp.results.map(pokemon => ({
          id: pokemon.url.split('/').at(-2) ?? '',
          name: pokemon.name,
        }))

        return pokemons;
      }),
      // tap(resp => console.log(resp))
    );
  }

  public loadPokemon(id: string): Observable<BigPokemon> {
    return this.httpClient.get<BigPokemon>(`${this.baseUrl}/${id}`);
  }
}
