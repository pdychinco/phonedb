import { supabase } from "$lib/supabaseClient";

// Updated type to match new column names and relationships
// prodid, carrierid, and products/carrier relationships
// entrydate is not present in the new schema, so use latest_entry_date

type DatabasePhone = {
  current_price: number;
  lowest_price: number;
  latest_entry_date: string;
  lowest_entry_date: string;
  prodid: number;
  carrier: { name: string } | null;
  products: {
    brand: string;
    model: string;
    storage: number;
    msrp: number;
  } | null;
};

export async function load() {
  const { data, error } = await supabase
    .from('main')
    .select(`
      current_price,
      lowest_price,
      latest_entry_date,
      lowest_entry_date,
      prod_id,
      carrier:carrier_id(name),
      products:prod_id(
        brand,
        model,
        storage,
        msrp
      )
    `)
    .order('latest_entry_date', { ascending: false })
    .limit(1000) as { data: DatabasePhone[] | null, error: any };

  // Get latest entry for each prodid and carrier combination
  const latestByProductAndCarrier = data?.reduce((acc, curr) => {
    const key = `${curr.prodid}-${curr.carrier?.name ?? 'unknown'}`;
    if (!acc[key] || new Date(curr.latest_entry_date) > new Date(acc[key].latest_entry_date)) {
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
    price: item.current_price,
    lowest_price: item.lowest_price,
    latest_entry_date: item.latest_entry_date,
    lowest_entry_date: item.lowest_entry_date,
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