<script lang="ts">
    import PhoneGrid from '$lib/components/PhoneGrid.svelte';

    // Get the data from the server
    export let data;
    const dbPhones = data.phones;

    // Transform database phones to match PhoneGrid component interface
    const phones = dbPhones
        .filter((phone): phone is typeof phone & { 
            brand: string; 
            model: string; 
            storage: number; 
            msrp: number; 
            price: number; 
        } => Boolean(phone.brand && phone.model && phone.storage && phone.msrp && phone.price))
        .map(phone => ({
            name: `${phone.brand} ${phone.model} ${phone.storage}GB`,
            price: phone.price,
            apr: 0, // This could be calculated differently if needed
            retailPrice: phone.msrp,
            savings: phone.msrp - (phone.price * 24), // Example calculation, adjust as needed
            brand: phone.brand,
            carrier: phone.carrier ?? "Unknown",
            entryDate: phone.latest_entry_date
        }));

    // Filter states
    let selectedCarrier: string | null = null;
    let selectedBrand: string | null = null;
    let selectedModel: string | null = null;
    let selectedStorage: number | null = null;

    // Get unique brands and carriers from the actual data
    const brands = [...new Set(phones.map(phone => phone.brand).filter(Boolean))];
    const carriers = [...new Set(phones.map(phone => phone.carrier).filter(Boolean))];
    
    // Get models based on selected brand
    $: availableModels = selectedBrand 
        ? [...new Set(phones
            .filter(phone => phone.brand === selectedBrand)
            .map(phone => {
                const parts = phone.name.split(' ');
                return parts.slice(1, -1).join(' ');
            })
            .filter(Boolean))]
        : [];

    // Get storage options based on selected model
    $: availableStorage = selectedModel
        ? [...new Set(phones
            .filter(phone => {
                const parts = phone.name.split(' ');
                const model = parts.slice(1, -1).join(' ');
                return model === selectedModel;
            })
            .map(phone => phone.name.split(' ').pop()?.replace('GB', ''))
            .filter(Boolean))]
        : [];

    // Filtered phones based on selections
    $: filteredPhones = phones.filter(phone => {
        const matchesCarrier = !selectedCarrier || phone.carrier === selectedCarrier;
        const matchesBrand = !selectedBrand || phone.brand === selectedBrand;
        const matchesModel = !selectedModel || phone.name.split(' ').slice(1, -1).join(' ') === selectedModel;
        const matchesStorage = !selectedStorage || phone.name.split(' ').pop()?.replace('GB', '') === selectedStorage.toString();
        return matchesCarrier && matchesBrand && matchesModel && matchesStorage;
    });

    // Function to handle filter selection
    function handleFilter(type: 'carrier' | 'brand' | 'model' | 'storage', value: string | number) {
        if (type === 'carrier') {
            selectedCarrier = selectedCarrier === value ? null : value as string;
        } else if (type === 'brand') {
            selectedBrand = selectedBrand === value ? null : value as string;
            // Reset model and storage when brand changes
            selectedModel = null;
            selectedStorage = null;
        } else if (type === 'model') {
            selectedModel = selectedModel === value ? null : value as string;
            // Reset storage when model changes
            selectedStorage = null;
        } else if (type === 'storage') {
            selectedStorage = selectedStorage === value ? null : value as number;
        }
    }
</script>
  
<div class="container">
    <div class="content">
        <h1>Available Phones</h1>
        <p>Browse our selection of the latest smartphones with flexible payment options</p>
        
        <div class="filters">
            <div class="filter-group">
                <h3>Carriers</h3>
                <select 
                    class="filter-select"
                    on:change={(e) => handleFilter('carrier', (e.target as HTMLSelectElement).value)}
                    value={selectedCarrier ?? ''}
                >
                    <option value="">All Carriers</option>
                    {#each carriers as carrier}
                        {#if carrier}
                            <option value={carrier}>{carrier}</option>
                        {/if}
                    {/each}
                </select>
            </div>

            <div class="filter-group">
                <h3>Brands</h3>
                <select 
                    class="filter-select"
                    on:change={(e) => handleFilter('brand', (e.target as HTMLSelectElement).value)}
                    value={selectedBrand ?? ''}
                >
                    <option value="">All Brands</option>
                    {#each brands as brand}
                        {#if brand}
                            <option value={brand}>{brand}</option>
                        {/if}
                    {/each}
                </select>
            </div>

            {#if selectedBrand}
                <div class="filter-group">
                    <h3>Models</h3>
                    <select 
                        class="filter-select"
                        on:change={(e) => handleFilter('model', (e.target as HTMLSelectElement).value)}
                        value={selectedModel ?? ''}
                    >
                        <option value="">All Models</option>
                        {#each availableModels as model}
                            {#if model}
                                <option value={model}>{model}</option>
                            {/if}
                        {/each}
                    </select>
                </div>
            {/if}

            {#if selectedModel}
                <div class="filter-group">
                    <h3>Storage</h3>
                    <select 
                        class="filter-select"
                        on:change={(e) => handleFilter('storage', parseInt((e.target as HTMLSelectElement).value))}
                        value={selectedStorage ?? ''}
                    >
                        <option value="">All Storage Options</option>
                        {#each availableStorage as storage}
                            {#if storage}
                                <option value={storage}>{storage}GB</option>
                            {/if}
                        {/each}
                    </select>
                </div>
            {/if}
        </div>
    </div>
  
    <main>
        <PhoneGrid phones={filteredPhones} />
    </main>
</div>
  
<style>
    .container {
        background: #f8f9fa;
        min-height: calc(100vh - 60px); /* Subtract header height */
    }
  
    .content {
        text-align: center;
        padding: 2rem 1rem;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    h1 {
        font-size: 2.5rem;
        color: #2c3e50;
        margin: 0 0 1rem 0;
    }
  
    p {
        font-size: 1.1rem;
        color: #6c757d;
        max-width: 600px;
        margin: 0 auto 2rem;
    }

    .filters {
        max-width: 800px;
        margin: 0 auto;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }

    .filter-group {
        margin-bottom: 1rem;
    }

    .filter-group h3 {
        font-size: 1.1rem;
        color: #2c3e50;
        margin: 0 0 0.5rem 0;
    }

    .filter-select {
        width: 100%;
        max-width: 300px;
        padding: 0.5rem;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        background: white;
        color: #495057;
        cursor: pointer;
        font-size: 1rem;
    }

    .filter-select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
  
    main {
        padding: 2rem 0;
    }
  
    @media (max-width: 640px) {
        .content {
            padding: 1.5rem 1rem;
        }
  
        h1 {
            font-size: 2rem;
        }
  
        p {
            font-size: 1rem;
        }

        .filter-select {
            max-width: 100%;
        }
    }
</style> 