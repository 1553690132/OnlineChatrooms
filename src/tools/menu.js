export function clickMenu(card, menu) {
    card.addEventListener("contextmenu", function (e) {
        e.preventDefault()
        if (document.querySelector('.menu') !== 1) { }
        menu.style.display = 'block'
        menu.style.left = e.offsetX + 'px'
        menu.style.top = e.offsetY + 'px'
        if (card.offsetWidth - e.offsetX - menu.offsetWidth <= 0) {
            menu.style.left = card.offsetWidth - menu.offsetWidth + 'px'
        }
    })

    window.addEventListener('click', () => {
        menu.style.display = 'none'
    })
}