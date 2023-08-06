<script>
	import { page } from "$app/stores";
    import SmallUser from "$lib/compoents/SmallUser.svelte";
	import { pb, user } from "$lib/pocketbase";
	import { onMount } from "svelte";

    /**
	 * @type {any[]}
	 */
     let messages = [];

     let message = ""
     let unsubscribe = ()=> {}
    const url = $page.url;
    const serverId = url.searchParams.get("serverId")

    onMount(async ()=> {
        if(serverId) {
            const result = await pb.collection(serverId).getList(1,50, {
                sort:'created',
                expand: 'user',
            })
            messages = result.items;
            unsubscribe = await pb
                .collection(serverId)
                .subscribe('*', async ({ action, record }) => {
                    if (action === 'create') {
                    // Fetch associated user
                    const user = await pb.collection('users').getOne(record.user);
                    record.expand = { user };
                    messages = [...messages, record];
                    }
                    if (action === 'delete') {
                    messages = messages.filter((m) => m.id !== record.id);
                }
            });
        }
    })

    /**
	 * @param {any} message
	 */
    function getClass(message) {
        if($user!=null && message.expand.user.id==$user.id){
            return "message sent"
        }
        else return "message received"
    }

    /**
	 * @param {any} e
	 */
    async function sendMessage(e) {
        e.preventDefault()
        if($user&&serverId) {
            const data = {
                text: message,
                user: $user.id,
            };
            const createdMessage = await pb.collection(serverId).create(data);
            message = '';
        }
    }
    
</script>
<div class="messages">
    {#each messages as message}
        <div class={getClass(message)}>
            <SmallUser user={message.expand.user}/>
            <p class="message-text">{message.text}</p>
        </div>
    {/each}

</div>

<form on:submit={sendMessage}>
    <input bind:value={message} type="text">
    <button type="submit">Send</button>
</form>
<style>
form {
    position: absolute;
    margin-top: auto;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    margin-left: auto;
    margin-right: auto;
    z-index:999;
    margin-bottom: 1rem;
}
.messages{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 65vh;
    width: 80vw;
    overflow-y: scroll;
}

.message {
    width: 35vw;
    height: max-content;
}

.sent {
    margin-left: auto;
}

.received {
    margin-right: auto;
}

.message-text {
    z-index: inherit;
    margin-right: auto;
}
</style>