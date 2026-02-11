import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonButton, IonIcon 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { backspaceOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonButton, IonIcon],
})
export class Tab1Page {

  display = '0';
  history = ''; // Mostra o ultimo cálculo realizado
  
  primeiroOperador: number | null = null;
  operacao: string | null = null;
  esperarSegundoOperador = false;

  constructor() {
    addIcons({ backspaceOutline });
  }

  adicionarNumero(numero: string) {
    if (this.esperarSegundoOperador) {
      this.display = numero;
      this.esperarSegundoOperador = false;
    } else {
      this.display = this.display === '0' ? numero : this.display + numero;
    }
  }

  adicionarPonto() {
    if (this.esperarSegundoOperador) {
      this.display = '0.';
      this.esperarSegundoOperador = false;
      return;
    }
    if (!this.display.includes('.')) {
      this.display += '.';
    }
  }

  definirOperacao(op: string) {
    if (this.esperarSegundoOperador) {
      // Pega o resultado que está na tela e promove ele a "primeiroOperador"
      if (this.primeiroOperador === null) {
         this.primeiroOperador = parseFloat(this.display);
      }
      
      // Atualiza apenas o operador visual e sai
      this.operacao = op;
      this.history = `${this.primeiroOperador} ${this.operacao}`;
      return;
    }

    // Lógica normal (primeira vez que clica no operador)
    const valorAtual = parseFloat(this.display);

    if (this.primeiroOperador === null) {
      this.primeiroOperador = valorAtual;
    } else if (this.operacao) {
      const result = this.realizarCalculo(this.operacao, this.primeiroOperador, valorAtual);
      this.display = String(parseFloat(result.toPrecision(12))); // Evita problemas de casas decimais
      this.primeiroOperador = result;
    }

    this.operacao = op;
    this.esperarSegundoOperador = true;
    this.history = `${this.primeiroOperador} ${this.operacao}`;
  }

  realizarCalculo(op: string, n1: number, n2: number): number {
    switch (op) {
      case '+': return n1 + n2;
      case '-': return n1 - n2;
      case 'x': return n1 * n2;
      case '/': return n2 !== 0 ? n1 / n2 : 0;
      case '%': return n1/100 * n2; // Ex: 10 % 50 => 10/100 * 50 = 5
      default: return 0;
    }
  }

  calcular() {
    // Só calcula se tivermos operador e número na memória
    if (this.operacao && this.primeiroOperador !== null) {
      const segundoOperador = parseFloat(this.display);
      
      // Atualiza histórico completo da conta"
      this.history = `${this.primeiroOperador} ${this.operacao} ${segundoOperador} =`;

      const result = this.realizarCalculo(this.operacao, this.primeiroOperador, segundoOperador);
      this.display = String(parseFloat(result.toPrecision(12))); // Evita problemas de casas decimais
      // Reseta a memória para o próximo cálculo
      this.primeiroOperador = null;
      this.operacao = null;
      this.esperarSegundoOperador = true;
    }
  }

  calcularPorcentagem() {
    if(!this.display || this.display === '0') return;

    const valorAtual = parseFloat(this.display);
    if (this.primeiroOperador === null) {
      // Se não tiver um número na memória, só converte o número atual para porcentagem ex 50 % => 0.5
       this.display = String(valorAtual / 100);
       return;
    }

    if (this.operacao === '+' || this.operacao === '-') {
      // Se for uma operação de adição ou subtração, calcula a porcentagem em relação ao primeiro operador
      const porcentagem = this.primeiroOperador * (valorAtual / 100);
      this.display = String(porcentagem);
    } else {
      // Para outras operações, calcula a porcentagem normalmente
       this.display = String(valorAtual / 100);
    }

  }

  limpar() {
    this.display = '0';
    this.history = ''; 
    this.primeiroOperador = null;
    this.operacao = null;
    this.esperarSegundoOperador = false;
  }

  inverterSinal() {
    this.display = String(parseFloat(this.display) * -1);
  }

  apagarUltimo() {
    if (this.esperarSegundoOperador) return;
    if (this.display.length > 1) {
      this.display = this.display.slice(0, -1);
    } else {
      this.display = '0';
    }
  }
}