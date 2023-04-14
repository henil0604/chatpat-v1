<script lang="ts">
    import { page } from "$app/stores";
    import "@/app.postcss";
    import { loading, loadingMessage } from "@/store";
    import { ToastContainer, FlatToast } from "svelte-toasts";

    console.log(`LAYOUT PAGE STORE`, $page);
</script>

{#if $loading === true}
    <div
        class="w-full min-h-screen fixed flex-center top-0 left-0 bg-white cursor-wait z-[1000] transition-all"
    >
        <progress
            class="progress progress-info w-full z-[1001] fixed top-0 rounded-none"
        />

        <div class="italic">
            {$loadingMessage}
        </div>
    </div>
{/if}
<ToastContainer placement="top-right" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
</ToastContainer>
<slot />
