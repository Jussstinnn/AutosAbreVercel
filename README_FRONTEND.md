# Autos Abre — Frontend público

Frontend público de Autos Abre preparado para integrarse posteriormente con el backend ASP.NET Core de PZ Motors.

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- TanStack React Query
- Lucide React y Sonner

Es una SPA tradicional. No contiene backend, Supabase, Firebase ni panel administrativo.

## Ejecutar localmente

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal.

## Validar y compilar

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run preview
```

La compilación de producción se genera en `dist`.

## Modo de datos: mock o API

Copiá `.env.example` como `.env`:

```env
VITE_DATA_SOURCE=mock
# VITE_API_BASE_URL=https://api.tudominio.com
# VITE_API_CREDENTIALS=same-origin
```

- `mock`: usa los datos locales de demostración.
- `api`: utiliza los adaptadores HTTP preparados para el backend real.

La selección se realiza únicamente en `src/services/index.ts`. Las páginas y los componentes no importan mocks ni hacen `fetch` directamente.

## Arquitectura relevante

```text
src/
  App.tsx                         Rutas públicas de React Router
  config/siteConfig.ts           Contacto, ubicación, redes y horario
  types/                          Contratos TypeScript
  data/                           Inventario y colección mock
  services/
    contracts/                    Interfaces de servicios
    mock/                         Implementaciones para la demo
    http/                         Implementaciones para ASP.NET Core
    index.ts                      Selector mock/API
  hooks/                          Consultas con React Query
  components/
    home/                         Hero, buscador y carrusel de marcas
    vehicle/                      Tarjetas y calculadora financiera
    layout/                       Navbar, footer y estructura general
  pages/                          Vistas públicas
```

## Rutas públicas

- `/`
- `/inventario`
- `/vehiculo/:id`
- `/coleccion`
- `/financiamiento`
- `/vender`
- `/nosotros`
- `/contacto`
- `/vendidos`
- `/politica-de-privacidad`
- `/terminos-de-uso`

## Contratos HTTP previstos

```text
GET  /api/vehicles/featured?take=8
GET  /api/vehicles?<filtros>
GET  /api/vehicles/:id
GET  /api/vehicles/:id/related?take=4
POST /api/leads
POST /api/leads/tradein
```

Filtros previstos para `/api/vehicles`:

```text
q, brand, category, yearFrom, yearTo, minUsd, maxUsd,
transmission, status, take, skip
```

## Integración con PZ Motors

1. Conservá el backend ASP.NET Core, la base de datos y el panel administrativo de PZ Motors.
2. Incorporá este frontend como su nuevo `ClientApp` público.
3. Configurá `VITE_DATA_SOURCE=api`.
4. Cuando frontend y API se sirvan desde dominios distintos, configurá `VITE_API_BASE_URL` y CORS.
5. Confirmá que los DTO del backend coincidan con `src/types` y ajustá únicamente los adaptadores de `src/services/http` si fuera necesario.
6. En ASP.NET Core habilitá el fallback de SPA hacia `index.html` para que rutas como `/inventario` y `/vehiculo/1001` funcionen al actualizar.

## Despliegue estático

El proyecto incluye:

- `vercel.json` para Vercel.
- `public/_redirects` para plataformas compatibles con redirects tipo Netlify.

Ambos redirigen las rutas de la SPA a `index.html`.

## Configuración comercial

Editá solamente `src/config/siteConfig.ts` para cambiar:

- Teléfonos y WhatsApp.
- Dirección.
- Instagram.
- Waze y Google Maps.
- Horarios.

El horario está desactivado hasta que Autos Abre confirme el dato oficial.

## Imágenes

- Los logos del carrusel están en `src/assets/brands`.
- El inventario mock utiliza imágenes externas centralizadas en `src/data/mockVehicles.ts`.
- Al conectar el backend, las imágenes reales serán resueltas por la capa HTTP.

## Alcance

- Frontend público solamente.
- Sin `/admin`.
- Sin credenciales privadas.
- Sin datos financieros sensibles.
