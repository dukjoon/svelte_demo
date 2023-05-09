<script>
  import axios from "axios";
  import { navigate } from "svelte-routing";

  let firstname = "";
  let lastname = "";
  let phone = "";
  let nickname = "";
  let memo = "";

  async function addContact() {
    try {
      const response = await axios.post("http://127.0.0.1:5158/api/create", {
        firstname,
        lastname,
        phone,
        nickname,
        memo,
      });

      if (response.status !== 201) {
        console.error("Contact creation failed");
      } else {
        console.log("Contact created successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  }
</script>

<h1>Add Contact</h1>

<form on:submit|preventDefault={addContact}>
  <label>
    First Name:
    <input type="text" bind:value={firstname} />
  </label>
  <label>
    Last Name:
    <input type="text" bind:value={lastname} />
  </label>
  <label>
    Phone:
    <input type="text" bind:value={phone} />
  </label>
  <label>
    Nickname:
    <input type="text" bind:value={nickname} />
  </label>
  <label>
    Memo:
    <input type="text" bind:value={memo} />
  </label>
  <button type="submit">Add Contact</button>
</form>
