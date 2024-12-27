type MethodTypes = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestOptions<T> {
    method: MethodTypes;
    url: string;
    data?: T;
    headers?: Record<string, string>;
}

const baseURL = import.meta.env.VITE_API_BASE_URL

async function httpRequest<T, V>(options: RequestOptions<T>): Promise<V> {
    // Get the options from the request
    const { method, url, data, headers = {} } = options;

    // Create the headers
    const fetchHeaders = new Headers({
        "Content-Type": "application/json",
        ...headers,
    });

    // Create the request
    const request: RequestInit = {
        method,
        credentials: "include",
        headers: fetchHeaders,
    };

    // Add the body to the request
    if (data) {
        if (data instanceof FormData) {
            request.body = data;
            fetchHeaders.delete("Content-Type");
        } else {
            request.body = JSON.stringify(data);
        }
    }

    // Fetch the response
    const response = await fetch(baseURL + url, request);

    // Throw an error React Query can handle
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw { status: response.status, message: error.error || error.message || "Network response was not ok" };
    }

    if (response.status === 204) {
        return {} as V; // Handle empty responses
    }

    return response.json();
}

// Function to build the query string
function buildQueryString(params: Record<string, string | number | boolean>): string {
    // Create a new URLSearchParams object
    const query = new URLSearchParams();

    // Loop over the params object
    Object.keys(params).forEach((key) => {
        const value = params[key];
        if (value !== null && value !== undefined) {
            query.append(key, encodeURIComponent(value.toString()));
        }
    });
    return query.toString();
}

// Function to create the http service
export default function httpService(baseURL = "") {
    return {
        // Define the get method
        get: async <V>(url: string, params?: Record<string, string | number | boolean>): Promise<V> => {
            const queryString = params ? `?${buildQueryString(params)}` : "";
            return httpRequest<null, V>({ method: "GET", url: baseURL + url + queryString });
        },
        // Define the post method
        post: <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> =>
            httpRequest<T, V>({ method: "POST", url: baseURL + url, data, headers }),
        // Define the put method
        put: <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> =>
            httpRequest<T, V>({ method: "PUT", url: baseURL + url, data, headers }),
        // Define the patch method
        patch: <T, V>(url: string, data: T, headers?: Record<string, string>): Promise<V> =>
            httpRequest<T, V>({ method: "PATCH", url: baseURL + url, data, headers }),
        // Define the delete method
        delete: <V>(url: string, headers?: Record<string, string>): Promise<V> =>
            httpRequest<null, V>({ method: "DELETE", url: baseURL + url, headers }),
    };
}
