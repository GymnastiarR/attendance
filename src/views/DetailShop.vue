<script setup>
import SideMenu from '../components/SideMenu.vue';
import AppLayout from '../layouts/AppLayout.vue';

</script>

<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="text-sm font-semibold">Detail Kantin</h1>
                </div>
                <div>
                    <div>Name : Gymnastiar's Canteen</div>
                </div>
            </div>
            <div class="bg-white py-6 rounded-md drop-shadow-md mb-2 overflow-auto">
                <p class="px-8 mb-4">Produk</p>
                <table class="w-full">
                    <thead>
                        <tr class="bg-gray-200">
                            <th class="px-2 py-1 ">No</th>
                            <th class="text-left px-2 py-1 ">Nama</th>
                            <th class="text-left px-2 py-1 ">Harga</th>
                            <th class="text-left px-2 py-1 ">JUmla</th>
                            <th class="text-left px-2 py-1 ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-center">1</td>
                            <td class="px-2 py-2">Batagor</td>
                            <td class="px-2 py-2">RP. 10000</td>
                        </tr>
                        <tr>
                            <td class="text-center">1</td>
                            <td class="px-2 py-2">Batagor</td>
                            <td class="px-2 py-2">RP. 10000</td>
                        </tr>
                        <tr>
                            <td class="text-center">1</td>
                            <td class="px-2 py-2">Batagor</td>
                            <td class="px-2 py-2">RP. 10000</td>
                        </tr>
                        <tr>
                            <td class="text-center">1</td>
                            <td class="px-2 py-2">Batagor</td>
                            <td class="px-2 py-2">RP. 10000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    </div>
</template>