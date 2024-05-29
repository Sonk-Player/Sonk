
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { YtApiServiceService } from './ytApi-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor(private ytService: YtApiServiceService) { }

setLoading(loading: boolean, url: string): void {
  if (!url) {
    throw new Error('The request URL must be provided to the LoadingService.setLoading function');
  }
  if (loading === true) {
    if (this.loadingMap.size === 0) {
      this.loadingSub.next(true);
    }
    this.loadingMap.set(url, loading);
  } else if (loading === false && this.loadingMap.has(url)) {
    this.loadingMap.delete(url);
    if (this.loadingMap.size === 1) {
      this.ytService.checkStatus()
    }
  }
}
}
