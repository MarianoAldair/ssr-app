import { PokemonsService } from './../../pokemons/services/pokemons.service';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { BigPokemon } from '../../pokemons/interfaces/big-pokemon.interface';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  pokemon = signal<BigPokemon|null>(null);
  activatedRoute = inject(ActivatedRoute);
  pokemonsService = inject(PokemonsService);
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    const currentId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.pokemonsService.loadPokemon(currentId).pipe(
      tap(({ name, id }) => {
        this.title.setTitle(name);
        this.meta.updateTag({ name: 'description', content: `${name} Description, (${id})` });
        this.meta.updateTag({ name: 'og:title', content: name });
        this.meta.updateTag({ name: 'og:description', content: `${name} Description, (${id})` })
        this.meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` })
      })
    ).subscribe(resp => {
      this.pokemon.set(resp);
    });
  }
}
