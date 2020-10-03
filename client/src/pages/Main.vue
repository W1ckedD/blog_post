<template>
    <h2>Main page</h2>
</template>

<script>
import { mapGetters } from 'vuex';
import { router } from '../main';
export default {
    name: 'MainPage',
    computed: mapGetters(['isLoggedIn']),
    created() {
        if(!this.isLoggedIn) {
            router.replace('/login')
        }
    }
}
</script>