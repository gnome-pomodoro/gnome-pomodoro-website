document.addEventListener('DOMContentLoaded', () => {
    // Menu
    const menuBurger = document.getElementById('header-burger');

    function openMenu() {
        let target = document.getElementById(menuBurger.dataset['target']);

        menuBurger.classList.add('is-active');
        target.classList.add('is-active');
    }

    function closeMenu() {
        let target = document.getElementById(menuBurger.dataset['target']);

        menuBurger.classList.remove('is-active');
        target.classList.remove('is-active');
    }

    function isMenuOpened() {
        return menuBurger.classList.contains('is-active');
    }

    menuBurger.addEventListener('click', () => {
        if (!isMenuOpened()) {
            openMenu();
            document.documentElement.classList.add('is-clipped');
            document.documentElement.scroll(0, 0)
        }
        else {
            closeMenu();
            document.documentElement.classList.remove('is-clipped');
        }
    });

    // Smooth scrolling
    function scrollToAnchor() {
        debugger;
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            let href = anchor.getAttribute('href');
            try {
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
                history.replaceState(null, '', href)
                event.preventDefault();
            } catch (error) {
                console.warn(error);

                // falls back to default behavior
            }
        });
    });
});
