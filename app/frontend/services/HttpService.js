import axios from 'axios';

/**
 * Wrapper for the HTTP Request library.
 */
export default class HttpService {
  /**
   * Wrapper for a GET request.
   * @param {String} url The API url with a GET method.
   * @return {Object} The data from the API url.
   */
  async get(url) {
    const response = await axios.get(url);
    return await response.data;
  }
}
