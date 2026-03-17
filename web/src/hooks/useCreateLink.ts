import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink, type CreateLinkRequest } from "../api/create-link";

export function useCreateLink() {
    const queryClient = useQueryClient();

    return useMutation({
mutationFn: async ({ originalLink, shortLink }: CreateLinkRequest) => await createLink({ originalLink, shortLink }),
onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["links"] });
},
    });
}