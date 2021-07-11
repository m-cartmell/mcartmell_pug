import Isotope from 'isotope-layout';
const gallery = document.getElementById('gallery');
const filters = document.querySelectorAll('.filter');

if (gallery) {
  const iso = new Isotope(gallery, {
    itemSelector: '.item',
    layoutMode: 'fitRows',
  });

  filters.forEach((item) => {
    item.addEventListener('click', (e) => {
      const filter = e.target.getAttribute('data-filter');

      // Clears all active states
      filters.forEach((item) => item.classList.remove('active'));

      // Sets active state
      e.target.classList.add('active');
      iso.arrange({ filter });
    });
  });
}
