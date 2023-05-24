<script lang="ts">
    import BalanceIndicator from "@/lib/components/BalanceIndicator.svelte";
    import User from "@/lib/components/User.svelte";
    import { userStore } from "@/store";
    import fetchSessionUser from "@/utils/fetchSessionUser";
    import { onDestroy, onMount } from "svelte";
    import refetchUser from "@/utils/refetchUser";

    let interval: any;
    let balance: number;
    let balanceIndicatorComponent: any;

    onMount(() => {
        balance = $userStore?.wallet?.balance as number;
        interval = setInterval(async () => {
            refetchUser();
        }, 10000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

    userStore.subscribe((user) => {
        if (user?.wallet && user?.wallet?.balance !== balance) {
            console.log(user.wallet.balance, balance);
            const diff = user?.wallet.balance - balance;

            console.log("diff?", diff);
            if (isNaN(diff)) return;

            balanceIndicatorComponent?.animateDiff?.(diff);

            balance = user?.wallet?.balance || balance;
        }
    });
</script>

<User let:user>
    <BalanceIndicator
        bind:this={balanceIndicatorComponent}
        amount={parseFloat((balance || -1).toFixed(2))}
    />
</User>
