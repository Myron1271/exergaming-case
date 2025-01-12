<template>
    <div>
        <h1>Welkom {{ userName }}!</h1>
    </div>
</template>
<script>
import Modal from '@/components/Modal.vue';
export default {
    name: 'AccountView',
    components: {Modal},
    data() {
        return {
            userName: localStorage.getItem("userName"),
        }
    }
    
}
</script>
<style>
    
</style>