# Autos Abre V10

- El carrusel de marcas ya no depende de una animación CSS.
- Se implementó movimiento continuo mediante `requestAnimationFrame`, por lo que no queda detenido por `prefers-reduced-motion`, caché o reglas CSS globales.
- Velocidad moderada: 20 px/s en escritorio y 16 px/s en móvil.
- El bucle es continuo y sin saltos usando dos grupos idénticos de marcas.
- Se conserva el vehículo adicional en la sección de nuevos ingresos para mantener una cantidad par.
