import { supabase } from "$lib/supabaseClient";

type DatabasePhone = {
  price: number;
  entrydate: string;
  prodid: string;
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
    .from('history')
    .select(`
      price,
      entrydate,
      prodid,
      carrier:carrier(name),
      products:prodid(
        brand,
        model,
        storage,
        msrp
      )
    `)
    .order('entrydate', { ascending: false })
    .limit(1000) as { data: DatabasePhone[] | null, error: any };

  // Get latest entry for each prodid and carrier combination
  const latestByProductAndCarrier = data?.reduce((acc, curr) => {
    const key = `${curr.prodid}-${curr.carrier?.name ?? 'unknown'}`;
    if (!acc[key] || new Date(curr.entrydate) > new Date(acc[key].entrydate)) {
      acc[key] = curr;
    }
    return acc;
  }, {} as Record<string, DatabasePhone>);

  const latestEntries = latestByProductAndCarrier ? Object.values(latestByProductAndCarrier) : [];
  const filteredData = latestEntries;

  if (error) {
    console.error('Error fetching data:', error);
    return {
      phones: []
    };
  }

  // Transform the data to a flatter structure
  const phones = filteredData?.map(item => ({
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