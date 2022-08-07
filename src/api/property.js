import {
  useMutation,
  useQuery,
  useInfiniteQuery,
} from "react-query";
import http from "lib/https";
const page_size = 18;




const getPropety = ({ pageParam = 1, queryKey }) => {
  const location = queryKey[1]?.location;
  const type = queryKey[2]?.type ;
  const price = queryKey[3]?.price ;
  const isFilter = queryKey[4]?.isFilter
  if (!!location && !!type && !!price && isFilter) {
    return http.get(
      `/all?pageNumber=${pageParam}&pageSize=${page_size}&country=${location}&type=${type}&price=${price}`,
    )
  } else {
    return http.get(
      `/all?pageNumber=${pageParam}&pageSize=${page_size}`,
    )
  }


}
export const useGetPropertyQuery = ({ location, type, price,isFilter }) => {
  const { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage ,isError} = useInfiniteQuery(
    ['properties', { location }, { type }, { price },{ isFilter }],
    getPropety,
    {
      getNextPageParam: (lastPage, pages) => {
        const maxPage = lastPage.data.total_count / page_size;
        const nextPage = pages.length + 1;
        return nextPage <= maxPage ? nextPage : undefined;

      },
    }
  );
  return { data, isSuccess, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage ,isError};
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

export const useGetPropertyQueryOption = () => {
  const { data, isLoading } = useQuery("options", () =>
    http.get(`/option`)
  );
  return { data, isLoading };
};
