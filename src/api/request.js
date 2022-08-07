import {
  useMutation,
  useQuery,
  useInfiniteQuery,
} from "react-query";
import http from "lib/https";
import axios from "axios"
const page_size = 20;
const baseUrl = 'https://ccendpoints.herokuapp.com/api/v2/study'




const getRequest = ({ pageParam = 1, queryKey }) => {
  const start_date = queryKey[1]?.start_date;
  const end_date = queryKey[2]?.end_date;
  const status = queryKey[3]?.status;
  const searchParam = queryKey[4]?.searchParam;
  const isFilter = queryKey[5]?.isFilter;
  const isSearch = queryKey[6]?.isSearch;
  if (((!!start_date && !!end_date) || !!status) && isFilter) {
    return axios.get(
      `${baseUrl}/requests?pageNumber=${pageParam}&pageSize=${page_size}&start_date=${start_date}&end_date=${end_date}&status=${status}&state=filtering`,
    )
  } else if (!!searchParam && isSearch) {
    return axios.get(
      `${baseUrl}/requests?pageNumber=${pageParam}&pageSize=${page_size}&searchParam=${searchParam}&state=searching`,
    )
  } else {
    return axios.get(
      `${baseUrl}/requests?pageNumber=${pageParam}&pageSize=${page_size}`,
    )
  }



}
export const useGetRequestQuery = ({ start_date, end_date, status, searchParam, isFilter, isSearch }) => {
  const { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isError } = useInfiniteQuery(
    ['requests', { start_date }, { end_date }, { status }, { searchParam }, { isFilter }, { isSearch }],
    getRequest,
    {
      getNextPageParam: (lastPage, pages) => {
        const maxPage = lastPage.data.total_count / page_size;
        const nextPage = pages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;

      },
    }
  );
  return { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage, isError };
};




export const useGetPropertyQueryById = (id) => {
  const { data, isLoading } = useQuery("property", () =>
    http.get(`/${id}`)
  );
  return { data, isLoading };
};

export const useLoginMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post("/login", payload);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useSignUpMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post("/signUp", payload);
  });
  return { mutate, mutateAsync, isLoading };
};

export const useCreateOrderMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post(
      `/create-order/${payload?.id}`,
      {
        name: payload?.name,
        email: payload?.email,
        phone: payload?.phone,
        message: payload?.message,
      }
    );
  });
  return { mutate, mutateAsync, isLoading };
};

const fetchOrders = (pageNumber) =>
  http.get(`/orders?pageNumber=${pageNumber}&pageSize=${10}`);
export const useGetOrder = (pageNumber) => {
  const {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    isPreviousData,
  } = useQuery(["orders", pageNumber], () => fetchOrders(pageNumber), {
    enabled: !!pageNumber,
    staleTime: 30000,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    refetch,
    isFetching,
    isError,
    error,
    isPreviousData,
  };
};

export const useAddPropertyMutation = () => {
  const { mutate, mutateAsync, isLoading } = useMutation((payload) => {
    return http.post(
      `/create-property`,
      payload
    );
  });
  return { mutate, mutateAsync, isLoading };
};

export const useGetTotalCountQuery = () => {
  const { data, isLoading } = useQuery("count", () =>
    axios.get(`${baseUrl}/count`)
  );
  return { data, isLoading };
};
