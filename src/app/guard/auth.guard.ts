import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const token=localStorage.getItem('token');
  if(token){
    return true;
  }
  else{
    const router = new Router();
    router.navigate(['/Login']);
    return false;
  }

  
};
