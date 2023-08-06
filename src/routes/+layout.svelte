<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import Header from './Header.svelte';
	import './styles.css';

	/** @type {import('./$types').LayoutServerData} */
	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>Owned by <a href="https://ritom.site">Ritom</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 100vw;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0;
		box-sizing: border-box;
		width: fit-content;
		height: fit-content;
	}

	footer {
		padding: 2px;
		margin-left: 1rem;
	}

	footer a {
		font-weight: bold;
	}

	@media (max-width:720px) {
		footer {
			visibility: hidden;
			width: 0;
			padding: 0;
			margin: 0;
		}
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
