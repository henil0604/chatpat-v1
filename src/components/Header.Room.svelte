<script lang="ts">
    import { page } from "$app/stores";

    $: roomName = $page.params.roomName;
    $: room = $page.data.room;
    $: user = $page.data.user;
</script>

<div id="header" class="flex px-5 py-3 max-sm:px-3 border-b grow-0">
    <div id="roomName" class="text-lg">{roomName}</div>
</div>
