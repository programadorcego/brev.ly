import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../api/delete-link";

export function useDeleteLink() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (shortLink: string) => {
            await deleteLink({ shortLink });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["links"] });
        },

        /*onError: () => {
            toast.error("Erro ao deletar");
        },*/
    });
}