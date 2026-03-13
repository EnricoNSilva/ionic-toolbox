import { inject } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { closePopover, openPopoverFromEvent, PopoverState } from './dom.utils';
import { blurActiveElement } from './dom.utils';

export abstract class ProfileMenuBase {
  protected readonly authService = inject(AuthService);
  protected readonly navCtrl = inject(NavController);

  nomeUsuario = '';
  emailUsuario = '';
  profilePopover: PopoverState = closePopover();

  ionViewWillEnter() {
    const perfil = this.authService.obterPerfilUsuario();
    this.nomeUsuario = perfil.nome;
    this.emailUsuario = perfil.email;
  }

  ionViewWillLeave() {
    this.fecharPopoverPerfil();
    blurActiveElement();
  }

  abrirPopoverPerfil(event: Event) {
    this.profilePopover = openPopoverFromEvent(event);
  }

  fecharPopoverPerfil() {
    this.profilePopover = closePopover();
  }

  async sairDaConta() {
    try {
      this.fecharPopoverPerfil();
      await this.authService.logout();
      this.navCtrl.navigateRoot('/login');
    } catch (error) {
      console.error('Erro ao sair da conta:', error);
    }
  }
}
