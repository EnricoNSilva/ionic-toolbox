import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButton, IonIcon, 
  IonItem, IonInput, IonButtons } 
  from '@ionic/angular/standalone';

import { addIcons } from 'ionicons'; 
import { chevronBack, mapOutline } from 'ionicons/icons';

interface Endereco {
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonButtons, 
    FormsModule, IonInput, IonItem,
    IonHeader, IonToolbar, IonTitle, IonContent,
   IonButton, IonIcon]
})
export class Tab2Page {
  cep: string = '';
  endereco: Endereco | null = null;
  erro: string = '';

  constructor(private http: HttpClient) {addIcons({ chevronBack, mapOutline }); }

  buscarCEP(){
    this.erro = '';
    this.endereco = null;

    // Validar se o CEP foi digitado
    if (!this.cep.trim()) {
      this.erro = 'Por favor, digite um CEP.';
      return;
    }

    // 12345-678 -> 12345678
    const cepLimpo = this.cep.replace(/\D/g, '');

    // Validar se o CEP tem 8 digitos
    if (cepLimpo.length !== 8) {
      this.erro = 'CEP deve conter 8 dígitos.';
      return;
    }

    // Fazer a requisição para a API ViaCEP
    this.http.get<Endereco>(`https://viacep.com.br/ws/${cepLimpo}/json/`).subscribe({
      next: (data) => {
         if ('erro' in data) {
          this.erro = 'CEP não encontrado!';
          this.endereco = null;
        } else {
          this.endereco = data;
          this.erro = '';
        }
      },
      error: () => {
        this.erro = 'Erro ao consultar o CEP. Tente novamente!';
        this.endereco = null;
      }
    });
  }

  // botão de voltar
  voltar() {
    this.cep = '';   // Limpa o campo de CEP
    this.endereco = null; // volta ao estado de busca
    this.erro = '';
  }

  aplicarMascara(event: any) {
    let valor = event.detail.value;

    if (!valor) return;

    valor = valor.replace(/\D/g, '');

    // 5 números, coloca o tracinho
    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    this.cep = valor;
  }
}
