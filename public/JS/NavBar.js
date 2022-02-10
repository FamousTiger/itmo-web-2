window.addEventListener('load',function () {

    document.querySelectorAll('nav a').forEach(navItem => {
        if (document.location.href.split('?')[0] === navItem.href)
        {
            navItem.classList.add("active");
        }
    })

},false)
