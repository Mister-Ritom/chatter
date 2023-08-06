<script lang="js">
import Passwordlogin from "$lib/compoents/passwordsignin.svelte";
import Providerlgin from "$lib/compoents/providerlgin.svelte";
import About from "../about/+page.svelte";
import { goto } from "$app/navigation"
</script>
<header>
  <h1>Sign up to <span class="chatter">RG-Chatter</span></h1>
</header>
<main>
  <span class="about"><About/></span>
  <Passwordlogin/>
</main>

<h3 class="center or" >Or</h3>
<Providerlgin/>

  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    header {
      color: var(--primary);
    }
    .center {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .or {
      color: var(--ignore-text)
    }
    .about {
      display: block;
      max-width: fit-content;
      margin-right: auto;
      width: 40vw;
    }
    .chatter{
      background: linear-gradient(45deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    @media (max-width: 720px) {
      .about {
        visibility: collapse;
        border: 0;
        clip: rect(0 0 0 0);
        height: auto;
        margin: 0;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
        white-space: nowrap;
      }
  }
  </style>