import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCollectorService {

  product: any = {};
  isEdit: boolean;
  constructor() {

  }

}
