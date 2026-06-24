/**
 * Datos exclusivos para demostración visual; reemplazar al conectar la API.
 * Esta es la colección editorial / cultural — NO inventario comercial.
 */

export interface CollectionItem {
  id: string;
  title: string;
  era: string;
  category: string;
  image: string;
  excerpt: string;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

export const mockCollection: CollectionItem[] = [
  {
    id: "c1",
    title: "Ícono deportivo",
    era: "Década del 90",
    category: "Deportivos clásicos",
    image: img("1494976388531-d1058494cdd8"),
    excerpt:
      "Una silueta que marcó una época. Pieza de inspiración y de estudio para entender el diseño automotriz contemporáneo.",
  },
  {
    id: "c2",
    title: "Ingeniería que hizo historia",
    era: "Mediados del 2000",
    category: "Sedanes deportivos",
    image: img("1503376780353-7e6692767b70"),
    excerpt:
      "Una vitrina de cómo la mecánica accesible puede convertirse en una experiencia de manejo memorable.",
  },
  {
    id: "c3",
    title: "Pasión 4x4",
    era: "Trayectoria off-road",
    category: "Aventura",
    image: img("1533473359331-0135ef1b58bf"),
    excerpt:
      "La cultura todoterreno tiene una identidad propia. Selección editorial dedicada a vehículos que abren caminos reales.",
  },
  {
    id: "c4",
    title: "Era moderna performance",
    era: "Actualidad",
    category: "Deportivos contemporáneos",
    image: img("1552519507-da3b142c6e3d"),
    excerpt: "Tecnología, aerodinámica y emoción combinadas en una nueva generación de máquinas.",
  },
  {
    id: "c5",
    title: "Diseño que perdura",
    era: "Diseño atemporal",
    category: "Clásicos premium",
    image: img("1542362567-b07e54358753"),
    excerpt:
      "Una línea, una proporción, un detalle. Pequeñas decisiones de diseño que sostienen la mirada durante décadas.",
  },
  {
    id: "c6",
    title: "Motor V8",
    era: "Pasión americana",
    category: "Muscle",
    image: img("1494976388531-d1058494cdd8"),
    excerpt:
      "El rugido de un V8 y la cultura que lo rodea. Una pieza editorial sobre comunidad, mecánica y carretera.",
  },
];
