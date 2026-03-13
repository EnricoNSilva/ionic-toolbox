import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonIcon, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline, keyOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonPopover],
})
export class ProfilePopoverComponent {
  @Input() nomeUsuario = '';
  @Input() emailUsuario = '';
  @Input() isOpen = false;
  @Input() event: Event | undefined;

  @Output() abrirPopover = new EventEmitter<Event>();
  @Output() fecharPopover = new EventEmitter<void>();
  @Output() sairConta = new EventEmitter<void>();

  constructor() {
    addIcons({ personCircleOutline, keyOutline, logOutOutline });
  }

  onAbrirPopover(event: Event) {
    this.abrirPopover.emit(event);
  }

  onFecharPopover() {
    this.fecharPopover.emit();
  }

  onSairConta() {
    this.sairConta.emit();
  }
}
