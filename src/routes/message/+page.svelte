<script>
	import { auth, db } from "$lib/firebase";
	import { addDoc, collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
    import SmallUser from "$lib/compoents/SmallUser.svelte";

    /**
	 * @type {any[]}
	 */
    let messages = []
        /**
	 * @type {any[]}
	 */
     let users = []

    let id = "FFJN5GF3vHYwEpOHc310";
    /**
	 * @type {string}
	 */
    let message;

    /**
	 * @type {HTMLDivElement}
	 */

    /**
	 * @param {any} e
	 */
    function sendMessage(e) {
        e.preventDefault();
        if(message==undefined||message==null||message.length<1||auth.currentUser==null)return
        const messageCollection = collection(db,"messages",id,"texts")
        addDoc(messageCollection,getMessageData())
    }
    function getMessageData() {
        return {
            text:message,
            createdBy:auth.currentUser?.uid,
            createdOn:Date.now(),
        }
    }

    /**
	 * @param {any} message
	 */
    function getClass(message) {
        if(message.createdBy==auth.currentUser?.uid) {
            return "sent message"
        }
        else return "received message"
    }
     
        const textCollection = collection(db, "messages",id,"texts")
        const snapshotQuery = query(textCollection,orderBy("createdOn","desc"),limit(25))
            onSnapshot(snapshotQuery,(querySnapshot)=> {
                messages = []
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    messages = [...messages,data];
                });
            })
    
</script>
<div class="messages">
    {#each messages as message}
        <div class={getClass(message)}>
            <SmallUser userId={message.createdBy}/>
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