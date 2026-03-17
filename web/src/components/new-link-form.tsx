import { Input } from "@base-ui/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/Label";
import { Button } from "./ui/button";

export function NewLinkForm() {
	return (
		<Card data-slot="new-link-form">
			<CardHeader>
				<CardTitle>Novo link</CardTitle>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor="original">LINK ORIGINAL</Label>
					<Input id="original" placeholder="linkedin.com/in/myprofile" />
				</div>

				<div className="flex flex-col gap-1.5">
					<Label htmlFor="short">LINK ENCURTADO</Label>
					<Input id="short" placeholder="brev.ly/Linkedin-Profile" />
				</div>

				<Button className="mt-2 w-full">Salvar link</Button>
			</CardContent>
		</Card>
	)
}