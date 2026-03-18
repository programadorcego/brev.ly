import { api } from "../utils/axios";
import type { Link } from "./fetch-links";

interface IncreaseHitRequest {
    shortLink: string,
}

export async function increaseHit({ shortLink }: IncreaseHitRequest) {
    const response = await api.patch<Link>(`/links/${shortLink}`);

    return response.data;
}