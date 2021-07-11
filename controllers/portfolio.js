const fs = require('fs');

// Returns page filenames object
const getFiles = () => {
  return fs.readdirSync(`./content`);
};

// Returns prev/next page
const navPages = (query) => {
  const pageList = getFiles();
  const page = pageList.find((path) => path.endsWith(`${query}.json`));
  const index = pageList.indexOf(page);
  const maxIndex = pageList.length - 1;
  const prevPage = pageList[index - 1];
  const nextPage = pageList[index + 1];
  const getId = (file) => {
    return file.split('_')[1].replace(/\.json$/, '');
  };
  const prev = index > 0 ? getId(prevPage) : null;
  const prevClient = index > 0 ? getContent(prev).client : null;
  const next = index < maxIndex ? getId(nextPage) : null;
  const nextClient = index < maxIndex ? getContent(next).client : null;

  return {
    prev: prev ? { id: prev, client: prevClient } : null,
    next: next ? { id: next, client: nextClient } : null,
  };
};

// Sources page content
const getContent = (query) => {
  const file = fs
    .readdirSync(`./content`)
    .find((file) => file.endsWith(`${query}.json`));
  const data = fs.readFileSync(`./content/${file}`);

  return JSON.parse(data);
};

exports.newPage = (req, res, next) => {
  const query = req.params.id;
  const pageList = getFiles().toString();
  const foundPage = pageList.includes(query);

  if (foundPage) {
    const content = getContent(query);
    const { client, heading, description, text, images } = content;
    const { prev, next } = navPages(query);
    const templateData = {
      title: `${client} | ${heading}`,
      description,
      id: query,
      heading,
      client,
      text,
      images,
      prev,
      next,
    };

    res.render('portfolio', templateData);
  } else {
    const err = new Error();
    err.status = 404;
    next(err);
  }
};