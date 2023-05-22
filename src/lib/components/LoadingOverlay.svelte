<script lang="ts">
    import Loading from "@/lib/components/Loading.svelte";

    export let scale: number;
</script>

<div
    class="absolute w-full h-full top-0 left-0 backdrop-blur-3xl z-[998] flex-center"
>
    <Loading {scale} />
</div>
