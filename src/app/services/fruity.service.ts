import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

export interface Fruit {
  name: string;
  image?: string;
  genus?: string;
  family?: string;
  order?: string;
  nutritions?: {
    calories: number;
    sugar: number;
    fat: number;
    carbohydrates: number;
    protein: number;
  };
}

@Injectable({ providedIn: 'root' })
export class FruityService {
  private base = environment.apiUrl; // https://www.fruityvice.com

  constructor(private http: HttpClient) {}

  getAll(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.base}/fruit/all`);
  }

  getByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.base}/fruit/${encodeURIComponent(name)}`);
  }
}
