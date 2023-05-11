<script>
    import Icon from "@iconify/svelte";
</script>

<div class="flex p-3 gap-2 variant-ghost-secondary">
    <label class="label w-full">
        <input
            class="input w-full"
            type="text"
            placeholder="Type your message..."
        />
    </label>
    <button class="btn variant-ghost-primary px-3">
        <Icon icon="mdi:send" />
    </button>
</div>
