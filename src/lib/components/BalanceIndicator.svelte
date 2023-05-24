<script lang="ts">
    import Icon from "@iconify/svelte";

    let spanRef: HTMLSpanElement;

    export function animateDiff(amount: number) {
        let classes = amount > 0 ? "bg-lime-500" : "bg-red-500";
        spanRef.classList.add(classes);

        setTimeout(() => {
            spanRef.classList.remove(classes);
        }, 300);
    }

    export let amount: number;
</script>

<span
    bind:this={spanRef}
    class="w-fit h-fit card variant-ghost-primary p-1 px-2 variant-ghost flex-center gap-1"
>
    {amount}
    <Icon class="text-amber-400 h-fit w-fit" icon="openmoji:coin" />
</span>
