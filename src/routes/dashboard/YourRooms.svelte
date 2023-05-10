<script>
    import RoomCard from "@/routes/dashboard/RoomCard.svelte";
</script>

<div class="p-4">
    <div class="flex justify-between">
        <h4>Your Rooms</h4>
        <button class="btn btn-sm variant-filled-primary">Create</button>
    </div>
    <hr class="mt-2 mb-5" />
    <div class="flex flex-wrap gap-2">
        <RoomCard
            room={{
                name: "general",
                createdAt: new Date(),
                updatedAt: new Date(),
                id: "123456789",
                ownerId: "123456789",
                description: "General Talk",
            }}
        />
    </div>
</div>
