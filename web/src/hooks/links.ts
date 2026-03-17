import { useQuery } from "@tanstack/react-query";
import { fetchLinks } from "../api/fetch-links";
import { useSearchParams } from "react-router";

export function useLinks() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

    return useQuery({
        queryKey: ["links"],
        queryFn: () => fetchLinks({ page }),
    });
}