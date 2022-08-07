import create from "zustand";

const useGlobalStore = create((set) => ({
  data: {
    start_data: 'all',
    end_date: 'all',
    status: 'all',
    searchParam: '',
    isFilter: false,
    isSearch: false,
    property_admin: localStorage.getItem("property_admin")
      ? JSON.parse(localStorage.getItem("property_admin"))
      : null,
  },
  updateFilterParam: ({ start_data, end_date, status, isFilter, isSearch }) =>
    set((state) => ({
      ...state,
      data: { ...state.data, start_data, end_date, status, isFilter, isSearch },
    })),

  SIGNIN: (payload) =>
    set((state) => ({
      ...state,
      data: { ...state.data, property_admin: payload },
    })),

  SIGNOUT: () =>
    set((state) => ({
      ...state,
      data: { ...state.data, property_admin: null },
    }))
}));

export default useGlobalStore;
