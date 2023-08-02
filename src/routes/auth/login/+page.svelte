<script lang="js">
import Passwordlogin from "$lib/compoents/passwordsignin.svelte";
import Providerlgin from "$lib/compoents/providerlgin.svelte";

import { auth } from "$lib/firebase"
import { goto } from "$app/navigation"
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";

function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).catch((error)=> {
    errorText = error.message;
    alert(error.message);
    console.error("Something went wront trying to sign in With google ",error)
  })
}
let errorText = ""
/**
	 * @param {string} email
	 * @param {string} password
	 */
function signInWithEmail(email,password) {
  if (password.length>8)
  signInWithEmailAndPassword(auth,email,password).catch((error)=> {
    errorText = error.message;
    alert(error.message);
    console.error("Something went wront trying to sign in With email ",error)
  })
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    goto("/")
  }
});

</script>
<header>
  <h1>Sign in to <span class="chatter">RG-Chatter</span></h1>
</header>
<main>
  <div class="about">
    <h1>RG-Chatter</h1>
    <h2>Revolutionizing the Way You Connect</h2>
    <p>Discover a new dimension of social interaction with RG-Chatter, a cutting-edge chat application designed to bring people together like never before. Much more than just a platform, RG-Chatter is a vibrant community where you can seamlessly connect with friends and like-minded individuals through servers and groups, all within an elegant and classy user interface.</p>
  </div>
  <Passwordlogin bind:errorText={errorText} onSignIn={signInWithEmail} signInType={1}/>
</main>

<div class="center" >
  <span>Still Don't have an account?</span>
  <button on:click={()=>goto("/auth/signup")}>Sign up</button>
</div>

<h3 class="center or" >Or</h3>
<Providerlgin signInWithGoogle={signInWithGoogle}/>

  <style>
    main {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    header {
      color: var(--primary);
    }
    .center {
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    .or {
      color: var(--ignore-text)
    }
    .about {
      display: block;
      max-width: fit-content;
      margin-right: auto;
      width: 40vw;
    }
    .chatter{
      background: linear-gradient(45deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
  </style>