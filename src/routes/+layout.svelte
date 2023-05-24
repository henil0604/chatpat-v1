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
    import { addActivity } from "@/stores/activity";

    let user: App.Session["user"] = $page.data?.user || null;

    // Checking for initial settings values
    onMount(() => {
        darkMode.subscribe((value) => {
            setDarkMode(value);
        });

        userStore.set(user);

        // activity checkers
        window.addEventListener("click", (e) => {
            addActivity({
                event: "click",
                timestamp: new Date(),
                path: $page.url.pathname,
                meta: e,
            });
        });
        window.addEventListener("drag", (e) => {
            addActivity({
                event: "drag",
                timestamp: new Date(),
                path: $page.url.pathname,
                meta: e,
            });
        });
        window.addEventListener("keypress", (e) => {
            addActivity({
                event: "keypress",
                timestamp: new Date(),
                path: $page.url.pathname,
                meta: e,
            });
        });
        window.addEventListener("blur", (e) => {
            addActivity({
                event: "blur",
                timestamp: new Date(),
                path: $page.url.pathname,
                meta: e,
            });
        });
        window.addEventListener("focus", (e) => {
            addActivity({
                event: "focus",
                timestamp: new Date(),
                path: $page.url.pathname,
                meta: e,
            });
        });
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
