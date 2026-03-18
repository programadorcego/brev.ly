import { Logo } from "../components/logo";
import logo from "../assets/logo.svg";
import { Card, CardContent } from "../components/ui/card";
import { useIncreaseHit } from "../hooks/link";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RedirectPage() {
	const { data: link, error, isLoading } = useIncreaseHit();
	const navigate = useNavigate();

	useEffect(() => {
		if (error?.response?.status === 404) navigate("/not-found")
	}, [navigate, error]);

	useEffect(() => {
		if (link?.originalLink) {
			setTimeout(() => {
				window.location.replace(link.originalLink);
			}, 5000);
		}
	}, [link]);

	return (
		<div
			data-slot="redirect-page"
			className="flex min-h-screen items-center justify-center bg-muted/40 p-6"
		>
			<Card className="w-full max-w-md text-center">
				<CardContent className="flex flex-col items-center gap-4 py-10">
					<Logo src={logo} className="justify-center" />

					{link && !isLoading && (
						<>
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
										href={link.originalLink}
										className="font-medium text-primary underline-offset-2 hover:underline"
									>
										Acesse aqui
									</a>
								</span>
							</div>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	)
}