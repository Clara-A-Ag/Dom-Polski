<template>
    <body>

    <form @submit.prevent="enviarFormulario">
        <h2>Formulario de Contacto</h2>
    <select v-model="tipo">
<option disabled value="">-- Seleccionar destino de gmail --</option>
<option value="oficial">Oficial</option>
<option value="artistico">Audiovisuales</option>
    </select>

        <div class="form-input">
    <input type="text" v-model="nombre" placeholder="Nombre Completo" required />
    </div>
    <div class="form-input">
    <input type="email" v-model="email" placeholder="Tu Gmail" required />
    </div>
    <div class="form-input">
    <textarea v-model="mensaje" placeholder="Mensaje" required></textarea>
    </div>
    <button type="submit">Enviar</button>
    </form>
</body>
</template>

<script>
export default {
  data() {
    return {
      tipo: "",
      nombre: "",
      email: "",
      mensaje: ""
    };
  },
  methods: {
    async enviarFormulario() {
      try {
        const res = await fetch("http://localhost:4000/enviar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: this.tipo,
            nombre: this.nombre,
            email: this.email,
            mensaje: this.mensaje
          })
        });

        const data = await res.json();
        if (data.ok) {
          alert("Mensaje enviado con éxito");
          this.tipo = "";
          this.nombre = "";
          this.email = "";
          this.mensaje = "";
        } else {
          alert("Error al enviar mensaje");
        }
      } catch (err) {
        console.error(err);
        alert("Error en la conexión con el servidor");
      }
    }
  }
};
</script>

<style scoped>
body {
    background-color: #ecbfd5;
    /* Usa flexbox para centrar todo el contenido del body */
    display: flex;
    justify-content: center; /* Centra horizontalmente */
    align-items: center; /* Centra verticalmente */
    min-height: 100vh; /* Asegura que el body ocupe toda la altura de la ventana */
    margin: 0;
    font-family: Arial, sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
    text-transform: uppercase;
}

form {
    background-color: #fff;
    padding: 30px;
    max-width: 500px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    /* Usa flexbox en el formulario para alinear sus elementos */
    display: flex;
    flex-direction: column; /* Apila los elementos verticalmente */
    align-items: center; /* Centra los elementos horizontalmente dentro del form */
    
}

.form-input, select {
    width: 100%;
    margin-bottom: 15px;
}

input, textarea, select {
    width: 100%;
    box-sizing: border-box;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: #f9f9f9;
    font-family: Arial, sans-serif;
}

textarea {
    resize: vertical;
    min-height: 100px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #9d1414;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    margin-top: 10px;
}

button:hover {
    background-color: #7b1010;
}
</style>