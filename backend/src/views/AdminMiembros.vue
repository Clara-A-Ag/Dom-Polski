<template>
  <div class="admin-panel">
    <h1>Panel de Administración de Miembros</h1>
    
    <form @submit.prevent="submitForm" class="form-miembro">
      <button type="submit">{{ editandoMiembro ? 'Guardar Cambios' : 'Agregar Miembro' }}</button>
    </form>
    
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Grupo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="miembro in miembros" :key="miembro.id">
          <td>{{ miembro.nombre }}</td>
          <td>{{ miembro.grupo }}</td>
          <td>
            <button @click="editar(miembro)">Editar</button>
            <button @click="eliminar(miembro.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/supabaseClient'; // Asegúrate de tener este archivo
import { v4 as uuidv4 } from 'uuid'; // Para nombres de archivo únicos

const miembros = ref([]);
const editandoMiembro = ref(null);
const fotoFile = ref(null);

const form = ref({
  nombre: '',
  cargo: '',
  grupo: '',
  orden: null
});

// Lógica de Supabase Storage
const handleFileUpload = (event) => {
  fotoFile.value = event.target.files[0];
};

const uploadPhoto = async () => {
  if (!fotoFile.value) return null;

  const fileName = `${uuidv4()}-${fotoFile.value.name}`;
  const { data, error } = await supabase.storage
    .from('fotos-miembros') // Nombre de tu bucket en Supabase
    .upload(fileName, fotoFile.value);

  if (error) {
    console.error('Error al subir la foto:', error);
    return null;
  }

  const { publicURL, error: publicURLError } = supabase.storage
    .from('fotos-miembros')
    .getPublicUrl(fileName);

  if (publicURLError) {
    console.error('Error al obtener la URL pública:', publicURLError);
    return null;
  }

  return publicURL;
};

// Lógica de la API
const fetchMiembros = async () => {
  const response = await fetch('/api/miembros');
  miembros.value = await response.json();
};

const submitForm = async () => {
  // 1. Subir la foto a Supabase Storage
  const fotoUrl = await uploadPhoto();
  if (!fotoUrl) {
    console.error('No se pudo subir la foto.');
    return;
  }

  // 2. Enviar los datos del miembro a tu API de Node.js
  const miembroData = { ...form.value, fotoUrl };

  if (editandoMiembro.value) {
    await fetch(`/api/miembros/${editandoMiembro.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(miembroData)
    });
  } else {
    await fetch('/api/miembros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(miembroData)
    });
  }
  // Resetear el formulario y actualizar la lista
  resetForm();
  fetchMiembros();
};

const editar = (miembro) => {
  editandoMiembro.value = miembro;
  form.value = { ...miembro };
};

const eliminar = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este miembro?')) {
    await fetch(`/api/miembros/${id}`, { method: 'DELETE' });
    fetchMiembros();
  }
};

const resetForm = () => {
  form.value = { nombre: '', cargo: '', grupo: '', orden: null };
  editandoMiembro.value = null;
  fotoFile.value = null;
};

onMounted(() => {
  fetchMiembros();
});
</script>