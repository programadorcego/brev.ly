import { api } from "../utils/axios";

export interface CreateLinkRequest {
    originalLink: string,
    shortLink: string,
}

export async function createLink({ originalLink, shortLink }: CreateLinkRequest) {
const response = await api.post("/links", {
    originalLink,
    shortLink
});

return response.data;
}