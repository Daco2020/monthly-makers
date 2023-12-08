<script>
    import "../app.css";
    import Nav from '../components/nav.svelte';
</script>

<style>
    :global(body) {
      /* background-color: #0e0719; */
      background-color: #141414;
    }
  </style>

<div class="mx-auto">
<Nav></Nav>
</div>

<div class="max-w-6xl mx-auto mt-32">
<slot />
</div>