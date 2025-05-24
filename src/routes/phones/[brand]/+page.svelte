<script lang="ts">
    // Get the data from the server
    export let data;
    
    // Make the data reactive
    $: brand = data.brand;
    $: title = data.title.charAt(0).toUpperCase() + data.title.slice(1);
    $: phones = data.phones;
    // Log each phone in the array
    
    
</script>

<div class="container mx-auto p-4">
    <h1 class="h1">{title}</h1>
    
    {#if phones && phones.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each [...new Set(phones.map(phone => phone.model))].sort() as model}
                {@const modelPhones = phones.filter(phone => phone.model === model)}
                <div class="card p-4">
                    <h4 class="h4 text-white">{modelPhones[0].brand} {model}</h4>
                    <div class="text-white">
                        {#each modelPhones as phone}
                            <div class="mb-4">
                                <p class="font-bold">{phone.carrier || 'N/A'}</p>
                                <p>Current Price: ${phone.current_price}/mo</p>
                                <p>Lowest Price: ${phone.lowest_price}/mo</p>
                            </div>
                        {/each}
                    </div>
                    <div class="mt-4">
                        <a href="/phones/{brand}/{modelPhones[0].prod_id}" class="btn variant-filled">View Details</a>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="card p-4">
            <p>No phones found for {brand}.</p>
        </div>
    {/if}
</div>

<style>
    /* Add any page-specific styles here */
</style> 