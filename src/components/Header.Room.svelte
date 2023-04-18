<script lang="ts">
    import { page } from "$app/stores";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;
</script>

<div id="header" class="flex px-5 py-3 max-sm:px-3 border-b grow-0">
    <div id="roomName" class="text-lg">{roomName}</div>
</div>
