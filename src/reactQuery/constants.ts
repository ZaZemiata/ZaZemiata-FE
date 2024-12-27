// Note: This file is used to store all the constants used in the react-query module

// urlKeys: This object is used to store all the keys used in the url object in the useQuery hook
export const urlKeys = {
    get: {
        crawledData: "/api/crawled-data/filter",
    },
    post: {
        login: "/login",
    },
};

// queryKeys: This object is used to store all the keys used in the queryKey object in the useQuery hook
export const queryKeys = {
    crawledData: "Crawled Data",
};
