
<script>
	import { auth, db, storage } from "$lib/firebase";
	import { addDoc, collection, doc, setDoc } from "firebase/firestore";
    import ErrorComponent from "$lib/compoents/ErrorComponent.svelte";
	import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

    let errorText="";
    let serverName="";
        /** 
     * @type {any}
    */
    let serverImage = null;

    /**
	 * @param {any} e
	 */
    function onFileChange(e) {
        if(e!=null&&e.target!=null&&e.target.files!=null)
            serverImage = e.target.files[0];
    }

    async function createServer() {
        if(serverName==undefined||serverName==null||serverName.length<5) {
            alert("Server name must be more than 5 characters")
            return
        }
         if(auth.currentUser) {
            const serversCollection = collection(db,"messages")
            addDoc(serversCollection,{
                createdOn:Date.now()
            }).then((it)=> {
                if(auth.currentUser) {
                    const serverImageRef = ref(storage,`Servers/${it.id}`)
                    if(serverImage){
                        uploadBytes(serverImageRef,serverImage).then((snapshot)=> {
                            getDownloadURL(snapshot.ref).then((downloadLink)=> {
                                if(auth.currentUser)
                                setServerInfo(auth.currentUser.uid,it.id,downloadLink,()=> {
                                    console.log(`Creatd server ${it.id} with image`)
                                })
                            })
                            .catch((error)=> {
                                errorText = "Could not upload server Image"
                                alert(errorText)
                                console.error("Something went wrong trying to getDownload url of server Image ", error)
                            })
                        })
                        .catch((error)=> {
                            errorText = "Could not upload server Image"
                            alert(errorText)
                            console.error("Something went wrong trying to upload server image ", error)
                        })
                    }
                    else {
                        setServerInfo(auth.currentUser.uid,it.id,null,()=> {
                            console.log(`Creatd server ${it.id} without image`)
                        })
                    }
                }

             })
             .catch((error)=> {
                errorText = "Could not create server"
                alert(errorText)
                console.error("Something went wrong trying to create a new server ", error)
             })
         }
    }

    /**
	 * @param {string} ownerId
	 * @param {string} docId
     * @param {string?} serverImageLink
     * @param {any} success
	 */
    function setServerInfo(ownerId,docId,serverImageLink,success) {
        const serverInfoDoc = doc(db,"Servers",docId)
                    setDoc(serverInfoDoc,{
                    id:docId,
                    name:serverName,
                    serverImage:serverImageLink,
                    createdBy:ownerId,
                    createdOn:Date.now()
                }).then(success)
                .catch((error)=> {
                    errorText = "Could not create server"
                    alert(errorText)
                    console.error("Something went wrong trying to create a new server ", error)
                })
    }

</script>

<form on:submit={createServer}>
    <label for="server-image">Server image</label>
    <input on:change={onFileChange} type="file" id="server-image" accept=".jpg, .jpeg, .png, .webp, .ico">
    <label for="server-name">Server name</label>
    <input bind:value={serverName} type="text" id="server-name">
    <button type="submit">Create</button>
</form>
<ErrorComponent bind:errorText={errorText} />

<style>
    form{
        display: flex;
        flex-direction: column;
    }
    input {
        margin-bottom: 1rem;
        max-width: fit-content;
    }
</style>