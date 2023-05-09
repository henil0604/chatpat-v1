<script>
    import { page } from "$app/stores";

    const user = $page.data.user;
</script>

<div class="container flex-col p-4 max-sm:p-0">
    <div class="card p-4 px-10 flex justify-start gap-10">
        <img
            width="200"
            height="200"
            class="rounded-full"
            src={user.image}
            alt=""
        />
        <div class="flex flex-col gap-3">
            <label class="label">
                <span>Name</span>
                <input
                    class="input"
                    value={user.name}
                    type="text"
                    readonly
                    placeholder="Name"
                />
            </label>
            <label class="label">
                <span>Email</span>
                <input
                    class="input"
                    value={user.email}
                    type="text"
                    readonly
                    placeholder="Email"
                />
            </label>
        </div>
    </div>
</div>
