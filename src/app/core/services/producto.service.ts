import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoRequest } from '../../models/producto.model';
import { API_URL } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly url = `${API_URL}/productos`;

  listar(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }

  crear(p: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(this.url, p);
  }

  actualizar(id: number, p: ProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${this.url}/${id}`, p);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
