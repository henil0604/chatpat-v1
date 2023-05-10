<script>
    import { APP_NAME } from "@/const";
    import YourRooms from "@/routes/dashboard/YourRooms.svelte";
</script>

<svelte:head>
    <title>{APP_NAME} - Dashboard</title>
</svelte:head>

<div class="container p-4">
    <YourRooms />
</div>
