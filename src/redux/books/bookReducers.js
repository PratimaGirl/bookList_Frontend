import { SET_BOOKS, SET_SEARCH_QUERY, SET_SORT_CONFIG, SET_PAGINATION } from "./bookActions";

// Initial state
const initialState = {
    books: [],  // Ensure books is an empty array by default
    searchQuery: "",
    sortConfig: { key: "", direction: "" },
    currentPage: 0,
    perPageCount: 5,
  };
  

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case SET_SORT_CONFIG:
      return {
        ...state,
        sortConfig: action.payload,
      };
    case SET_PAGINATION:
      return {
        ...state,
        currentPage: action.payload.currentPage,
        perPageCount: action.payload.perPageCount,
      };
    default:
      return state;
  }
};

export default bookReducer;
