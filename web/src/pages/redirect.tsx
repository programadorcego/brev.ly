import { Logo } from "../components/logo";
import logo from "../assets/logo.svg";
import { Card, CardContent } from "../components/ui/card";

export function RedirectPage() {
	return (
		<div
			data-slot="redirect-page"
			className="flex min-h-screen items-center justify-center bg-muted/40 p-6"
		>
			<Card className="w-full max-w-md text-center">
				<CardContent className="flex flex-col items-center gap-4 py-10">
					<Logo src={logo} className="justify-center" />

					<h1 className="text-lg font-semibold text-foreground">
						Redirecionando...
					</h1>

					<div className="flex flex-col gap-1 text-sm text-foreground-subtle">
						<span>
							O link será aberto automaticamente em alguns instantes.
						</span>

						<span>
							Não foi redirecionado?{' '}
							<a
								href="#"
								className="font-medium text-primary underline-offset-2 hover:underline"
							>
								Acesse aqui
							</a>
						</span>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}