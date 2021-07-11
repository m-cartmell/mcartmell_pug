const mix = require('laravel-mix');

mix
  .js('assets/js/**/*', 'public/js/main.js')
  .sass('assets/scss/main.scss', 'public/css')
  .sourceMaps(false, 'source-map')
  .browserSync({
    proxy: 'localhost:3000',
    files: ['./public', './views'],
    ignore: ['./public/images/**/.DS_Store'],
    port: 5000,
    notify: false,
  });
