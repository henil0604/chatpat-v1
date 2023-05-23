<script>
    import { APP_NAME } from "@/const";
    import YourRooms from "@/routes/dashboard/YourRooms.svelte";
    import { fade } from "svelte/transition";
</script>

<svelte:head>
    <title>{APP_NAME} - Dashboard</title>
</svelte:head>

<div in:fade class="container p-4">
    <YourRooms />
</div>
