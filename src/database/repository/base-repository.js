class BaseRepository {
  static getPaginateOptions(params, populate, sort, select) {
    const { page = 1, limit = 100, all } = params;
    const pagination = !['1', 'true', 'yes', 'on', true].includes(all);

    return {
      customLabels: {
        docs: 'data',
        totalPages: 'pageCount',
        limit: 'itemsPerPage',
        totalDocs: 'totalItems',
        prevPage: 'previousPage',
      },
      page,
      limit,
      pagination,
      select,
      populate,
      sort,
    };
  }
}

module.exports = BaseRepository;
