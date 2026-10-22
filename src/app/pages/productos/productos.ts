import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductoService } from '../../core/services/producto.service';
import { Producto, ProductoRequest } from '../../models/producto.model';

const VACIO: ProductoRequest = {
  nombre: '',
  categoria: '',
  precio: 0,
  stock: 0,
  marca: '',
  codigoBarras: '',
};

@Component({
  selector: 'app-productos',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {
  private readonly service = inject(ProductoService);

  readonly productos = signal<Producto[]>([]);
  readonly filtro = signal('');
  readonly loading = signal(false);
  readonly mensaje = signal<{ tipo: 'ok' | 'error'; texto: string } | null>(null);

  readonly filtrados = computed(() => {
    const f = this.filtro().toLowerCase().trim();
    if (!f) return this.productos();
    return this.productos().filter((p) =>
      [p.nombre, p.categoria, p.marca, p.codigoBarras].some((v) => v.toLowerCase().includes(f)),
    );
  });

  // Estado del modal de formulario
  readonly modalAbierto = signal(false);
  readonly editandoId = signal<number | null>(null);
  form: ProductoRequest = { ...VACIO };
  readonly guardando = signal(false);

  // Estado del modal de eliminación
  readonly porEliminar = signal<Producto | null>(null);

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading.set(true);
    this.service.listar().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.loading.set(false);
      },
      error: (e) => {
        this.loading.set(false);
        this.error(e, 'No se pudieron cargar los productos');
      },
    });
  }

  nuevo(): void {
    this.editandoId.set(null);
    this.form = { ...VACIO };
    this.modalAbierto.set(true);
  }

  editar(p: Producto): void {
    this.editandoId.set(p.id);
    const { id, ...resto } = p;
    this.form = { ...resto };
    this.modalAbierto.set(true);
  }

  cerrarModal(): void {
    this.modalAbierto.set(false);
  }

  guardar(): void {
    this.guardando.set(true);
    const id = this.editandoId();
    const peticion = id === null ? this.service.crear(this.form) : this.service.actualizar(id, this.form);
    peticion.subscribe({
      next: () => {
        this.guardando.set(false);
        this.modalAbierto.set(false);
        this.ok(id === null ? 'Producto creado correctamente' : 'Producto actualizado correctamente');
        this.cargar();
      },
      error: (e) => {
        this.guardando.set(false);
        this.error(e, 'No se pudo guardar el producto');
      },
    });
  }

  confirmarEliminar(p: Producto): void {
    this.porEliminar.set(p);
  }

  eliminar(): void {
    const p = this.porEliminar();
    if (!p) return;
    this.service.eliminar(p.id).subscribe({
      next: () => {
        this.porEliminar.set(null);
        this.ok('Producto eliminado correctamente');
        this.cargar();
      },
      error: (e) => {
        this.porEliminar.set(null);
        this.error(e, 'No se pudo eliminar el producto');
      },
    });
  }

  private ok(texto: string): void {
    this.mensaje.set({ tipo: 'ok', texto });
    setTimeout(() => this.mensaje.set(null), 3500);
  }

  private error(e: any, porDefecto: string): void {
    let texto = porDefecto;
    if (e.status === 403) texto = 'No tienes permisos (se requiere rol ADMIN)';
    else if (e.status === 0) texto = 'No se pudo conectar con el servidor';
    else if (e.error?.message) texto = e.error.message;
    this.mensaje.set({ tipo: 'error', texto });
    setTimeout(() => this.mensaje.set(null), 5000);
  }
}
