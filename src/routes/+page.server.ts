import { phoneQueries, mapDatabasePhoneToUI } from "$lib/server/db";

// Updated type to match new column names and relationships
// prodid, carrierid, and products/carrier relationships
// entrydate is not present in the new schema, so use latest_entry_date



export async function load() {
  const result  = await phoneQueries.getAllPhones();
  const phones = Array.isArray(result) ? result : [];

  // Transform the data to a flatter structure
  const data = phones?.map(mapDatabasePhoneToUI) ?? [];

  return {
    data
  };
} 