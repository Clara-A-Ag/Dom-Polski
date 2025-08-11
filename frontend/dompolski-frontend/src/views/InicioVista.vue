<template>
<div>
<BodyComponent></BodyComponent>
</div>
</template>



<script>
// ref: Una función de Vue para crear "referencias reactivas".
// Cuando el valor de contenidoInicio.value cambia, Vue automáticamente actualiza la interfaz.
import { ref, onMounted } from 'vue';
// Importamos Axios para hacer las peticiones HTTP
import axios from 'axios';
import BodyComponent from '@/components/InicioComponentes/BodyComponent.vue';

export default{
    name: 'InicioVista',
    components: { BodyComponent },

setup() {
    const contenidoInicio = ref([]);

    onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/inicio');
        contenidoInicio.value = response.data;
    } catch (error) {
        console.error('Error al cargar el contenido de inicio:', error);
    }
    });

    return {
    contenidoInicio
    };
}
};



// Definimos una variable reactiva llamada contenidoInicio, inicialmente un array vacío.
//const contenidoInicio = ref([]);

// onMounted: Es un "hook" del ciclo de vida de Vue.
// El código dentro de onMounted se ejecuta AUTOMÁTICAMENTE cuando el componente
// ha sido montado en el DOM (es decir, cuando ya está visible en la página).
//onMounted(async () => {
//try {
    // Hacemos la petición GET a nuestro backend.
    // await: Espera a que la petición se complete antes de pasar a la siguiente línea.
  //  const response = await axios.get('http://localhost:3000/api/inicio');

    // response.data contiene los datos JSON que nos envió el backend.
    // Actualizamos la variable reactiva contenidoInicio. Vue detectará este cambio
    // y automáticamente volverá a renderizar la lista <ul> con los nuevos datos.
    //contenidoInicio.value = response.data;
//} catch (error) {
    // Si algo sale mal (ej. el backend no está corriendo, error de red),
    // capturamos el error y lo mostramos en la consola del navegador.
  //  console.error('Error al cargar el contenido de inicio:', error);
//}
//});



</script>

<style>



</style>