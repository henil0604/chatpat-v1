<script>
    import Icon from "@iconify/svelte";

    let messageValue = "";

    async function handleSend() {
        console.log(messageValue);
    }
</script>

<div class="flex p-3 gap-2 variant-ghost-secondary">
    <label class="label w-full">
        <input
            bind:value={messageValue}
            on:keyup={(e) => {
                e.keyCode === 13 && handleSend();
            }}
            class="input w-full"
            type="text"
            placeholder="Type your message..."
        />
    </label>
    <button on:click={handleSend} class="btn variant-ghost-primary px-3">
        <Icon icon="mdi:send" />
    </button>
</div>
