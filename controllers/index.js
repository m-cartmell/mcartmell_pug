const fs = require('fs');

// Sources gallery data
const getGalleryDetails = () => {
  const content = fs.readdirSync('./content');

  return content.map((file) => {
    const data = fs.readFileSync(`./content/${file}`);
    const content = JSON.parse(data);

    return {
      id: file.split('_')[1].replace(/\.json$/, ''),
      client: content.client,
      categories: content.categories,
      gallery: content.images.gallery,
    };
  });
};

// Returns first iteration of each category
const getCategories = () => {
  const data = getGalleryDetails();
  const categories = [];

  data.map((item) => {
    categories.push(...item.categories);
  });

  return [...new Set(categories.sort())];
};

// Converts an array to a string
const prepString = (data) => {
  return data.toString().replace(/\s+/g, '-').toLowerCase().replace(/,/g, ' ');
};

exports.newPage = (req, res, next) => {
  const templateData = {
    id: 'index',
    title: `Designer + Developer | Matt Cartmell`,
    description:
      'A multidisciplinary graphic designer and developer, delivering projects across email, print, social and web.',
    content: getGalleryDetails(),
    sortButtons: getCategories(),
    prepString,
  };

  res.render('index', templateData);
};
