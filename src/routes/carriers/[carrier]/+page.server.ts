import type { PageServerLoad } from './$types';
import { phoneQueries, carrierQueries, mapDatabasePhoneToUI } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const { carrier } = params;
    
    try {
        // Format carrier name (e.g., "telus" -> "Telus")
        const formattedCarrier = carrier.charAt(0).toUpperCase() + carrier.slice(1).toLowerCase();
        // // Get carrier details
        // const carrierDetails = await carrierQueries.getCarrierByName(formattedCarrier);
        
        // Get all phones for this carrier
        const phones = await phoneQueries.getPhonesByCarrier(formattedCarrier);
        
        return {
            carrier: formattedCarrier,
            // carrierDetails,
            phones: phones.map(mapDatabasePhoneToUI),
            title: `${formattedCarrier} Phones`
        };
    } catch (e) {
        // If the carrier doesn't exist or there's an error, throw a 404
        throw error(404, {
            message: `No phones found for carrier: ${carrier}`
        });
    }
};
