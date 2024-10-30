import { Button } from './src/components/button/button'
import { footer } from './src/components/footer/footer'
import { createGallery } from './src/components/gallery/gallery'

import './style.css'

const header = document.createElement('header')
header.classList = 'flex-container'
const logoDiv = document.createElement('div')
logoDiv.classList.add('header_logo')
const logoImg = document.createElement('img')
logoImg.src = './assets/logopinteres-1.png'

logoDiv.appendChild(logoImg)
header.appendChild(logoDiv)

const incio = Button(header, 'Inicio', 'primary', 'l')
const explorar = Button(header, 'Explorar', 'secondary', 'l')
const crear = Button(header, 'crear', 'secondary', 'l')
const formulario = document.createElement('form')
const input = document.createElement('input')
const user = document.createElement('img')
const notificaciones = document.createElement('img')
const mensajes = document.createElement('img')

incio.classList.add('inico')
explorar.classList.add('explorar')
input.id = 'buscador'
input.type = 'text'
input.placeholder = '🔎 buscar'
user.id = 'usuario'
user.src = './assets/usuario.png'
mensajes.id = 'mensajes'
mensajes.src = './assets/Comment.png'
notificaciones.id = 'notificaciones'
notificaciones.src = './assets/bell.png'
header.appendChild(input)
header.appendChild(formulario)
header.appendChild(notificaciones)
header.appendChild(mensajes)
header.appendChild(user)

// Capturar el evento de búsqueda en el input
input.addEventListener('keyup', (event) => {
  // Renombrado a searchInput
  if (event.key === 'Enter') {
    const query = input.value.trim() // Renombrado a searchInput
    if (query) {
      searchPhotos(query) // Buscar fotos según el término ingresado
    } else {
      getRandomPhotos() // Si el input está vacío, mostrar imágenes aleatorias
    }
    input.value = ''
  }
})

document.body.appendChild(header)
logoDiv.addEventListener('click', () => {
  window.location.href = 'index.html'
})
incio.addEventListener('click', () => {
  window.location.href = 'index.html'
})

// URL para imágenes aleatorias
const randomPhotosUrl = `https://api.unsplash.com/photos/random?count=12&client_id=QvM_HK9N3l_nXVND7ieJspTZd4ijgCLvIAuyBQj37sg`

// Función para obtener imágenes aleatorias
const getRandomPhotos = () => {
  fetch(randomPhotosUrl)
    .then((response) => response.json())
    .then((data) => {
      const gallerySection = document.querySelector('.gallery')
      gallerySection.innerHTML = '' // Limpiar la galería antes de agregar nuevas imágenes
      createGallery(gallerySection, data) // Crear la galería con las imágenes aleatorias
    })
    .catch((error) =>
      console.error('Error al obtener imágenes aleatorias:', error)
    )
}

// Función para buscar imágenes según un término
const searchPhotos = (query) => {
  const searchPhotosUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=QvM_HK9N3l_nXVND7ieJspTZd4ijgCLvIAuyBQj37sg`

  fetch(searchPhotosUrl)
    .then((response) => response.json())
    .then((data) => {
      const gallerySection = document.querySelector('.gallery')
      gallerySection.innerHTML = '' // Limpiar la galería antes de agregar nuevas imágenes

      // Si no hay resultados, realizar una nueva búsqueda con la palabra "gatos"
      if (data.results.length === 0) {
        showSuggestionMessage(
          'No se encontraron imágenes para ' +
            query +
            ". Mostrando resultados para 'gatos'. Intenta usar otra frase o palabra."
        )
        searchPhotos('gatos') // Realizar nueva búsqueda con "gatos"
      } else {
        createGallery(gallerySection, data.results)
      }
    })
    .catch((error) => console.error('Error al buscar imágenes:', error))
}

// Función para mostrar el mensaje de sugerencia
const showSuggestionMessage = (message) => {
  let suggestionDiv = document.querySelector('.suggestion')
  if (!suggestionDiv) {
    suggestionDiv = document.createElement('div')
    suggestionDiv.classList.add('suggestion')
    document.body.insertBefore(suggestionDiv, document.body.firstChild) // Insertar el mensaje al inicio de la página
  }
  suggestionDiv.textContent = message
}

// Inicializar la galería con imágenes aleatorias al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  // Crear el contenedor de la galería si no existe
  let gallerySection = document.querySelector('.gallery')
  if (!gallerySection) {
    gallerySection = document.createElement('section') // Cambiado a section
    gallerySection.classList.add('gallery')
    document.body.appendChild(gallerySection)
  }

  // Obtener fotos aleatorias cuando se carga la página
  getRandomPhotos()

  footer(document.body)
})
