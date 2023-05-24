<script lang="ts">
    import Icon from "@iconify/svelte";

    export let amount: number;
</script>

<span
    class="w-fit h-fit card variant-ghost-primary p-1 px-2 variant-ghost flex-center gap-1"
>
    {amount}
    <Icon class="text-amber-400 h-fit w-fit" icon="mingcute:coin-3-fill" />
</span>
