(() => {
    window.onload = () => {
        const timer = (performance.now() / 1000).toFixed(3);
        document.getElementById("time").innerHTML= "Время загрузки страницы: " + timer + "c";
    };
})();
