import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../models/interfaces';
import { NotificationServiceService } from '../../services/notification-service.service';


export const isAuthenticatedGuard: CanActivateFn =(route, state) => {


  const authService = inject(AuthService);
  const router      = inject(Router)
  const notficationService = inject(NotificationServiceService);

  authService.checkAuthStatus().subscribe((res) => {
    if(res == true){

      router.navigateByUrl('/player');
    }
      
     
    
  })


  return true;
};
