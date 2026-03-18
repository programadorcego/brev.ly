import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { increaseHit } from "../api/increase-hit";
import type { Link } from "../api/fetch-links";
import type { AxiosError } from "axios";

export function useIncreaseHit() {
    const { shortLink } = useParams<{ shortLink: string }>();
    return useQuery<Link, AxiosError>({
        queryKey: ["links", shortLink],
        queryFn: () => increaseHit({ shortLink: shortLink! }),
        enabled: !!shortLink,
        retry: false,
        staleTime: 0,
        gcTime: 0,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
}