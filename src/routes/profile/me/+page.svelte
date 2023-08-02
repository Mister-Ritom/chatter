<script>
    import { auth } from "$lib/firebase"
    import { signOut } from "firebase/auth";

    function signOutFromApp() {
        signOut(auth)
    }

</script>


<button on:click={signOutFromApp}>Signout</button>