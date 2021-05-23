<script>
	import Router from 'svelte-spa-router';
	import Landing from './Landing.svelte';
	import NutsTable from './nutsAPI/NutsTable.svelte';
	import NutsEdit from './nutsAPI/NutsTableEdit.svelte';
	import NotFound from './NotFound.svelte';
	import Info from './Info.svelte';
	import NutsGraph from './nutsAPI/NutsGraph.svelte';


	const routes = {
		"/": Landing,
		"/nuts-production-stats": NutsTable,
		"/nuts-production-stats/:country/:year": NutsEdit,
		"/info": Info,
		"/nuts-graph": NutsGraph,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>