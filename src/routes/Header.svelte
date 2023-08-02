<script>
	import { onAuthStateChanged } from "firebase/auth";
	import { auth } from "$lib/firebase";
	let user = false
	onAuthStateChanged(auth, (it)=> {
		if(it) {
			console.log("User already signed in")
			user = true
		}
		else user = false
	})
</script>

<header>
	<nav class="main-nav">

		<ul class="main-nav-list">
			<li class="nav-item" ><a class="nav-link" href="/">Home</a></li>
			<li class="nav-item" ><a class="nav-link" href="/">Servers</a></li>
			<li class="nav-item" ><a class="nav-link"  href="/profile/me">My Profile</a></li>
			<li class="nav-item" ><a class="nav-link"  href="/notifs">Notifications</a></li>
			{#if !user}
			<div class="sign-in-buttons">
				<li class="nav-item"><a href="/signin" class="nav-link">Sign in</a></li>
				<li class="nav-item"><a href="/signup" class="nav-link">Sign up</a></li>
			</div>
		{/if}
		</ul>
	</nav>
</header>

<style>
	.main-nav-list {
		list-style-type: none;
		display: flex;
		justify-content: center;
	}
	.nav-item {
		margin-right: 1rem;
		padding: 0.5rem;
		border-radius: 1rem;
		cursor: pointer;
		transition: scale ease 0.5s, transform ease 0.2s, box-shadow ease 0.2s;
	}
	.nav-item:hover {
		transform: translateY(-3px);
	}
	.nav-link:hover {
		text-decoration: none;
	}
	.sign-in-buttons {
		display: flex;
		margin-left: auto;
	}
	.sign-in-buttons li:hover {
		box-shadow: 0 20px 80px -10px var(--primary);
	}
</style>
