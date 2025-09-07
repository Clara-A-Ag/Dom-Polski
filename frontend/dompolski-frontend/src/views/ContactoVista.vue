<template>
<ContactoComponent></ContactoComponent>
<ContactoFormulario></ContactoFormulario>
</template>

<script>
import ContactoComponent from '../components/ContactoComponente/ContactoComponent.vue';
import ContactoFormulario from '@/components/ContactoComponente/ContactoFormulario.vue';    
export default {
name: 'ContactoVista',
components: {
    ContactoComponent, ContactoFormulario
}
}

</script>

<style scoped>
</style>