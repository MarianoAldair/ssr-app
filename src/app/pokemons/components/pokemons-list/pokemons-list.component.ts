import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";
import { Pokemon } from '../../interfaces/pokemon.interface';

@Component({
  selector: 'pokemons-list',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemons-list.component.html',
  styleUrls: ['./pokemons-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListComponent implements OnInit {
  pokemons = input.required<Pokemon[]>();

  ngOnInit() {
  }

}
