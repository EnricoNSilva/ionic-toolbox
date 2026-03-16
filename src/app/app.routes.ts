import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    canMatch: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'cadastro',
    loadComponent: () =>
      import('./cadastro/cadastro.page').then((m) => m.CadastroPage),
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./recuperar-senha/recuperar-senha.page').then(
        (m) => m.RecuperarSenhaPage,
      ),
  },
  {
    path: 'trocar-senha',
    loadComponent: () =>
      import('./recuperar-senha/recuperar-senha.page').then(
        (m) => m.RecuperarSenhaPage,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
