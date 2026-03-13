import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  ToastController,
  NavController,
} from '@ionic/angular/standalone';
import { logoIonitron } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { blurActiveElement } from '../utils/dom.utils';
import { isValidEmail } from '../utils/validation.utils';
import { showTopToast } from '../utils/toast.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonIcon,
    IonContent,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class LoginPage {
  // Variaveis para armazenar email e senha do usuario
  email = '';
  senha = '';

  private readonly authService = inject(AuthService);
  private readonly navCtrl = inject(NavController);
  private readonly toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ logoIonitron });
  }

  ionViewWillLeave() {
    blurActiveElement();
  }

  removerFocoAtual() {
    blurActiveElement();
  }

  private async exibirErroLogin(mensagem: string) {
    await showTopToast(this.toastCtrl, mensagem, 'danger');
  }

  async login() {
    this.removerFocoAtual();

    if (!this.email || !this.senha) {
      await this.exibirErroLogin('Por favor, preencha e-mail e senha.');
      return;
    }

    if (!isValidEmail(this.email)) {
      await this.exibirErroLogin('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      // Chamando a função do firebase
      await this.authService.login(this.email, this.senha);

      // Se as credenciais estiverem corretas, redireciona para a tela de tabs
      this.navCtrl.navigateForward(['/tabs']);
    } catch (error: any) {
      if (error?.code === 'auth/invalid-credential') {
        await this.exibirErroLogin('E-mail ou senha inválidos.');
        return;
      }

      if (error?.code === 'auth/user-disabled') {
        await this.exibirErroLogin('Esta conta foi desativada.');
        return;
      }

      if (error?.code === 'auth/too-many-requests') {
        await this.exibirErroLogin(
          'Muitas tentativas. Aguarde alguns instantes e tente novamente.',
        );
        return;
      }

      if (error?.code === 'auth/network-request-failed') {
        await this.exibirErroLogin(
          'Falha de conexão. Verifique sua internet e tente novamente.',
        );
        return;
      }

      await this.exibirErroLogin('Erro ao fazer login. Tente novamente.');
      console.error('Erro ao fazer login:', error);
    }
  }
}
