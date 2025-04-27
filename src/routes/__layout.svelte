<script>
    import Header from '$lib/components/header.svelte'; // Import the Header component
  </script>
  
  <Header title="My Awesome Website" /> <!-- Pass a title prop if needed -->
  
  <main>
    <slot></slot>
  </main>
  