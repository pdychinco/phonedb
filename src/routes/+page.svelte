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
            finance: number 
        } => Boolean(phone.brand && phone.model && phone.storage && phone.msrp && phone.finance))
        .map(phone => ({
            name: `${phone.brand} ${phone.model} ${phone.storage}GB`,
            monthlyPrice: phone.finance,
            downPayment: 0, // This could be calculated differently if needed
            apr: 0, // This could be calculated differently if needed
            retailPrice: phone.msrp,
            savings: phone.msrp - (phone.finance * 24), // Example calculation, adjust as needed
            brand: phone.brand,
            carrier: phone.carrier
        }));

    // Filter states
    let selectedCarrier: string | null = null;
    let selectedBrand: string | null = null;

    // Get unique brands and carriers from the actual data
    const brands = [...new Set(phones.map(phone => phone.brand).filter(Boolean))];
    const carriers = [...new Set(phones.map(phone => phone.carrier).filter(Boolean))];

    // Filtered phones based on selections
    $: filteredPhones = phones.filter(phone => {
        const matchesCarrier = !selectedCarrier || phone.carrier === selectedCarrier;
        const matchesBrand = !selectedBrand || phone.brand === selectedBrand;
        return matchesCarrier && matchesBrand;
    });

    // Function to handle filter selection
    function handleFilter(type: 'carrier' | 'brand', value: string) {
        if (type === 'carrier') {
            selectedCarrier = selectedCarrier === value ? null : value;
        } else {
            selectedBrand = selectedBrand === value ? null : value;
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