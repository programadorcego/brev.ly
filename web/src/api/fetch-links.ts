import { api } from "../utils/axios";

export interface Link {
    id: string,
    originalLink: string,
    shortLink: string,
    hits: number,
    createdAt: Date,
}

interface FetchLinksRequest {
    page?: number,
}

interface FetchLinksResponse {
    links: Link[],
    total: number,
}

export async function fetchLinks({ page }: FetchLinksRequest) {
    const response = await api.get<FetchLinksResponse>("/links", {
        params: {
            page
        },
    });

    return response.data;
}