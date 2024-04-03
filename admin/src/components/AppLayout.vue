<template>
    <div v-if="!!currentUser" class="min-h-full bg-gray-200 flex">
        <Sidebar :class="{ '-ml-[160px]': !sidebarOpened }" />

        <div class="flex-1">
            <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
            <main class="p-6">
                <RouterView></RouterView>
            </main>
        </div>
    </div>
    <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">
        <Spinner />
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import store from "@/store";
import router from "@/router";
import { tokenKey } from "@/lib/token";

import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Spinner from "./core/Spinner.vue";

const sidebarOpened = ref(true);
const currentUser = computed(() => store.state.user.data);

function toggleSidebar() {
    sidebarOpened.value = !sidebarOpened.value;
}

function updateSidebarState() {
    sidebarOpened.value = window.outerWidth > 768;
}

onMounted(() => {
    store.dispatch("getUser").catch(() => {
        // get user error
        store.commit("setToken", null);
        sessionStorage.removeItem(tokenKey);
        router.push("/login");
    });
    updateSidebarState();
    window.addEventListener("resize", updateSidebarState);
});
onUnmounted(() => {
    window.addEventListener("resize", updateSidebarState);
});
</script>
