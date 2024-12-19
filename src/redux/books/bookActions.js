// action types
export const SET_BOOKS = "SET_BOOKS";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_SORT_CONFIG = "SET_SORT_CONFIG";
export const SET_PAGINATION = "SET_PAGINATION";

// action creators
export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});

export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setSortConfig = (config) => ({
  type: SET_SORT_CONFIG,
  payload: config,
});

export const setPagination = (pagination) => ({
  type: SET_PAGINATION,
  payload: pagination,
});
