import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonsListComponent } from '../../pokemons/components/pokemons-list/pokemons-list.component';
import { PokemonsListSkeletonComponent } from "../../pokemons/components/pokemons-list-skeleton/pokemons-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { debug } from 'console';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
    imports: [
    CommonModule,
    PokemonsListComponent,
    PokemonsListSkeletonComponent,
],
    templateUrl: './pokemons-page.component.html',
    standalone: true,
    styleUrls: ['./pokemons-page.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  pokemonsService = inject(PokemonsService);
  pokemons = signal<Pokemon[]>([]);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  currentPage = toSignal<number>(this.activatedRoute.queryParamMap.pipe(
    map(params => params.get('page') ?? '1'),
    map(page => (isNaN(+page) ? 1 : +page)),
    map(page => Math.max(1, page))
  ));
  private title = inject(Title);
  private meta = inject(Meta);
  // isLoading = signal<boolean>(true);
  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe(resp => {
  //   console.log(resp);
  // });

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
    // this.title.setTitle('Pokémons Page');
    this.meta.updateTag({ name: 'description', content: 'Pokémons Page Description' });
    this.loadPokemons();
  }

  loadPokemons(nextPage: number = 0) {
    const currentPage = this.currentPage()! + nextPage;
    this.pokemonsService.loadPage(currentPage).pipe(
      tap(() => this.router.navigate([], { queryParams: { page: currentPage } })),
      tap(() => this.title.setTitle(`Pokémons - Page ${ currentPage }`))
    ).subscribe(resp => {
      this.pokemons.set(resp);
    });
  }

}
