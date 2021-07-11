const expand = document.querySelectorAll('.expand');

expand.forEach((btn) => {
  let show = false;

  btn.addEventListener('click', (e) => {
    const hiddenImage = e.currentTarget.previousElementSibling;
    show = !show;

    e.currentTarget.classList.toggle('rotate');

    if (show) hiddenImage.style.height = `${hiddenImage.scrollHeight}px`;
    else hiddenImage.style.height = 0;
  });
});
