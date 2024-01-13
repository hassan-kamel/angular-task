import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const _messageService = inject(MessageService);

  if (authService.isAuthenticated) {
    _messageService.add({
      severity: 'error',
      summary: 'Unauthorized',
      detail: 'You already logged in',
    });
    router.navigateByUrl('/courses');
  }
  return true;
};
