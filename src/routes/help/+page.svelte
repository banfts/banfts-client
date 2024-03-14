<script>
  export let data;
</script>

<p>A quick list of all help pages:</p>

<ul class="list-disc pl-4">
  {#each data.help_pages as help_page}
    <li><a class="link" href="/help/{help_page}">{help_page}</a></li>
  {/each}
</ul>
