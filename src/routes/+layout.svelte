<script lang="ts">
    import {
        computePosition,
        autoUpdate,
        flip,
        shift,
        offset,
        arrow,
    } from "@floating-ui/dom";
    import { ProgressRadial, storePopup } from "@skeletonlabs/skeleton";

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    import { page } from "$app/stores";

    // Your selected Skeleton theme:
    import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";

    // This contains the bulk of Skeletons required styles:
    import "@skeletonlabs/skeleton/styles/all.css";

    import "@/app.postcss";
    import { onMount } from "svelte";
    import setDarkMode from "@/utils/setDarkMode";
    import { darkMode, loading } from "@/store";

    import { Toast } from "@skeletonlabs/skeleton";

    // Checking for initial settings values
    onMount(() => {
        darkMode.subscribe((value) => {
            setDarkMode(value);
        });
    });

    console.log(`LAYOUT PAGE STORE`, $page);
</script>

{#if $loading}
    <div
        class="fixed w-screen h-screen top-0 left-0 backdrop-blur-md z-[999] flex-center"
    >
        <ProgressRadial width="w-16" stroke={100} />
    </div>
{/if}

<Toast />
<slot />
