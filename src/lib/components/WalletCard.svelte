<script lang="ts">
    import BalanceIndicator from "@/lib/components/BalanceIndicator.svelte";
    import User from "@/lib/components/User.svelte";
    import { userStore } from "@/store";
    import fetchSessionUser from "@/utils/fetchSessionUser";
    import { onDestroy, onMount } from "svelte";
    import refetchUser from "@/utils/refetchUser";

    let interval: any;

    onMount(() => {
        interval = setInterval(async () => {
            refetchUser();
        }, 10000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<User let:user>
    <BalanceIndicator
        amount={parseFloat(($userStore?.wallet?.balance || -1).toFixed(2))}
    />
</User>
