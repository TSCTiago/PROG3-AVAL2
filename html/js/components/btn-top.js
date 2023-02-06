const btn = document.getElementById("btn-top")
btn.addEventListener("click", function () {
    window.scrollTo(0, 0)
})

document.addEventListener('scroll', ocult)

function ocult() {
    if (window.scrollY > 100) {
        btn.style.display = "flex"
    } else {
        btn.style.display = "none"
    }
}

const toggleMenu = document.querySelector('.menu-btn')
const navbar = document.querySelector('.menu')
toggleMenu.addEventListener('click', function () {

    navbar.classList.toggle('active')
})