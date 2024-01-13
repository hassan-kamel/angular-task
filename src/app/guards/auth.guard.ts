import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const _messageService = inject(MessageService);

  if (!authService.isAuthenticated) {
    _messageService.add({
      severity: 'error',
      summary: 'Unauthorized',
      detail: 'You have to be logged in',
    });
    router.navigateByUrl('/login');
  }
  return true;
};
