<script lang="js">
    import ErrorComp from "$lib/compoents/ErrorComponent.svelte";
         /**
	 * @type {string}
	 */
     export let errorText = ""
	 /**
	 * @type {number}
	 */
	  export let signInType
      /**
	 * @type {(email: string, password: string) => any}
	 */
       export let onSignIn;
       export function changeType() {

       }
    let email = ""
    let password = ""
    function getSubmitText() {
        if(signInType==1) {
            return "Sign in"
        }
        else return "Create a new account"
    }
</script>

<form on:submit={()=> onSignIn(email,password)} class="signin">
    <label for="email">Email</label>
    <input bind:value={email} type="email"/>
    <label for="password">Password</label>
    <input bind:value={password} type="password"/>
    <button type="submit" id="signin-submit">{getSubmitText()}</button>
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