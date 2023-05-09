<script>
  export let contacts = [];
</script>

<ul>
  {#each contacts as contact (contact.id)}
    <li>{contact.firstname} {contact.lastname} - {contact.phone}</li>
  {/each}
</ul>
