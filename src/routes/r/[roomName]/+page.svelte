<script lang="ts">
    import { page } from "$app/stores";
    import { pusherChannel } from "@/store";
    import pusher from "@/utils/pusher";
    import type { Room } from "@prisma/client";
    import { onMount } from "svelte";

    let room: Room = $page.data.room;

    // Channel
    onMount(() => {
        if ($pusherChannel) {
            $pusherChannel.disconnect();
            pusherChannel.set(null);
        }

        let channel = pusher.subscribe(`r-${room.name}`);

        console.log(channel);

        pusherChannel.set(channel);
    });
</script>

<div class="h-full w-full flex flex-col" />
