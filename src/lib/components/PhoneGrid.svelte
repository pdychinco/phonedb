<script lang="ts">
  import PhoneCard from './PhoneCard.svelte';
  
  import type { UIMappedPhone } from '$lib/server/db.js';
  export let phones: UIMappedPhone[];
</script>

<div class="phone-grid">
  {#each phones as phone}
    <PhoneCard {phone} />
  {/each}
</div>

<style>
  .phone-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  @media (max-width: 640px) {
    .phone-grid {
      grid-template-columns: 1fr;
      padding: 1rem;
    }
  }
</style> 