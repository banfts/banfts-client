<script>
  export let data;
</script>

<ul>
  {#each data.help_pages as help_page}
    <li><a class="link" href="/help/{help_page}">{help_page}</a></li>
  {/each}
</ul>
