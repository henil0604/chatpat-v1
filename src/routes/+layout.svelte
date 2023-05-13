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
    import Loading from "@/lib/components/Loading.svelte";

    import { navigating } from "$app/stores";

    // Checking for initial settings values
    onMount(() => {
        darkMode.subscribe((value) => {
            setDarkMode(value);
        });
    });

    navigating.subscribe(() => {
        if ($navigating) {
            loading.set(true);
            return;
        }
    });

    console.log(`LAYOUT PAGE STORE`, $page);
</script>

{#if $loading}
    <div
        class="fixed w-screen h-screen top-0 left-0 backdrop-blur-md z-[999] flex-center"
    >
        <Loading width="40px" />
    </div>
{/if}

<Toast />
<slot />
