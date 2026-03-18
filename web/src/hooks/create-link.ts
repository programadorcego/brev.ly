import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink, type CreateLinkRequest } from "../api/create-link";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export function useCreateLink() {
    const queryClient = useQueryClient();

    return useMutation({
mutationFn: async ({ originalLink, shortLink }: CreateLinkRequest) => await createLink({ originalLink, shortLink }),
onSuccess: () => {
    toast("Link criado com sucesso");
    
    queryClient.invalidateQueries({ queryKey: ["links"] });
},
onError(error: AxiosError) {
    if (error.response?.status === 409) {
        toast("Este link encurtado já existe")
    }
},
    });
}