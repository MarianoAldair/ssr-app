import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PokemonCardComponent } from "../pokemon-card/pokemon-card.component";

@Component({
  selector: 'pokemons-list-skeleton',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './pokemons-list-skeleton.component.html',
  styleUrls: ['./pokemons-list-skeleton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsListSkeletonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
