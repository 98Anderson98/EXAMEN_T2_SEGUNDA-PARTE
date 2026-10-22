import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  readonly loading = signal(false);
  readonly error = signal('');

  submit(): void {
    if (!this.username.trim() || !this.password) {
      this.error.set('Ingresa usuario y contraseña');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.auth.login({ username: this.username.trim(), password: this.password }).subscribe({
      next: () => this.router.navigate(['/productos']),
      error: (e) => {
        this.loading.set(false);
        this.error.set(
          e.status === 0
            ? 'No se pudo conectar con el servidor'
            : 'Usuario o contraseña incorrectos',
        );
      },
    });
  }
}
