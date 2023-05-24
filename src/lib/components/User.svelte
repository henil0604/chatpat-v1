<script lang="ts">
    import { page } from "$app/stores";
    import type { Session } from "@auth/core/types";

    interface $$Slots {
        default: { user: App.Session["user"] };
        signedOut: {};
    }

    $: user = $page.data.user as App.Session["user"];
</script>

{#if user}
    <slot {user} />
{:else}
    <slot name="signedOut" />
{/if}
