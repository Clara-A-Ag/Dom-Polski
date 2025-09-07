<template>
  <div class="info-container" :style="{ height: sectionHeight }">
    <div class="content">
      <!-- Niña a la izquierda -->
      <img
        src="/imagenes/polaquita1.png"
        alt="polaca"
        class="img-polaca fade-in-left"
      />

      <!-- Texto en el centro -->
      <div class="descripcion fade-in-up">
        <h2 class="bienvenidos">¡Bienvenidos a Dom Polski Santa Fe!</h2>
        <p>
          Somos una asociación civil sin fines de lucro que busca promover la
          cultura polaca en Argentina. Nuestro objetivo es preservar y difundir
          las tradiciones, costumbres y valores de la comunidad polaca en Santa
          Fe y sus alrededores.
        </p>
        <p>
          En Dom Polski, organizamos eventos culturales, clases de idioma
          polaco, talleres de cocina tradicional y actividades recreativas para
          todas las edades. Nuestro espacio está abierto a todos aquellos
          interesados en conocer más sobre la rica herencia cultural polaca.
        </p>
        <p>
          ¡Únete a nosotros y descubre la magia de la cultura polaca en Santa
          Fe!
        </p>
        <p class="direccion">
          Dirección:
          <a
            href="https://share.google/c6dt38SD54IBFe4TN"
            target="_blank"
            rel="noopener noreferrer"
          >
            Av. Aristóbulo del Valle 5444, Santa Fe, Argentina, 3000
          </a>
        </p>
      </div>

      <!-- Niño a la derecha -->
      <img
        src="/imagenes/polaquito 1.png"
        alt="polaco"
        class="img-polaco fade-in-right"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerHeight: 0
    };
  },
  mounted() {
    this.updateHeaderHeight();
    window.addEventListener("resize", this.updateHeaderHeight);

    const elements = document.querySelectorAll(
      ".fade-in-left, .fade-in-right, .fade-in-up"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateHeaderHeight);
  },
  methods: {
    updateHeaderHeight() {
      const header = document.querySelector(".main-header");
      this.headerHeight = header ? header.offsetHeight : 0;
    }
  },
  computed: {
    sectionHeight() {
      return `calc(100vh - ${this.headerHeight}px)`;
    }
  }
};
</script>

<style scoped>
.info-container {
  background-color: #efedd6;
  padding: 40px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}

.descripcion {
  flex: 1;
  max-width: 1000px;
  color: rgb(51, 6, 6);
  padding: 40px 50px;
  border-left: 6px solid #ce2323;
  border-right: 6px solid #ce2323;
  border-radius: 20px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  text-align: center;
  font-size: 1.4rem;
  line-height: 1.9;
}

.descripcion p {
  margin-bottom: 20px;
}

.bienvenidos {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ee1c19;
  margin-bottom: 25px;
}

.direccion {
  font-weight: bold;
}

a {
  color: #ee1c19;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  text-decoration: underline;
  color: #b51210;
}

.img-polaca,
.img-polaco {
  width: 280px;
  height: auto;
  object-fit: contain;
}

/* Animaciones */
.fade-in-left,
.fade-in-right,
.fade-in-up {
  opacity: 0;
  transition: all 1s ease;
}

.fade-in-left {
  transform: translateX(-50px);
}

.fade-in-right {
  transform: translateX(50px);
}

.fade-in-up {
  transform: translateY(50px);
}

.visible {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

/* Responsivo */
@media (max-width: 768px) {
  .content {
    flex-direction: column;
    text-align: center;
  }

  .descripcion {
    border-left: none;
    border-right: none;
    border-top: 5px solid #ce2323;
    border-bottom: 5px solid #ce2323;
    font-size: 1.15rem;
    padding: 25px;
  }

  .img-polaca,
  .img-polaco {
    width: 180px;
  }
}

/* Ajustes para pantallas con poca altura (ej. netbooks) */
@media (max-height: 800px) {
  .info-container {
    height: auto !important; /* deja que crezca según contenido */
    padding: 20px;
  }
  .descripcion {
    font-size: 1.1rem;
    padding: 20px;
  }
  .bienvenidos {
    font-size: 1.8rem;
  }
  .img-polaca,
  .img-polaco {
    width: 200px;
  }
}
</style>
