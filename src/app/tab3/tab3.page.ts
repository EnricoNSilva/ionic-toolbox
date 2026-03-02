import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
} from '@ionic/angular/standalone';

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
  ],
})
export class Tab3Page implements OnInit {
  // Variaveis de estado da interface
  mostrarBusca: boolean = true;
  ultimoScroll: number = 0; 

  // Variáveis de dados API
  characters: any[] = []; // Array que armazena os personagens retornados pela API
  selectedCharacter: any = null; // Armazena o personagem selecionado para exibir detalhes

  // Variáveis de controle geral
  loading = false; // Indica se os dados estão sendo carregados
  error: string = ''; // Armazena mensagens de erro para exibir na interface
  searchTerm: string = ''; // Armazena o termo de busca digitado pelo usuário
  nextUrl: string | null = null; // Armazena a URL da próxima página de resultados para paginação

  // Httpclient é injetado para fazer requisições à API
  constructor(private http: HttpClient) {}

  // Método chamado quando o componente é inicializado (lista os personagens)
  ngOnInit() {
    this.listarPersonagens();
  }

  // Método para listar personagens, opcionalmente filtrando por nome
  listarPersonagens(nome: string = '') {
    this.error = '';
    this.loading = true;
    // URL base para pesquisas
    let url = 'https://rickandmortyapi.com/api/character';

    // Se o usuário digitou um nome, adiciona o parâmetro de busca à URL
    if (nome) {
      url += `?name=${nome}`;
    }

    // Faz a requisição GET para a API
    this.http.get(url).subscribe({
      next: (response: any) => {
        this.characters = response.results || []; // Armazena os personagens retornados pela API
        this.nextUrl = response.info?.next || null; // Armazena a URL da próxima página, ou null se não houver mais páginas
        this.loading = false; // Indica que o carregamento terminou
      },
      error: (error) => {
        // Erro 404 significa que nenhum personagem foi encontrado com o nome pesquisado
        if (error.status === 404) {
          this.characters = [];
          this.error = 'Nenhum personagem encontrado.';
          this.nextUrl = null;
        } else { // Para outros erros, exibe uma mensagem genérica
          console.error('Erro ao buscar personagens:', error);
          this.error = 'Ocorreu um erro ao buscar os personagens.';
        }
        this.loading = false;
      },
    });
  }

  // Método para carregar mais personagens quando o usuário chega ao final da lista (infinite scroll)
  carregarMais(event: any) {
    // Se não existir mais página para carregar, desativamos o infinite scroll e completa o evento
    if (!this.nextUrl) {
      event.target.complete();
      event.target.disabled = true;
      return;
    }

    // Se existir, chamamos a API para a próxima página usando a URL armazenada em nextUrl
    this.http.get(this.nextUrl).subscribe({
      next: (response: any) => {
        // Os "três pontinhos" (spread operator) desmembram o array
        // Basicamente junta a lista que já estava na tela com a lista nova
        this.characters = [...this.characters, ...(response.results || [])];

        // Atualiza a URL do next para a próxima página, ou null se não houver mais páginas
        this.nextUrl = response.info?.next || null;

        // Avisa o componente do Ionic que ele pode parar a animação de "Carregando"
        event.target.complete();
      },
      error: () => {
        event.target.complete();
      },
    });
  }

  // Navegação entre lista e detalhes do personagem
  showDetails(character: any) {
    this.selectedCharacter = character;
  }

  // Eventos de busca e scroll
  onSearch(event: any) {
    this.searchTerm = event?.detail?.value || '';
    this.listarPersonagens(this.searchTerm);
  }

  onScroll(event: any) {
    const atualScroll = event.detail.scrollTop; // Pega a posição atual do scroll

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
