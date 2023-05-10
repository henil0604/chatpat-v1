<script lang="ts">
    import { REGEX } from "@/const";
    import createRoom from "@/utils/createRoom";
    import { useForm, minLength, required, pattern } from "svelte-use-form";
    import type { Visibility } from "@prisma/client";
    import { loading } from "@/store";
    import { goto } from "$app/navigation";
    import sleep from "@/utils/sleep";

    const form = useForm({
        roomName: {
            initial: "",
            validators: [minLength(2), required, pattern(REGEX.alphanumeric)],
        },
        description: {
            initial: "",
            validators: [required],
        },
        visibility: {
            initial: "UNLISTED",
            validators: [required],
        },
        password: {
            initial: "",
            validators: [minLength(3), required],
        },
    });

    async function handleSubmit() {
        if (!$form.valid) return;
        loading.set(true);

        console.log("values?", $form.values);

        const created = await createRoom({
            name: $form.values.roomName,
            visibility: $form.values.visibility as Visibility,
            password: $form.values.password,
            description: $form.values.description,
        });

        loading.set(false);

        if (!created) {
            return;
        }

        goto(`/r/${created.name}`);

        await sleep(1000);
    }
</script>

<div class="container flex-col w-full flex-center p-4 max-sm:px-2">
    <div class="card min-w-[500px] max-md:min-w-full flex-center flex-col p-4">
        <div class="text-lg font-bold">Create Room</div>

        <hr class="my-3 w-full" />

        <form
            class="w-full flex-center gap-3 flex-col"
            use:form
            on:submit|preventDefault={handleSubmit}
        >
            <label class="label w-full">
                <span>Name</span>
                <input
                    class="input max-md:text-sm"
                    type="text"
                    placeholder="my-room"
                    name="roomName"
                    class:input-error={!$form.roomName?.valid &&
                        $form.roomName?.touched}
                />
            </label>

            <label class="label w-full">
                <span>Description</span>
                <input
                    class="input max-md:text-sm"
                    type="text"
                    placeholder="Friends Talk"
                    name="description"
                    class:input-error={!$form.description?.valid &&
                        $form.description?.touched}
                />
            </label>

            <label class="label w-full">
                <span>Visibility</span>
                <select name="visibility" required class="select">
                    <option value="UNLISTED">Unlisted</option>
                    <option value="PUBLIC">Public</option>
                    <option value="PRIVATE">Private</option>
                </select>
            </label>

            {#if $form.visibility?.value === "PRIVATE"}
                <label class="label w-full">
                    <span>Password</span>
                    <input
                        class="input max-md:text-sm"
                        type="password"
                        placeholder="the-secret"
                        name="password"
                        class:input-error={!$form.password?.valid &&
                            $form.password?.touched}
                    />
                </label>
            {/if}

            <div class="mt-6" />
            <!-- actions -->
            <div class="flex justify-start w-full">
                <button
                    disabled={!$form.valid}
                    class="btn max-md:btn-sm variant-ghost-primary"
                    >Create</button
                >
            </div>
        </form>
    </div>
</div>
