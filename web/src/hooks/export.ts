import { useQuery } from "@tanstack/react-query";
import { exportLinks } from "../api/export-links";

export function useExportUrl() {
    return useQuery({
        queryKey: ["export-links"],
        queryFn: exportLinks,
        enabled: false,
    });
}