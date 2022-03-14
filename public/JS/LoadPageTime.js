(() => {
  window.onload = () => {
    const timer = Math.round(performance.now());
    const currentText = document.getElementById('time').innerHTML;
    document.getElementById(
      'time',
    ).innerHTML = `Время загрузки страницы: ${timer} ms (клиент) ${currentText}`;
  };
})();
