<script lang="ts">
    import {
        computePosition,
        autoUpdate,
        flip,
        shift,
        offset,
        arrow,
    } from "@floating-ui/dom";
    import { Modal, storePopup } from "@skeletonlabs/skeleton";

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

    import { page } from "$app/stores";

    // Your selected Skeleton theme:
    // import "@skeletonlabs/skeleton/themes/theme-gold-nouveau.css";
    // import "@skeletonlabs/skeleton/themes/theme-rocket.css";
    import "@/lib/assets/theme.postcss";

    // This contains the bulk of Skeletons required styles:
    import "@skeletonlabs/skeleton/styles/all.css";

    import "@/app.postcss";
    import { onMount } from "svelte";
    import setDarkMode from "@/utils/setDarkMode";
    import { darkMode, loading, userStore } from "@/store";

    import { Toast } from "@skeletonlabs/skeleton";
    import Loading from "@/lib/components/Loading.svelte";

    import { navigating } from "$app/stores";
    import type { User } from "@prisma/client";

    let user: User = $page.data?.user || null;

    // Checking for initial settings values
    onMount(() => {
        darkMode.subscribe((value) => {
            setDarkMode(value);
        });

        userStore.set(user);
    });

    navigating.subscribe(() => {
        if ($navigating) {
            if ($navigating.from?.route.id === $navigating.to?.route.id) {
                return;
            }
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

<Modal />
<Toast position="t" padding="py-2 px-3" />
<slot />
