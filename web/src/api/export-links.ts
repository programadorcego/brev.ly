import { api } from "../utils/axios";

interface exportLinksResponse {
    reportUrl: string,
}

export async function exportLinks() {
const response = await api.post<exportLinksResponse>("/links/export");

return response.data;
}