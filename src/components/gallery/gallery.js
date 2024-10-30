import { createCard } from '../card/card'

import './gallery.css'

export const createGallery = (gallerySection, images) => {
  // Limpiar la galería
  gallerySection.innerHTML = ''

  // Recorrer las imágenes y crear una tarjeta para cada una
  images.forEach((imageData) => {
    const card = createCard(imageData)
    gallerySection.appendChild(card)
  })
}
