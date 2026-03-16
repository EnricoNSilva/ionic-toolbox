import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = async (
  _route,
  segments: UrlSegment[],
): Promise<boolean | UrlTree> => {
  const primeiraParte = segments[0]?.path;


  // Guarda apenas o bloco /tabs e libera as rotas publicas.
  if (primeiraParte !== 'tabs') {
    return false;
  }

  const authService = inject(AuthService);
  const router = inject(Router);
  const usuario = await authService.getAuthStateOnce();

  return usuario ? true : router.createUrlTree(['/login']);
};
