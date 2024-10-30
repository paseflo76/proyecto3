import { Button } from '../button/button'
import './card.css'

export const createCard = (imageData) => {
  const card = document.createElement('div')
  card.classList.add('card')

  // Crear la imagen
  const img = document.createElement('img')
  img.src = imageData.urls.small
  img.alt = imageData.alt_description || 'Imagen de Unsplash'

  // Crear el nombre del autor
  const author = document.createElement('h3')
  author.textContent = `Autor: ${imageData.user.name}`

  // Usar el componente Button
  const visitar = Button(card, 'Visitar', 'tertiary', 'm')
  visitar.classList.add('visita')

  // Añadir el evento para redirigir a Unsplash
  visitar.addEventListener('click', () => {
    window.open(imageData.links.html, '_blank') // Abre la página de la imagen en una nueva pestaña
  })

  // Añadir imagen, autor y botón a la tarjeta
  card.appendChild(img)
  card.appendChild(author)
  card.appendChild(visitar)

  return card
}
