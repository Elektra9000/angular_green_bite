import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fruit {
  name: string;
  image?: string; // ✅ aggiunto

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
  private base = '/api/fruit';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>(`${this.base}/all`);
  }

  getByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.base}/${encodeURIComponent(name)}`);
  }
}
