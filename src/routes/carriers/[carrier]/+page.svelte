<script lang="ts">
    // Get the data from the server
    export let data;
    
    // Make the data reactive
    $: carrier = data.carrier;
    $: phones = data.phones;
    $: title = data.title;
</script>

<div class="container mx-auto p-4">
    <h1 class="h1">{title}</h1>
    
    {#if phones && phones.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each [...new Set(phones.map(phone => phone.brand))].sort() as brand}
                {@const modelPhones = phones.filter(phone => phone.brand === brand)}
                <div class="card p-4">
                    <h4 class="h4 text-white pb-4">{modelPhones[0].brand}</h4>
                    <div class="text-white">
                        {#each modelPhones as phone}
                            <div class="mb-4">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <p class="font-bold">{phone.model || 'N/A'}</p>
                                        <p>Current Price: ${phone.current_price}/mo</p>
                                        <p>Lowest Price: ${phone.lowest_price}/mo</p>
                                    </div>
                                    <a href="/phones/{brand}/{phone.prod_id}" class="btn variant-filled text-sm">View Details</a>
                                </div>
                            </div>
                        {/each}
                    </div>
                    
                </div>
            {/each}
        </div>
    {:else}
        <div class="card p-4">
            <p>No phones found for {carrier}.</p>
        </div>
    {/if}
</div>

<style>
    /* Add any page-specific styles here */
</style>
