
<script>
	import { pb } from "$lib/pocketbase";
	import { onMount } from "svelte";

    /**
	 * @type {any[]}
	 */
    let servers = [];

    onMount(async ()=> {
        const result = await pb.collection('servers').getList(1,50, {
            sort:'created',
            expand: 'owner',
        })
        servers = result.items;

    })

    /**
	 * @param {any} server
	 */
    function getImageUrl(server) {
        return pb.files.getUrl(server, server.image, {'thumb': '100x250'});
    }

</script>

{#each servers as server (server.id)}
<div class="server">
    <img class="server-image" width="128px" height="128px" src={getImageUrl(server)} alt={`${server.name}'s server image for rg-chatter'`}>
    <a class="server-name" href={`/message?serverId=${server.id}`}> 
        <h2>{server.name}</h2>
    </a>
</div>
{/each}

<style>

    .server {
        display: flex;
        justify-content: start;
        align-items: start;
        margin: 1rem;
        width: 400px;
        background-color: var(--primary);
        padding-left: 3rem;
        padding-right: 3rem;
        padding-top: 8px;
        padding-bottom: 8px;
        border-radius: 1rem;
        box-shadow: 0 4px 8px 0 var(--secondary);
    }

    .server-image {
        border-radius: 50%;
    }

    .server-name {
        margin-left: 2rem;
        transition: 0.6s;
        border-radius: 2rem;
        margin-top: auto;
        margin-bottom: auto;
    }

    .server-name:hover {
        background-color: royalblue;
    }

    .server-name h2 {
        font-size: larger;
        font-family: var(--font-header);
        letter-spacing: 1.3px;
        padding: 8px;
    }

</style>
