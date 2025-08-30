function initNav() {
    const navItems = document.querySelectorAll("nav a")
    navItems.forEach((item) => {
        const sectionId = item.getAttribute("href")?.substring(1)
        item.addEventListener('click', (e) => {
            e.preventDefault()
            document.getElementById(sectionId)?.scrollIntoView({behavior: "smooth", block: "start"})
            history.replaceState(null, '', window.location.pathname + window.location.search);
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    initNav()
    initWaves()
    initSparkle()
    initPeek()
})