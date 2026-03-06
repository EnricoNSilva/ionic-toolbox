import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { logoIonitron, arrowBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
  ],
})
export class CadastroPage implements OnInit {
  constructor() {
    addIcons({ logoIonitron, arrowBackOutline });
  }

  ngOnInit() {}
}
