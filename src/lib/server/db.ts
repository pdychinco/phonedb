import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

// Initialize the Supabase client
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

// Phone-related queries
export const phoneQueries = {
    // Get all phones for a specific brand
    getPhonesByBrand: async (brand: string) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('brand', brand);
            
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