import './footer.css'

export const footer = (nodoPadre) => {
  const footerElement = document.createElement('footer')
  footerElement.classList = 'main-footer'
  nodoPadre.appendChild(footerElement)
  const divFooter = document.createElement('div')
  const myPFooter = document.createElement('p')
  footerElement.appendChild(divFooter)
  divFooter.appendChild(myPFooter)
  myPFooter.textContent =
    '© Copyright    2024 - Proyecto 3 - Pinterest - Pablo serrano'
}
