<script lang="js">
    import ErrorComp from "$lib/compoents/ErrorComponent.svelte";
	import { pb } from "$lib/pocketbase";

    let errorText = ""

    /**
	 * @param {string} email
	 * @param {string} password
	 */
    function signInWithEmail(email,password) {
        if (password.length>8) {
            const data = {
            email,
            password,
            passwordConfirm:password,
            name:"Ritom",
            }
            pb.collection('users').create(data).catch((error)=> {
                errorText = error
            }).then(()=> {
                pb.collection('users').authWithPassword(
                    email,
                    password,
                );
            })
        }
    }
       export function changeType() {

       }
    let email = ""
    let password = ""
</script>

<form on:submit={()=> signInWithEmail(email,password)} class="signin">
    <label for="email">Email</label>
    <input bind:value={email} type="email" id="email" />
    <label for="password">Password</label>
    <input bind:value={password} type="password" id="password" />
    <button type="submit" id="signin-submit">Sign in</button>
    <ErrorComp bind:errorText={errorText}/>
</form>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@400&display=swap');
    .signin {
        display: flex;
        flex-direction: column;
    }
    #signin-submit {
        margin-top: 1rem;
        background-color: var(--accent);
        font-family: 'kanit';
        letter-spacing: 2.2px;
        margin-left: auto;
        margin-right: auto;
    }
</style>