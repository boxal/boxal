const scrape = require('./scraper_utils/scrape');

const scrapeImageFileLinks = scrape(getImageFileLinks);
const scrapePreviewImageSrcset = scrape(getPreviewImageSrcset);

function doStuff(albumPage) {
  return scrapeImageFileLinks(albumPage)
    .flatMap(x => x)
    .flatMap(scrapePreviewImageSrcset);
}

function getImageFileLinks() {
  const anchors = document.getElementsByClassName('file-link');
  return [].map.call(anchors, (element) => element.getAttribute('href'));
}

function getPreviewImageSrcset() {
  const image = document.getElementsByClassName('preview-image')[0];
  return image.getAttribute('srcset');
}

module.exports = doStuff;
