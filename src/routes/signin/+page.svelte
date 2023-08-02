<script lang="js">
import Passwordlogin from "$lib/compoents/passwordsignin.svelte";
import Providerlgin from "$lib/compoents/providerlgin.svelte";
import About from "../about/+page.svelte";

import { auth, db } from "$lib/firebase"
import { goto } from "$app/navigation"
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, 
  signInWithEmailAndPassword, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function signInWithGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((cred)=> {
      console.log("Successfully signed in. Adding user to database")
      if(getAdditionalUserInfo(cred)?.isNewUser) {
        const user = cred.user
        addUser(user.uid,user.uid,user.displayName,user.email,user.photoURL)
      } 
    })
    .catch((error)=> {
    errorText = "Something went wrong trying to sign in"
    alert(errorText);
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
  signInWithEmailAndPassword(auth,email,password)
  .then((cred)=> {
      console.log("Successfully signed in. Adding user to database")
      if(getAdditionalUserInfo(cred)?.isNewUser) {
        const user = cred.user
        addUser(user.uid,user.uid,user.displayName,user.email,user.photoURL)
      } 
    })
  .catch((error)=> {
    errorText = error.message;
    alert(error.message);
    console.error("Something went wront trying to sign in With email ",error)
  })
}

/**
	 * @param {string} uuid
	 * @param {string} username
	 * @param {string | null} name
	 * @param {string | null} email
	 * @param {string | null} photoUrl
	 */
function addUser(uuid,username,name,email,photoUrl) {
  const userDoc = doc(db,"Users",uuid)
  setDoc(userDoc,{
    uid:uuid,
    email:email,
    username:username,
    name:name,
    photoUrl:photoUrl
  }).catch((error)=> {
    errorText = "Something went wrong trying to add user to database"
    alert(errorText);
    console.error("Something went wront trying to add user to database ",error)
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
  <span class="about"><About/></span>
  <Passwordlogin bind:errorText={errorText} onSignIn={signInWithEmail} signInType={1}/>
</main>

<div class="center" >
  <span>Still don't have an account?</span>
  <button on:click={()=>goto("/signup")}>Sign up</button>
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