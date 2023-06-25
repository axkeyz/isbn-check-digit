import HttpService from '@/services/HttpService.js';

const API_ROOT = import.meta.env.VITE_API_ROOT;
const http = new HttpService();

/**
 * Wrapper for ISBN Barcode APIs.
 */
export default class BarcodeApi {
  supportedTypes = {
    'isbn13': 12,
  };

  /**
     * Sets the ISBN Barcode type & value
     * @param {String} type
     * @param {String} isbn
     */
  constructor(type, isbn = '') {
    this.type = type;
    this.isbn = isbn;
    this.error = '';
  }

  /**
   * Sets the ISBN type
   * @param {String} newType The ISBN type
   */
  set type(newType) {
    if (!Object.keys(this.supportedTypes).includes(newType)) {
      throw new Error('ISBN type not supported');
    }
    this._type = newType;
    this.totalDigits = this.supportedTypes[newType];
  }

  /**
   * Returns the ISBN type
   * @return {String} type The ISBN type
   */
  get type() {
    return this._type;
  }

  /**
   * Sets the ISBN value
   * @param {String} isbn The ISBN value
   */
  set isbn(isbn) {
    this._isbn = isbn;
  }

  /**
   * Gets the ISBN value
   * @return {String} isbn The ISBN value
   */
  get isbn() {
    return this._isbn;
  }

  /**
   * Gets the ISBN value with the check digit.
   * @return {String} The ISBN value with the check digit.
   */
  async withCheckDigit() {
    return await http.get(`${API_ROOT}/barcodes?type=${this.type}&isbn=${this.isbn}`);
  }
}

/**
 * Wrapper for ISBN13 APIs.
 */
export const isbn13 = new BarcodeApi('isbn13');
