<script setup lang="ts">
// @ts-nocheck
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
	<main>
		<RouterView />
	</main>
</template>

<style scoped>
main {
	display: flex;
	flex-direction: column;
	height: 100vh;
}
</style>
