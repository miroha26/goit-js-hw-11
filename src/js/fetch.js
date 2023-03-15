const axios = require('axios').default;
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

export default class FetchInfo {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 20;
  }

  async fetchInfo() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '33559977-5d8a81e40738ffd9c726fd9c1';
    const searchParams = new URLSearchParams({
      key: KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.perPage,
      page: this.page,
    });

    Loading.circle();
    try {
      const response = await axios.get(URL, { params: searchParams });
      Loading.remove();
      this.page += 1;
      return response.data;
    } catch {
      Report.info('The request was not processed');
      Loading.remove();
    }
  }

  numberOfResponses() {
    return this.perPage;
  }

  resetSearch() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  currentPage() {
    return this.page - 1;
  }
}
