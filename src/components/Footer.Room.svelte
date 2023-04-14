<script lang="ts">
    import { page } from "$app/stores";
    import { IconSend } from "@tabler/icons-svelte";

    $: roomName = $page.params.roomName;
    $: user = $page.data.user;

    async function handleSend(event: Event) {
        event.preventDefault();
    }
</script>

<div id="footer" class="flex border-t">
    <input
        type="text"
        class="input rounded-none input-bordered w-full"
        placeholder="Type..."
    />
    <button class="btn rounded-none btn-info" on:click={handleSend}>
        <IconSend />
    </button>
</div>
