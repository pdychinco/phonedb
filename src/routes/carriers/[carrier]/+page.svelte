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
            {#each phones as phone}
                <div class="card p-4">
                    <h3 class="h3">{phone.name}</h3>
                    <p class="text-surface-500">${phone.price}</p>
                    <div class="mt-4">
                        <a href="/phones/{phone.brand}/{phone.id}" class="btn variant-filled">View Details</a>
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
