<script>
	import { page } from "$app/stores";
    import SmallUser from "$lib/compoents/SmallUser.svelte";
	import { pb, user } from "$lib/pocketbase";
	import { onDestroy, onMount } from "svelte";

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
            const result = await pb.collection('messages').getList(1,50, {
                sort:'created',
                expand: 'user',
                filter: `server = "${serverId}"`,
            })
            messages = result.items;
            unsubscribe = await pb
                .collection('messages')
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

    onDestroy(() => {
        unsubscribe();
    });

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
                server:serverId,
            };
            const createdMessage = await pb.collection('messages').create(data);
            message = '';
        }
    }
    
</script>
<ul class="messages">
    {#each messages as message}
        <li class={getClass(message)}>
            <SmallUser user={message.expand.user}/>
            <p class="message-text">{message.text}</p>
        </li>
    {/each}
</ul>

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
    justify-content: start;
    align-items: center;
    flex-direction: column;
    height: 65vh;
    width: 80vw;
    overflow-y: scroll;
    list-style: none;
}

.message {
    width: 35vw;
    height: max-content;
    background-color: var(--message-bg);
    border-radius: 16px;
    padding: 24px;
    margin: 8px;
}

@media (max-width:720px) {
    .message {
        width: auto;
    }
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