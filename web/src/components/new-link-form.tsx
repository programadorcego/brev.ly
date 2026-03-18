import { Input } from "@base-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/Label";
import { Button } from "./ui/button";
import { z } from "zod";
import { useCreateLink } from "../hooks/create-link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createLinkFormSchema = z.object({
	originalLink: z.string().url(),
	shortLink: z.string().regex(/^[a-zA-Z0-9_\-]+$/),
});

type CreateLinkFormSchema = z.infer<typeof createLinkFormSchema>;

export function NewLinkForm() {
	const { mutate: createLink } = useCreateLink();

	const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateLinkFormSchema>({
		resolver: zodResolver(createLinkFormSchema),
		defaultValues: {
			originalLink: "",
			shortLink: "",
		},
	});

	async function handleCreateLink(data: CreateLinkFormSchema) {
		await createLink({
			originalLink: data.originalLink,
			shortLink: data.shortLink,
		})
	}

	return (
		<Card data-slot="new-link-form">
			<CardHeader>
				<CardTitle>Novo link</CardTitle>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(handleCreateLink)}>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="originalLink">LINK ORIGINAL</Label>
						<Input id="original" placeholder="linkedin.com/in/myprofile" {...register("originalLink")} />
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="shortLink">LINK ENCURTADO</Label>
						<Input id="short" placeholder="brev.ly/Linkedin-Profile" {...register("shortLink")} />
					</div>

					<Button className="mt-2 w-full" disabled={isSubmitting}>Salvar link</Button>
				</form>
			</CardContent>
		</Card>
	)
}