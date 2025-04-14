<script lang="ts">
  export let phone: {
    name: string;
    monthlyPrice: number;
    downPayment: number;
    apr: number;
    retailPrice: number;
    savings: number;
  };
</script>

<div class="phone-card">
  <h2 class="phone-name">{phone.name}</h2>
  <div class="price-details">
    <div class="price-item">
      <span class="label">Monthly Price</span>
      <span class="value">${phone.monthlyPrice.toFixed(2)}/mo</span>
    </div>
    <div class="price-item">
      <span class="label">Down Payment</span>
      <span class="value">${phone.downPayment.toFixed(2)}</span>
    </div>
    <div class="price-item">
      <span class="label">APR</span>
      <span class="value">{phone.apr}%</span>
    </div>
    <div class="price-item">
      <span class="label">Retail Price</span>
      <span class="value">${phone.retailPrice.toFixed(2)}</span>
    </div>
    <div class="price-item savings">
      <span class="label">Savings</span>
      <span class="value savings-value">${phone.savings.toFixed(2)}</span>
    </div>
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
  }

  .phone-card:hover {
    transform: translateY(-4px);
  }

  .phone-name {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #2c3e50;
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

  .savings {
    background: #e8f5e9;
  }

  .savings-value {
    color: #2e7d32;
  }
</style> 