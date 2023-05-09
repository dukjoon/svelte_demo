<script>
  import { Router, Route } from "svelte-routing";
  import Contact from "./Contact.svelte";
  import ContactDescription from "./ContactDescription.svelte";

  let routes = [
    {
      name: "Home",
      path: "/",
      component: Contact,
    },
    {
      name: "Contact Description",
      path: "/contact/:id",
      component: ContactDescription,
    },
  ];
</script>

<nav>
  <ul>
    {#each routes as { name, path }}
      <li><a href={path}>{name}</a></li>
    {/each}
  </ul>
</nav>

<main>
  <Router>
    {#each routes as { path, component }}
      <Route {path} {component} />
    {/each}
  </Router>
</main>

<style>
  @import "tailwindcss/base.css";
  @import "tailwindcss/components.css";
  @import "tailwindcss/utilities.css";
</style>
