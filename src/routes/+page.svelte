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
            carrier: phone.carrier,
            entryDate: phone.entrydate
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
    <header>
        <h1>Available Phones</h1>
        <p>Browse our selection of the latest smartphones with flexible payment options</p>
        
        <div class="filters">
            <div class="filter-group">
                <h3>Carriers</h3>
                <div class="filter-buttons">
                    {#each carriers as carrier}
                        {#if carrier}
                            <button 
                                class="filter-button {selectedCarrier === carrier ? 'active' : ''}"
                                on:click={() => handleFilter('carrier', carrier)}
                            >
                                {carrier}
                            </button>
                        {/if}
                    {/each}
                </div>
            </div>

            <div class="filter-group">
                <h3>Brands</h3>
                <div class="filter-buttons">
                    {#each brands as brand}
                        {#if brand}
                            <button 
                                class="filter-button {selectedBrand === brand ? 'active' : ''}"
                                on:click={() => handleFilter('brand', brand)}
                            >
                                {brand}
                            </button>
                        {/if}
                    {/each}
                </div>
            </div>

            {#if selectedBrand}
                <div class="filter-group">
                    <h3>Models</h3>
                    <div class="filter-buttons">
                        {#each availableModels as model}
                            {#if model}
                                <button 
                                    class="filter-button {selectedModel === model ? 'active' : ''}"
                                    on:click={() => handleFilter('model', model)}
                                >
                                    {model}
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}

            {#if selectedModel}
                <div class="filter-group">
                    <h3>Storage</h3>
                    <div class="filter-buttons">
                        {#each availableStorage as storage}
                            {#if storage}
                                <button 
                                    class="filter-button {selectedStorage === parseInt(storage) ? 'active' : ''}"
                                    on:click={() => handleFilter('storage', parseInt(storage))}
                                >
                                    {storage}GB
                                </button>
                            {/if}
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </header>
  
    <main>
        <PhoneGrid phones={filteredPhones} />
    </main>
</div>
  
<style>
    .container {
        min-height: 100vh;
        background: #f8f9fa;
    }
  
    header {
        text-align: center;
        padding: 3rem 1rem;
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

    .filter-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: center;
    }

    .filter-button {
        padding: 0.5rem 1rem;
        border: 1px solid #dee2e6;
        border-radius: 4px;
        background: white;
        color: #495057;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .filter-button:hover {
        background: #e9ecef;
    }

    .filter-button.active {
        background: #007bff;
        color: white;
        border-color: #007bff;
    }
  
    main {
        padding: 2rem 0;
    }
  
    @media (max-width: 640px) {
        header {
            padding: 2rem 1rem;
        }
  
        h1 {
            font-size: 2rem;
        }
  
        p {
            font-size: 1rem;
        }

        .filter-buttons {
            flex-direction: column;
            align-items: center;
        }

        .filter-button {
            width: 100%;
            max-width: 200px;
        }
    }
</style> 