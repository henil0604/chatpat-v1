<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { IconDoorExit } from "@tabler/icons-svelte";

    const roomName = $page.params.roomName;
    const room = $page.data.room;
    const user = $page.data.user;

    function handleExit() {
        goto("/dashboard");
    }
</script>

<div
    id="header"
    class="flex px-5 justify-between py-3 max-sm:px-3 border-b grow-0"
>
    <div id="roomName" class="text-lg">{roomName}</div>
    <div id="actions" class="flex gap-1">
        <div class="tooltip tooltip-bottom" data-tip="Exit">
            <button on:click={handleExit} class="btn btn-error btn-xs">
                <IconDoorExit size={20} />
            </button>
        </div>
    </div>
</div>
