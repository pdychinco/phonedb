<script lang="ts">
  export let phone: {
    name: string;
    current_price: number;
    lowest_price: number;
    apr: number;
    retailPrice: number;
    savings: number;
    carrier: string;
    latest_entry_date: string;
    lowest_entry_date: string;
  };

  // Compute dynamic background color for savings
  $: savingsBg = phone.savings < 0
    ? '#ffebee' // red background for negative
    : phone.savings > 0
      ? '#e8f5e9' // green background for positive
      : '#f8f9fa'; // neutral for zero
  
  $: savingsValue = phone.savings < 0
  ? 'red'
  : phone.savings > 0
    ? 'green'
    : 'black';
</script>

<div class="phone-card">
  <div class="header">
    <h2 class="phone-name">{phone.name}</h2>
    <p class="carrier">{phone.carrier}</p>
  </div>
  <div class="price-details">
    <div class="price-item">
      <span class="label">Starting Device Price</span>
      <span class="value">${phone.current_price.toFixed(2)}/mo</span>
    </div>
    <div class="price-item">
      <span class="label">Retail Price</span>
      <span class="value">${phone.retailPrice.toFixed(2)}</span>
    </div>
    <div class="price-item savings" style="background: {savingsBg};">
      <span class="label">Savings</span>
      <span class="value savings-value" style="color: {savingsValue};">${phone.savings.toFixed(2)}</span>
    </div>
    <div class="price-item">
      <span class="label">Lowest Price</span>
      <span class="value">${phone.lowest_price.toFixed(2)}</span>
      <span class="date">Recorded: {new Date(phone.lowest_entry_date).toLocaleDateString()}</span>
    </div>
  </div>
  <div class="footer">
    <span class="date">Last Updated: {new Date(phone.latest_entry_date).toLocaleDateString()}</span>
  </div>
</div>

<style>
  .phone-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 1rem;
    transition: transform 0.2s ease;
    position: relative;
  }

  .phone-card:hover {
    transform: translateY(-4px);
  }

  .header {
    margin-bottom: 1rem;
  }

  .phone-name {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }

  .carrier {
    font-size: 1rem;
    color: #6c757d;
    margin: 0;
  }

  .price-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .price-item {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .label {
    font-size: 0.875rem;
    color: #6c757d;
    margin-bottom: 0.25rem;
  }

  .value {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
  }


  .footer {
    margin-top: 1rem;
    text-align: right;
  }

  .date {
    font-size: 0.75rem;
    color: #6c757d;
  }
</style> 