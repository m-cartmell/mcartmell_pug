const sharp = require('sharp');
const path = require('path');
const glob = require('glob');

const client = 'cmj';
const input = `./assets/images/full/${client}/*`;
const output = './assets/images/resized';
const sizes = [1180, 960, 640];

async function resize(file, size) {
  // Removes path and ext
  const name = path.basename(file, '.png');

  await sharp(file)
    .resize({ width: size })
    .jpeg({ progressive: true, quality: 75 })
    .toFile(`${output}/${name}-${size}.jpg`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));

  await sharp(file)
    .resize({ width: size })
    .webp({ quality: 75 })
    .toFile(`${output}/${name}-${size}.webp`)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
}

glob(input, (er, files) => {
  files.forEach((file) => {
    sizes.forEach((size) => {
      resize(file, size);
    });
  });
});
