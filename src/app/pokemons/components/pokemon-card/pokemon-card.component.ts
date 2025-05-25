import { ChangeDetectionStrategy, Component, effect, input, OnInit } from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonImagePipe } from '../../pipes/pokemon-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [
    PokemonImagePipe,
    RouterLink,
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent implements OnInit {
  pokemon = input.required<Pokemon>();
  // logEffect = effect(() => {
  //   console.log(`Logging: ${this.pokemon().id}.`);
  // });

  ngOnInit() {
  }

}
