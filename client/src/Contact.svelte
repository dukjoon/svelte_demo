<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let contacts = [];
  let loading = false;
  let error = null;

  async function fetchContacts() {
    try {
      error = null;
      contacts = null;
      loading = true;
      const response = await axios.get("http://127.0.0.1:5158/api/read");
      contacts = response.data;
    } catch (e) {
      error = e;
    }
    loading = false;
  }

  onMount(() => {
    fetchContacts();
  });

  async function saveContact(index) {
    const contact = contacts[index];
    try {
      const response = await axios.put(
        `http://127.0.0.1:5158/api/update/${contact.id}`,
        {
          firstname: contact.firstname,
          lastname: contact.lastname,
          nickname: contact.nickname,
          phone: contact.phone,
          memo: contact.memo,
        }
      );

      if (response.status !== 200) {
        console.error("Contact update failed");
      } else {
        console.log("Contact updated successfully");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  }

  async function deleteContact(index) {
    const contact = contacts[index];
    try {
      const response = await axios.delete(
        `http://127.0.0.1:5158/api/delete/${contact.id}`
      );

      if (response.status !== 200) {
        console.error("Contact deletion failed");
      } else {
        console.log("Contact deleted successfully");
        contacts.splice(index, 1);
        fetchContacts(); // Refresh the contacts list
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

  async function addContact() {
    try {
      const response = await axios.post("http://127.0.0.1:5158/api/add", {
        firstname: newContact.firstname,
        lastname: newContact.lastname,
        nickname: newContact.nickname,
        phone: newContact.phone,
        memo: newContact.memo,
      });

      if (response.status === 200) {
        console.log("Contact added successfully");
        fetchContacts(); // Refresh the contacts list
      } else {
        console.error("Contact addition failed");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }

  let newContact = {
    firstname: "",
    lastname: "",
    nickname: "",
    phone: "",
    memo: "",
  };
</script>

<!-- <h1>Contacts</h1>

Add Contact Form
<form on:submit|preventDefault={addContact}>
  <input
    type="text"
    placeholder="First name"
    bind:value={newContact.firstname}
  />
  <input type="text" placeholder="Last name" bind:value={newContact.lastname} />
  <input type="text" placeholder="Phone" bind:value={newContact.phone} />
  <input type="text" placeholder="Nickname" bind:value={newContact.nickname} />
  <input type="text" placeholder="Memo" bind:value={newContact.memo} />
  <button type="submit">Add</button>
</form> -->
<h1 class="text-3xl font-bold mb-4">Contacts</h1>

<!-- Add Contact Form -->
<form class="mb-8" on:submit|preventDefault={addContact}>
  <div class="flex flex-wrap mb-4">
    <div class="w-full md:w-1/2 md:pr-2">
      <input
        class="w-full border rounded py-2 px-3"
        type="text"
        placeholder="First name"
        bind:value={newContact.firstname}
      />
    </div>
    <div class="w-full md:w-1/2 md:pl-2">
      <input
        class="w-full border rounded py-2 px-3"
        type="text"
        placeholder="Last name"
        bind:value={newContact.lastname}
      />
    </div>
  </div>
  <div class="flex flex,.j=-wrap mb-4">
    <div class="w-full md:w-1/2 md:pr-2">
      <input
        class="w-full border rounded py-2 px-3"
        type="text"
        placeholder="Phone"
        bind:value={newContact.phone}
      />
    </div>
    <div class="w-full md:w-1/2 md:pl-2">
      <input
        class="w-full border rounded py-2 px-3"
        type="text"
        placeholder="Nickname"
        bind:value={newContact.nickname}
      />
    </div>
  </div>
  <div class="mb-4">
    <input
      class="w-full border rounded py-2 px-3"
      type="text"
      placeholder="Memo"
      bind:value={newContact.memo}
    />
  </div>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type="submit">Add</button
  >
</form>

{#if loading}
  <div>Loading...</div>
{:else if error}
  <div>Error: {error.message}</div>
{:else}
  <ul>
    {#each contacts as contact, index (contact.id)}
      <li>
        <input
          type="text"
          value={contact.firstname}
          on:input={(e) => (contact.firstname = e.target.value)}
        />
        <input
          type="text"
          value={contact.lastname}
          on:input={(e) => (contact.lastname = e.target.value)}
        />
        <input
          type="text"
          value={contact.phone}
          on:input={(e) => (contact.phone = e.target.value)}
        />
        <input
          type="text"
          value={contact.nickname}
          on:input={(e) => (contact.nickname = e.target.value)}
        />
        <input
          type="text"
          value={contact.memo}
          on:input={(e) => (contact.memo = e.target.value)}
        />
        <button on:click={() => saveContact(index)}>Save</button>
        <button on:click={() => deleteContact(index)}>Delete</button>
      </li>
    {/each}
  </ul>
{/if}
