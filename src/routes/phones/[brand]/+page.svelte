<script lang="ts">
    import { page } from '$app/stores';
    
    // Get the data from the server
    export let data;
    
    // Make the data reactive
    $: brand = data.brand;
    $: title = data.title;
    $: phones = data.phones;
    
    
</script>

<div class="container mx-auto p-4">
    <h1 class="h1">{title}</h1>
    
    {#if phones && phones.length > 0}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {#each phones as phone}
                <div class="card p-4">
                    <h2 class="h2">{phone}</h2>
                    <p class="text-surface-500">${phone.current_price}/mo</p>
                    <div class="mt-4">
                        <a href="/phones/{brand}/{phone.prod_id}" class="btn variant-filled">View Details</a>
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