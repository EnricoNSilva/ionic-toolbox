import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  Subject,
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  IonContent,
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonSpinner,
  IonSearchbar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';

import { ProfilePopoverComponent } from '../components/profile-popover/profile-popover.component';
import { ProfileMenuBase } from '../utils/profile-menu.base';

interface CharacterLocation {
  name: string;
}

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: CharacterLocation;
  location: CharacterLocation;
  episode: string[];
}

interface CharactersApiInfo {
  next: string | null;
}

interface CharactersApiResponse {
  info: CharactersApiInfo;
  results: Character[];
}

interface SearchResultState {
  response: CharactersApiResponse | null;
  error: HttpErrorResponse | null;
}

type SearchInputEvent = CustomEvent<{ value?: string | null }>;
type ContentScrollEvent = CustomEvent<{ scrollTop: number }>;
type InfiniteScrollEvent = CustomEvent & {
  target: HTMLIonInfiniteScrollElement;
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonSearchbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    IonContent,
    IonList,
    IonItem,
    IonImg,
    IonThumbnail,
    IonLabel,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    ProfilePopoverComponent,
  ],
})
export class Tab3Page extends ProfileMenuBase implements OnInit, OnDestroy {
  private readonly http = inject(HttpClient);

  // Estado visual da lista
  isSearchVisible = true;
  lastScrollTop = 0;

  // Dados exibidos na tela
  characters: Character[] = [];
  selectedCharacter: Character | null = null;

  // Controle de carregamento, erro e paginação
  loading = false;
  loadingMore = false;
  error = '';
  searchTerm = '';
  nextUrl: string | null = null;
  private buscaSubscription: Subscription | null = null;
  private readonly searchTerm$ = new Subject<string>();

  ngOnInit() {
    this.inicializarBuscaReativa();
    this.searchTerm$.next('');
  }

  ngOnDestroy() {
    this.buscaSubscription?.unsubscribe();
  }

  private inicializarBuscaReativa() {
    this.buscaSubscription = this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.error = '';
          this.loading = true;
          this.nextUrl = null;
        }),
        switchMap((nome) => {
          const url = this.montarUrlBusca(nome);
          return this.http.get<CharactersApiResponse>(url).pipe(
            map((response): SearchResultState => ({ response, error: null })),
            catchError((error: HttpErrorResponse) =>
              of({ response: null, error }),
            ),
          );
        }),
      )
      .subscribe(({ response, error }: SearchResultState) => {
        if (error) {
          this.characters = [];
          this.nextUrl = null;

          if (error.status === 404) {
            this.error = 'Nenhum personagem encontrado.';
          } else {
            console.error('Erro ao buscar personagens:', error);
            this.error = 'Ocorreu um erro ao buscar os personagens.';
          }

          this.loading = false;
          return;
        }

        this.characters = response?.results || [];
        this.nextUrl = response?.info?.next || null;
        this.loading = false;
      });
  }

  private montarUrlBusca(nome: string): string {
    const baseUrl = 'https://rickandmortyapi.com/api/character';
    const termo = nome.trim();

    if (!termo) {
      return baseUrl;
    }

    return `${baseUrl}?name=${encodeURIComponent(termo)}`;
  }

  // Método para carregar mais personagens quando o usuário chega ao final da lista (infinite scroll)
  carregarMais(event: InfiniteScrollEvent) {
    if (this.loadingMore) {
      event.target.complete();
      return;
    }

    if (!this.nextUrl) {
      event.target.complete();
      return;
    }

    this.loadingMore = true;

    // Se existir, chamamos a API para a próxima página usando a URL armazenada em nextUrl
    this.http.get<CharactersApiResponse>(this.nextUrl).subscribe({
      next: (response) => {
        // Os "três pontinhos" (spread operator) desmembram o array
        // Basicamente junta a lista que já estava na tela com a lista nova
        this.characters = [...this.characters, ...(response.results || [])];

        // Atualiza a URL do next para a próxima página, ou null se não houver mais páginas
        this.nextUrl = response.info?.next || null;

        // Avisa o componente do Ionic que ele pode parar a animação de "Carregando"
        this.loadingMore = false;
        event.target.complete();
      },
      error: () => {
        this.loadingMore = false;
        event.target.complete();
      },
    });
  }

  // Navegação entre lista e detalhes do personagem
  showDetails(character: Character) {
    this.selectedCharacter = character;
  }

  trackByCharacterId(_: number, character: Character): number {
    return character.id;
  }

  // Eventos de busca e scroll
  onSearch(event: SearchInputEvent) {
    this.searchTerm = event?.detail?.value || '';
    this.searchTerm$.next(this.searchTerm);
  }

  onClear() {
    this.searchTerm = '';
    this.searchTerm$.next('');
  }

  onScroll(event: ContentScrollEvent) {
    const currentScrollTop = event.detail.scrollTop;

    this.isSearchVisible = currentScrollTop <= this.lastScrollTop;

    this.lastScrollTop = currentScrollTop;
  }

  voltar() {
    this.selectedCharacter = null;
  }
}
