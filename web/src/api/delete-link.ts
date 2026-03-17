import { api } from "../utils/axios";

interface DeleteLinkRequest {
    shortLink: string,
}

export async function deleteLink({ shortLink }: DeleteLinkRequest) {
    const response = await api.delete(`/links/${shortLink}`);

    return response.data;
}