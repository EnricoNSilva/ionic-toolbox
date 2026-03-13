import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonIcon,
  IonInput,
  IonButton,
  NavController,
  ToastController,
} from '@ionic/angular/standalone';
import { logoIonitron, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from '../services/auth.service';
import { blurActiveElement } from '../utils/dom.utils';
import { isValidEmail } from '../utils/validation.utils';
import { showTopToast } from '../utils/toast.utils';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
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
export class CadastroPage {
  email = '';
  senha = '';
  confirmarSenha = '';

  private readonly authService = inject(AuthService);
  private readonly navCtrl = inject(NavController);
  private readonly toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ logoIonitron, arrowBackOutline });
  }

  ionViewWillLeave() {
    blurActiveElement();
  }

  removerFocoAtual() {
    blurActiveElement();
  }

  async cadastrar() {
    this.removerFocoAtual();

    if (!this.email || !this.senha || !this.confirmarSenha) {
      await showTopToast(
        this.toastCtrl,
        'Por favor, preencha todos os campos.',
        'danger',
      );
      return;
    }

    if (!isValidEmail(this.email)) {
      await showTopToast(
        this.toastCtrl,
        'Por favor, insira um e-mail válido.',
        'danger',
      );
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      await showTopToast(this.toastCtrl, 'As senhas não coincidem.', 'danger');

      console.error('As senhas não coincidem.');
      return;
    }

    try {
      await this.authService.register(this.email, this.senha);

      // Mantem o mesmo comportamento do login ao entrar no app.
      this.navCtrl.navigateForward(['/tabs']);
    } catch (error: any) {
      if (error?.code === 'auth/email-already-in-use') {
        await showTopToast(
          this.toastCtrl,
          'Este e-mail já está em uso.',
          'danger',
        );
        return;
      }

      // Tratando senha fraca
      if (error?.code === 'auth/weak-password') {
        await showTopToast(
          this.toastCtrl,
          'A senha deve ter pelo menos 6 caracteres.',
          'danger',
        );
        return;
      }

      // Erros gerais de cadastro
      await showTopToast(
        this.toastCtrl,
        'Erro ao cadastrar usuário.',
        'danger',
      );

      console.error('Erro ao cadastrar usuário:', error);
    }
  }
}
