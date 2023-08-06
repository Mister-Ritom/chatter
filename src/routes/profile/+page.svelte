<script>
	import { pb, user } from "$lib/pocketbase";

    function signOut() {
        pb.authStore.clear()
    }

</script>

{#if $user}
<h2>Hey {$user.name}</h2>
<button on:click={signOut}>Sign out</button>
{/if}