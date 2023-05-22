<script lang="ts">
    import {
        computePosition,
        autoUpdate,
        flip,
        shift,
        offset,
        arrow,
    } from "@floating-ui/dom";
    import { Modal, drawerStore, storePopup } from "@skeletonlabs/skeleton";

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

    import { navigating } from "$app/stores";
    import type { User } from "@prisma/client";

    import { Drawer } from "@skeletonlabs/skeleton";
    import AppDrawerContent from "@/lib/components/AppDrawerContent.svelte";
    import LoadingOverlay from "@/lib/components/LoadingOverlay.svelte";

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
    <LoadingOverlay scale={1} />
{/if}

<Drawer>
    {#if $drawerStore.id === "appDrawer"}
        <AppDrawerContent />
    {:else}{/if}
</Drawer>

<Modal />
<Toast position="t" padding="py-2 px-3" />
<slot />
