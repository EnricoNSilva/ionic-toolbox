import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonThumbnail, IonLabel, IonButton, IonCard,
  IonCardHeader, IonCardTitle, IonCardContent, IonImg,
  IonSpinner, IonSearchbar, IonButtons, IonIcon, IonInfiniteScroll,
  IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, 
  CommonModule, IonContent, IonList, IonItem, IonImg, IonThumbnail,
  IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonSpinner,
    ],
})
export class Tab3Page implements OnInit {
  // Para a logica de mostrar ou esconder a barra de busca ao rolar a página
  mostrarBusca: boolean = true;
  ultimoScroll: number = 0;
  // Variáveis para armazenar os personagens, o personagem selecionado, estado de carregamento e erros
  characters: any[] = [];
  selectedCharacter: any = null;
  loading = false;
  error: string = '';
  searchTerm: string = '';
  nextUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.listarPersonagens();
  }

  listarPersonagens(nome: string = '') {
    this.error = '';
    this.loading = true;
    // URL base para pesquisas
    let url = 'https://rickandmortyapi.com/api/character';

    if (nome) {
      url += `?name=${nome}`;
    }

    this.http.get(url).subscribe({
      next: (response: any) => {
        this.characters = response.results || []; // bixo ruim do caralho
        this.nextUrl = response.info?.next || null;
        this.loading = false;
      },
      error: (error) => {
        if(error.status === 404) {
          this.characters = [];
          this.error = 'Nenhum personagem encontrado.';           
          this.nextUrl = null;
        } else {
          console.error('Erro ao buscar personagens:', error);
          this.error = 'Ocorreu um erro ao buscar os personagens.';
        }
        this.loading = false;
      }
    });
  }

  carregarMais(event: any) {
    if (!this.nextUrl) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    this.http.get(this.nextUrl).subscribe({  // URL da próxima página
      next: (response: any) => {
        // Os 3 pontinhos (...) desconstroem o array. 
        // Juntando o array atual com os novos resultados da próxima página
        this.characters = [...this.characters, ...(response.results || [])]; 
        
        // Atualiza a URL do next para a próxima página, ou null se não houver mais páginas
        this.nextUrl = response.info?.next || null;
        
        // Sucesso, completa o evento de carregamento
        event.target.complete(); 
      },
      error: () => {
        event.target.complete();
      }
    });
  }

  showDetails(character: any) {
    this.selectedCharacter = character;
  }

  closeDetails() {
    this.selectedCharacter = null;
  }

  // Called from the search input
  onSearch(event: any) {
    this.searchTerm = event?.detail?.value || '';
    this.listarPersonagens(this.searchTerm);
  }

  // filtro computado usado no template
  get filteredCharacters() {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.characters;
    return this.characters.filter(c => (c.name || '').toLowerCase().includes(term));
  }

  onScroll(event: any) {
    const atualScroll = event.detail.scrollTop;

    // Se for para baixo esconde
    if (atualScroll > this.ultimoScroll) {
      this.mostrarBusca = false;
    } // se for para cima mostra
    else {
      this.mostrarBusca = true;
    }
    
    // Salva a posição atual do scroll para a próxima comparação
    this.ultimoScroll = atualScroll;
  }

  voltar() {
    this.selectedCharacter = null;
    this.searchTerm = '';
  }
}
