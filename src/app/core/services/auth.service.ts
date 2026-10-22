import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginRequest } from '../../models/auth.model';

export const API_URL = 'http://localhost:8080/api';
const TOKEN_KEY = 'ecommerce_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  readonly isLoggedIn = computed(() => this.isTokenValid(this.tokenSignal()));
  readonly username = computed(() => this.decode(this.tokenSignal())?.['sub'] ?? '');

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${API_URL}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this.tokenSignal.set(res.token);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.tokenSignal.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private decode(token: string | null): Record<string, any> | null {
    if (!token) return null;
    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  private isTokenValid(token: string | null): boolean {
    const exp = this.decode(token)?.['exp'];
    return !!exp && exp * 1000 > Date.now();
  }
}
