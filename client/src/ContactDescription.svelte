<script>
  import { onMount } from "svelte";
  import { useNavigate, useParams } from "svelte-navigator";
  import axios from "axios";

  let contact = null;
  let loading = true;
  let error = null;
  let id;

  onMount(async () => {
    const params = useParams();
    id = params.id;
    try {
      const response = await axios.get(`http://127.0.0.1:5158/api/read/${id}`);
      contact = response.data;
      loading = false;
    } catch (e) {
      error = e;
      loading = false;
    }
  });
</script>

{#if loading}
  <div>Loading...</div>
{:else if error}
  <div>Error loading contact</div>
{:else if contact}
  <div>
    <h2>
      {contact.firstname}
      {contact.lastname}
    </h2>
    <p>Nickname: {contact.nickname || "N/A"}</p>
    <p>Phone: {contact.phone}</p>
    <p>Memo: {contact.memo || "N/A"}</p>
  </div>
{:else}
  <div>Contact not found</div>
{/if}
