import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Initialize the Supabase client
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type UIMappedPhone = {
    current_price: number;
    lowest_price: number;
    latest_entry_date: string;
    lowest_entry_date: string;
    carrier: string | null;
    brand: string | null;
    model: string | null;
    storage: number | null;
    msrp: number | null;
    prod_id: number;
    savings: number;
};

type DatabasePhone = {
    current_price: number;
    lowest_price: number;
    latest_entry_date: string;
    lowest_entry_date: string;
    prod_id: number;
    carrier: { name: string } | null;
    products: {
      brand: string;
      model: string;
      storage: number;
      msrp: number;
    } | null;
  };

// Phone-related queries
export const phoneQueries = {
    getAllPhones: async () => {
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
            

            if (error) {
                console.error('Error fetching data:', error);
                return {
                phones: []
                };
            }
            return data;
    },
    // Get all phones for a specific brand
    getPhonesByBrand: async (brand: string) => {
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
            .eq('products.brand', brand)
            .order('latest_entry_date', { ascending: false })
            .limit(1000);
            
        if (error) throw error;
        return data;
    },

    // Get phones by carrier
    getPhonesByCarrier: async (carrier: string) => {
        // Get the carrierID based on carrier name
        const { data: carrierData, error: carrierError } = await supabase
            .from('carrier')
            .select('id')
            .eq('name', carrier)
            .single();
            
        if (carrierError) throw carrierError;
        
        // Get products with matching carrierID
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('carrierID', carrierData.id);
            
        if (error) throw error;
        return data;
    },

    // Get a specific phone by ID
    getPhoneById: async (id: string) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        return data;
    },

    // Get all available brands
    getAllBrands: async () => {
        // First get all brands, then filter unique ones in JS
        const { data, error } = await supabase
            .from('products')
            .select('brand')
            .single();
            
        if (error) throw error;
        
        return data;
    }
};

// Carrier-related queries
export const carrierQueries = {
    // Get all carriers
    getAllCarriers: async () => {
        const { data, error } = await supabase
            .from('carrier')
            .select('*');
            
        if (error) throw error;
        return data;
    },

    // Get a specific carrier by name
    getCarrierByName: async (name: string) => {
        const { data, error } = await supabase
            .from('carrier')
            .select('*')
            .eq('name', name)
            .single();
            
        if (error) throw error;
        return data;
    }
};

// Export the Supabase client in case it's needed directly
export { supabase };

export function mapDatabasePhoneToUI(phone: any): UIMappedPhone {
  return {
    brand: phone.brand ?? phone.products?.brand ?? '',
    model: phone.model ?? phone.products?.model ?? '',
    storage: phone.storage ?? phone.products?.storage ?? 0,
    msrp: phone.msrp ?? phone.products?.msrp ?? 0,
    prod_id: phone.prod_id,
    current_price: phone.current_price,
    lowest_price: phone.lowest_price,
    savings: (phone.msrp ?? phone.products?.msrp ?? 0) - (phone.current_price * 24), // adjust as needed
    carrier: phone.carrier?.name ?? (typeof phone.carrier === 'string' ? phone.carrier : 'Unknown'),
    latest_entry_date: phone.latest_entry_date,
    lowest_entry_date: phone.lowest_entry_date
  };
} 