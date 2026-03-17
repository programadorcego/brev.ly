import { LinksList } from "../components/links-list"
import { Logo } from "../components/logo"
import { NewLinkForm } from "../components/new-link-form"
import logo from "../assets/logo.svg";
import { useLinks } from "../hooks/links";

export function Home() {
	const { data: result, isLoading } = useLinks();

	return (
		<div className="min-h-screen bg-muted/40 p-6">
			<div className="mx-auto flex max-w-5xl flex-col gap-6">
				<Logo src={logo} />

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<NewLinkForm />
					
					{result && !isLoading && <LinksList links={result.links} />}
				</div>
			</div>
		</div>
	)
}