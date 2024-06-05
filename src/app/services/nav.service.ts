import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }

  state = signal(false);
}
