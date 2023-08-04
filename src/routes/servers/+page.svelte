
<script>
	import { db } from "$lib/firebase";
    import { collection, getDocs } from "firebase/firestore";

    /**
	 * @type {any[]}
	 */
    let datas = [];
    let serversVisible = false
    async function addServers() {
        if(datas.length<50) {
            serversVisible = true
            const querySnapshot = await getDocs(collection(db, "Servers"))
            querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    console.log(doc.id, " => ", data);
                    datas=[...datas,data]
                });
        }

    }
</script>
<div class="main">
    <a class="create" href="/servers/create">Create Server</a>
    <button class="create" disabled={serversVisible} on:click={addServers}>View servers I am insterested in</button>
</div>

{#each datas as data}
<div class="server">
    <img class="server-image" width="128px" height="128px" src={data.serverImage} alt={`${data.name}'s server image for rg-chatter'`}>
    <a class="server-name" href={`/message?id=${data.id}`}> 
        <h2>{data.name}</h2>
    </a>
</div>
{/each}

<style>

    .main{
        display: flex;
    }

    .create {
        background-color: var(--accent);
        width: max-content;
        padding: 1rem;
        margin: 8px;
        border-radius: 2rem;
        transition: 0.2s;
        text-decoration: none;
        cursor: pointer;
    }

    .create:hover{
        background-color: var(--primary);
    }

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
