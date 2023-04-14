<script lang="ts">
    import { page } from "$app/stores";

    $: roomName = $page.params.roomName;
    $: user = $page.data.user;
</script>

<div id="body" class="grow-1 w-full h-full" />
