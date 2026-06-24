# Autos Abre — Correcciones V3

## Hero y buscador
- Se corrigió el espacio del banner para que el título, la descripción, los botones y el buscador no se superpongan.
- En móvil, el buscador ahora aparece después del hero y no encima de los botones.
- El título usa tamaños fluidos y saltos de línea controlados.
- El buscador se reorganizó en dos filas proporcionadas en escritorio.
- En móvil, los campos siguen un orden natural y el botón de búsqueda siempre queda al final y a ancho completo.
- Se mantuvo el autocompletado por marca, modelo y año.

## Carrusel de marcas
- Se redujo considerablemente la velocidad para que los logos puedan identificarse.
- Movimiento continuo sin saltos mediante pista duplicada.
- Pausa automática al colocar el cursor o enfocar un logo.
- Velocidad adaptada para escritorio y móvil.

## Ofertas y tarjetas
- Nueva ruta pública `/ofertas`.
- Nueva sección de ofertas en la página principal.
- Acceso a ofertas desde el menú, el inventario y el footer.
- Soporte para precio anterior y porcentaje de ahorro.
- Badges rediseñados para nuevo ingreso, oferta, reservado y vendido.
- Chips mejorados para financiamiento y recepción de vehículo.
- Las tarjetas en oferta ahora tienen una jerarquía visual diferenciada.

## Menú móvil
- Se reconstruyó el menú hamburguesa usando un panel independiente sobre toda la pantalla.
- Se puede cerrar con el botón X, tocando el fondo, seleccionando una ruta o presionando Escape.
- Bloquea correctamente el scroll de la página mientras está abierto.

## Compatibilidad
- Se conservaron los servicios mock/API y los contratos preparados para ASP.NET Core.
- No se agregó backend, base de datos ni Supabase.
- Se validó la sintaxis TS/TSX y la resolución de imports internos.
