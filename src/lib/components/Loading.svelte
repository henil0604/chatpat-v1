<script lang="ts">
    export let scale = 1;
</script>

<div class={`spinner`} style="--scale:{scale}" />

<style scoped>
    .spinner {
        --color: #38bdf8;
        --duration: 0.6s;
        width: 6px;
        height: 6px;
        animation: spinner-xp626r var(--duration) infinite;
        border-radius: 50%;
        box-shadow: 24px 0 0 6px var(--color), -24px 0 0 6px var(--color);
        scale: var(--scale);
    }

    @keyframes spinner-xp626r {
        to {
            transform: rotate(360deg);
        }
    }
</style>
