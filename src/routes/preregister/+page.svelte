<script>
    import { page } from "$app/stores";

    $: user = $page.data.user;
</script>

<div
    class="flex-center min-h-screen wrap px-5 flex flex-col items-center justify-center gap-1"
>
    <p>
        Hey{" "}
        <span class="font-bold text-blue-600">{user.name}</span>! You have
        pre-registered successfully.
    </p>
    <p>You will be notified ASAP we choose you for early access.</p>

</div>
