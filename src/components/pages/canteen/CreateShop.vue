<script setup>
import SectionView from '../../SectionView.vue';
import { storeToRefs } from 'pinia';
import TextInput from '../../atoms/TextInput.vue';
import { IconAddCircleFill, IconCloseFill } from '../../icons';
import { useShopStore } from '../../../stores/shop';

const shopStore = useShopStore();

const { shop } = storeToRefs( shopStore );

const addMenu = () => {
    shop.value.menus.push( { name: '', price: '' } );
};

const removeMenu = ( index ) => {
    shop.value.menus.splice( index, 1 );
}

</script>

<template>
    <SectionView title="Buat Kantin">
        <form action="" class="w-full">
            <div class="flex flex-col mb-3">
                <TextInput label="Nama Kantin" v-model:value="shop.name" name="nama-kantin" />
            </div>
            <div class="mx-3 mb-3">
                <div v-for="(menu, index) in shop.menus" class="mb-3">
                    <button @click.prevent="removeMenu(index)" class="flex items-center mb-1">
                        <span class="font-semibold mr-2">Menu {{ index + 1 }}</span>
                        <IconCloseFill fill="black" size="22" />
                    </button>
                    <div class="flex flex-col mb-1">
                        <TextInput v-model:value="menu.name" :name="`menu-name-${index}`" label="Nama Menu" />
                    </div>
                    <div class="flex flex-col mb-1">
                        <TextInput v-model:value="menu.price" :name="`price-${index}`" label="Harga" />
                    </div>
                </div>
                <button @click.prevent="addMenu" class="max-w-xs flex justify-center items-center rounded-md mb-3">
                    <span class="text-gray-900 mr-2">Tambah Menu</span>
                    <IconAddCircleFill fill="black" size="24" />
                </button>
            </div>
            <button @click.prevent="shopStore.store"
                class="bg-blue py-2 bg-blue-500 text-white px-6 rounded-md text-sm">Buat
                Toko</button>
        </form>
    </SectionView>
</template>