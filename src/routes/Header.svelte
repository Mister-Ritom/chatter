<script>

</script>

<header>
	<nav class="main-nav">
		<ul class="main-nav-list">
			<li class="nav-item" ><a class="nav-link" href="/">Home</a></li>
			<li class="nav-item" ><a class="nav-link"  href="/profile">My Profile</a></li>
			<li class="nav-item" ><a class="nav-link"  href="/notifs">Notifications</a></li>
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
</style>
