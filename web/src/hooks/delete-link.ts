import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLink } from "../api/delete-link";
import { toast } from "sonner";

export function useDeleteLink() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (shortLink: string) => {
            await deleteLink({ shortLink });
        },

        onSuccess: () => {
            toast("Link removido com sucesso");
            
            queryClient.invalidateQueries({ queryKey: ["links"] });
        },

        onError: () => {
            toast.error("Erro ao deletar");
        },
    });
}