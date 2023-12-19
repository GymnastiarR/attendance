<script setup>
import SectionView from '../../SectionView.vue';
import { storeToRefs } from 'pinia';
import TextInput from '../../atoms/TextInput.vue';
import { IconAddCircleFill, IconCloseFill } from '../../icons';
import { useShopStore } from '../../../stores/shop';

const shopStore = useShopStore();

const { shop } = storeToRefs( shopStore );

</script>
<template>
    <SectionView title="Buat Kantin">
        <form action="" class="w-full">
            <div class="flex flex-col mb-3">
                <TextInput label="Nama Kantin" v-model:value="shop.name" name="nama-kantin" />
            </div>
            <button @click.prevent="shopStore.store"
                class="px-6 py-2 text-sm text-white bg-blue-500 rounded-md bg-blue">Buat
                Toko</button>
        </form>
    </SectionView>
</template>