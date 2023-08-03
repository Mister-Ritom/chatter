
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
            console.log(datas[0])
        }

    }
</script>
<a href="/servers/create">Create Server</a>
<button disabled={serversVisible} on:click={addServers}>View servers I am insterested in</button>
{#each datas as data}
    <div class="server">
        <img class="server-image" width="128px" height="128px" src={data.serverImage} alt={`${data.name}'s server image for rg-chatter'`}>
        <a class="server-name" href={`/message?id=${data.id}`}>{data.name}</a>
    </div>
{/each}

<style>
    .server {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
