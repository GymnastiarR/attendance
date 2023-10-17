<script setup>
import IconClose from './icons/IconClose.vue';
import IconError from './icons/IconError.vue';
import { useErrorStore } from '../stores/error';

const errorStore = useErrorStore();

const { error } = errorStore;
import { store } from '../store';
// export default {
//     components: {
//         IconError,
//         IconClose
//     },
//     props: [ 'error' ],
//     data() {
//         return {
//             store
//         };
//     },
// };
</script>

<!-- <template>
    <div class="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 flex justify-center items-center">
        <div
            class="bg-white rounded-md w-[90%] md:[70%] lg:w-1/2 lg:h-1/2 xl:w-1/3 flex items-center py-12 px-8 flex-col relative">
            <span class="mb-4">
                <IconError />
            </span>
            <p class="text-xl mb-3">Kesalahan</p>
            <span class="absolute -top-3 -right-3 bg-white p-1 rounded-full" @click="error = null">
                <IconClose />
            </span>
            <div>
                <p v-for="message in (error).replace('ValidationError:', '').split('.')" class="mb-2">{{
                    message
                }}</p>
            </div>
        </div>
    </div>
</template> -->