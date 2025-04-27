import { supabase } from "$lib/supabaseClient";

type DatabasePhone = {
  price: number;
  entrydate: string;
  carrier: { name: string } | null;
  products: {
    brand: string;
    model: string;
    storage: number;
    msrp: number;
  } | null;
}

export async function load() {
  const { data, error } = await supabase
    .from('main')
    .select(`
      price,
      entrydate,
      carrier:carrier(name),
      products:prodid(
        brand,
        model,
        storage,
        msrp
      )
    `) as { data: DatabasePhone[] | null, error: any };

  if (error) {
    console.error('Error fetching data:', error);
    return {
      phones: []
    };
  }

  // Transform the data to a flatter structure
  const phones = data?.map(item => ({
    price: item.price,
    entrydate: item.entrydate,
    carrier: item.carrier?.name ?? null,
    brand: item.products?.brand ?? null,
    model: item.products?.model ?? null,
    storage: item.products?.storage ?? null,
    msrp: item.products?.msrp ?? null
  })) ?? [];

  return {
    phones
  };
} 