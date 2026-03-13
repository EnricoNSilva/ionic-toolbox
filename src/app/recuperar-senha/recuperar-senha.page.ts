import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';
import { NavController, ToastController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  add,
  mailOutline,
  arrowBackOutline,
  logoIonitron,
} from 'ionicons/icons';
import { blurActiveElement } from '../utils/dom.utils';
import { showTopToast } from '../utils/toast.utils';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonContent,
    CommonModule,
    FormsModule,
    RouterModule,
    IonInput,
  ],
})
export class RecuperarSenhaPage {
  email = '';

  private readonly navCtrl = inject(NavController);
  private readonly toastCtrl = inject(ToastController);

  constructor() {
    addIcons({ arrowBackOutline, logoIonitron, mailOutline, add });
  }

  ionViewWillLeave() {
    blurActiveElement();
  }

  removerFocoAtual() {
    blurActiveElement();
  }

  async enviarRecuperacao() {
    this.removerFocoAtual();

    if (this.email) {
      // Cria a mensagem flutuante (Toast)
      await showTopToast(
        this.toastCtrl,
        'Se o e-mail estiver cadastrado, você receberá um link em instantes.',
        'success',
      );

      // Joga o usuário de volta pra tela de login
      this.navCtrl.navigateBack('/login');
    }
  }
}
