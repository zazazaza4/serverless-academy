const Url = require('../models/Url');
const { APIError } = require('../constants/errors');
const generateUrl = require('../utils/url/generateUrl');

class UrlService {
  async createShortUrl(origUrl, baseURL) {
    let existingUrl = await Url.findOne({ origUrl });

    if (existingUrl) {
      throw new APIError('URL already has a short version');
    }

    const shortUrl = generateUrl();

    const newUrl = new Url({
      origUrl,
      shortUrl,
      date: new Date(),
    });

    await newUrl.save();

    return { shortUrl: `${baseURL}/${shortUrl}` };
  }

  async getOriginalUrl(shortUrl) {
    const url = await Url.findOne({ shortUrl });

    if (!url) {
      throw new APIError('Short URL not found');
    }

    return url.origUrl;
  }
}

module.exports = new UrlService();
