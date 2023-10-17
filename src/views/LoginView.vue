
<script>
export default {
    data() {
        return {
            email: "",
            password: ""
        };
    }
};
</script>
<template>
    <div class="flex justify-center items-center h-[88vh] bg-[#F5F5F5]">
        <div class="rounded-md w-1/2 h-96 bg-white drop-shadow-md flex overflow-hidden">
            <div class="w-1/2 px-8 py-8">
                <h2 class="text-center text-xl font-semibold mb-6">Login</h2>
                <div class="flex flex-col mb-4">
                    <label for="" class="mb-2">Email</label>
                    <input v-model="email" type="text" class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                </div>
                <div class="flex flex-col mb-4">
                    <label for="" class="mb-2">Password</label>
                    <input v-model="password" type="text"
                        class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                </div>
                <button class="w-full py-2 bg-blue-500 text-white text-sm rounded-md">Login</button>
            </div>
            <div
                class="w-1/2 bg-cover bg-[url('https://static.republika.co.id/uploads/images/inpicture_slide/walaupun-penamaan-dua-prodi-ini-hampir-sama-keduanya_210810172832-656.jpeg')]">
            </div>
        </div>
    </div>
</template>