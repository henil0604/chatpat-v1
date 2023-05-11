<script lang="ts">
    import { page } from "$app/stores";
    import { originalRoomPassword, roomAccessAllowed } from "@/store";
    import { hash } from "@/utils/crypto";
    import type { Room } from "@prisma/client";

    let password = "";

    const room: Room = $page.data.room;

    function handleInput() {
        const match = room.password === hash(password);

        if (match) {
            originalRoomPassword.set(room.password);
            roomAccessAllowed.set(true);
        }
    }
</script>

<div class="card p-4 flex-center flex-col gap-2">
    <div class="text-muted">This Room is Private, Please enter password...</div>
    <label class="label w-full">
        <input
            bind:value={password}
            on:input={handleInput}
            class="input w-full"
            type="text"
            placeholder="Enter Password"
        />
    </label>
</div>
