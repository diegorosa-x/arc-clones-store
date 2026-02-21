// src/service/productsService.ts
import { supabase } from "../lib/ClonesDatabase/client";
import type { Product } from "../types/types";

// Se você tiver esses tipos exportados no types.ts, pode importar também.
// Vou inferir do próprio Product pra manter compatível.
type Category = Product["category"];
type Movement = Product["movement"];
type FactoryProduct = NonNullable<Product["factories"]>[number];

type ProductRow = {
  id: string;
  brand: string;
  name: string;
  category: string; // vem do DB como string
  base_price: number;
  msrp: number | null;
  is_clone: boolean;
  movement: string | null; // vem do DB como string
  image: string;
  images: string[] | null;
  description: string | null;
  tags: string[] | null;

  // no DB pode vir json, então tipamos “cru”
  factories: unknown[] | null;
  specs: Product["specs"] | null;
};

const ALLOWED_CATEGORIES: readonly Category[] = [
  "Watches",
  "Handbags",
  "Sunglasses",
  "Jewelry",
] as const;

function isCategory(value: string): value is Category {
  return (ALLOWED_CATEGORIES as readonly string[]).includes(value);
}

function parseCategory(value: string): Category {
  // fallback: se vier algo inesperado, joga pra Watches
  return isCategory(value) ? value : "Watches";
}

const ALLOWED_MOVEMENTS: readonly Exclude<Movement, undefined>[] = [
  "Automático",
  "Quartzo",
  "Manual",
] as const;

function isMovement(value: string): value is Exclude<Movement, undefined> {
  return (ALLOWED_MOVEMENTS as readonly string[]).includes(value);
}

function parseMovement(value: string | null): Movement {
  // Product["movement"] aceita undefined, então fallback seguro é undefined (não string vazia)
  if (!value) return undefined;
  return isMovement(value) ? value : undefined;
}

function isFactoryShape(x: unknown): x is { factory: string; price: number; description?: string } {
  if (!x || typeof x !== "object") return false;
  const obj = x as Record<string, unknown>;
  return typeof obj.factory === "string" && typeof obj.price === "number";
}

function parseFactories(raw: unknown[] | null): FactoryProduct[] {
  if (!raw) return [];

  // Se o seu Product.factories tiver campos diferentes/obrigatórios,
  // ajuste o mapeamento aqui (mas mantendo o retorno como FactoryProduct).
  const parsed: FactoryProduct[] = [];

  for (const item of raw) {
    if (!isFactoryShape(item)) continue;

    parsed.push({
      factory: item.factory,
      price: item.price,
      ...(item.description ? { description: item.description } : {}),
    } as FactoryProduct);
  }

  return parsed;
}

function defaultSpecs(): Product["specs"] {
  // Mantém compatível mesmo se specs for obrigatório.
  // Se seu type exigir chaves fixas, me mande o Product["specs"] que eu monto o default certinho.
  return {} as Product["specs"];
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("base_price", { ascending: true });

  if (error) throw error;

  const rows = (data ?? []) as ProductRow[];

  return rows.map((p): Product => ({
    id: p.id,
    brand: p.brand,
    name: p.name,

    // ✅ string -> union Category
    category: parseCategory(p.category),

    basePrice: p.base_price,
    msrp: p.msrp ?? 0,
    isClone: p.is_clone,

    // ✅ string|null -> union Movement | undefined
    movement: parseMovement(p.movement),

    image: p.image,
    images: p.images ?? [],
    description: p.description ?? "",
    tags: p.tags ?? [],

    // ✅ unknown json -> tipo do Product.factories
    factories: parseFactories(p.factories),

    specs: p.specs ?? defaultSpecs(),
  }));
}