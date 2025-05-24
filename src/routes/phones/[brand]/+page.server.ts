import type { PageServerLoad } from './$types';
import { mapDatabasePhoneToUI, phoneQueries } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const { brand } = params;
    
    try {
        // Fetch phones for the specific brand
        const phones = await phoneQueries.getPhonesByBrand(brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase());
        
        return {
            brand,
            title: `${brand} Phones`,
            phones: phones.map(mapDatabasePhoneToUI)
        };
    } catch (e) {
        // If the brand doesn't exist or there's an error, throw a 404
        throw error(404, {
            message: `No phones found for brand: ${brand}`
        });
    }
}; 