import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonImage',
  standalone: true,
})
export class PokemonImagePipe implements PipeTransform {
  transform(value: string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`;
  }
}
