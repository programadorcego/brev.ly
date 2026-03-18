import logo from "../assets/404.svg";
import { Logo } from "../components/logo";
import { Card, CardContent } from "../components/ui/card";

export function NotFoundPage() {
	return (
		<div
			data-slot="not-found-page"
			className="flex min-h-screen items-center justify-center bg-muted/40 p-6"
		>
			<Card className="w-full max-w-md text-center">
				<CardContent className="flex flex-col items-center gap-4 py-10">
					<Logo src={logo} className="justify-center" />

					<h1 className="text-lg font-semibold text-foreground">
						Link não encontrado
					</h1>

					<p className="text-sm text-foreground-subtle">
						O link que você está tentando acessar não existe, foi removido
						ou é uma URL inválida. Saiba mais em{' '}
						<a
							href="/"
							className="font-medium text-primary underline-offset-2 hover:underline"
						>
							brev.ly
						</a>
						.
					</p>
				</CardContent>
			</Card>
		</div>
	)
}