<template>
<div>
<div class="img">
    <img src="/imagenes/polaquita1.png" alt="polaca" class="img-polaca">
    
<div class="Descripcion">
<p class="bienvenidos">¡Bienvenidos a Dom Polski Santa Fe!</p> 
<p>Somos una asociación civil sin fines de lucro que busca promover la cultura polaca en Argentina. Nuestro objetivo es preservar y difundir las 
tradiciones, costumbres y valores de la comunidad polaca en Santa Fe y sus alrededores.</p>
<p>En Dom Polski, organizamos eventos culturales, clases de idioma polaco, talleres de cocina tradicional y actividades recreativas para todas 
las edades. Nuestro espacio está abierto a todos aquellos interesados en conocer más sobre la rica herencia cultural polaca.</p>
<p>¡Únete a nosotros y descubre la magia de la cultura polaca en Santa Fe!</p>
<br>
<a class="direccion">Dirección: <a href="https://share.google/c6dt38SD54IBFe4TN" target="_blank" rel="noopener noreferrer" class="direccion">Av. Aristóbulo del Valle 5444, Santa Fe, Argentina, 3000</a></a>
</div>
<img src="/imagenes/polaquito 1.png" alt="polaco" class="img-polaco">
</div>
</div>
</template>

<script>


</script>

<style scoped>
.Descripcion {
background-color: #efedd6;
font-style: 'lora', serif;
font-weight: solid;
color:rgb(51, 6, 6);
padding-top: 15px;
text-align: center;
padding-left: 5px;
padding-right: 5px;
padding-bottom: 15px;
margin-left: 25px;
margin-right: 25px;
border: 2px solid #ce2323;
border-radius: 25px;
}
.direccion{
    display: center;
    justify-content: center;
}
a{
    color: #ee1c19; /* Cambia el color del enlace */
    text-decoration: none; /* Elimina el subrayado del enlace */    
}
p{
margin-bottom: 15px;
}
.bienvenidos{
font-size: 20px;
font-weight: bold;
color:#ee1c19;
}
div{
padding-top: 5px;
padding-bottom: 5px;
}
.img{
    display: flex;
background-color: #efedd6;
justify-content: space-between; /* Distribuye el espacio entre los elementos */
align-items: center; /* Alinea verticalmente los elementos al centro (opcional) */
    
}
img{
    width: 150px;
    height: 250px;
    margin: 1px;
    display: flex; /* Convierte el contenedor en un flex container */

}
.img-polaca{
    justify-content: left;
    align-items: left;
}
.img-polaco{
    justify-content: right;
    align-items: right;
}
</style>