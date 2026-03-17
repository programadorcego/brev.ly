import { LinksList } from "../components/links-list"
import { Logo } from "../components/logo"
import { NewLinkForm } from "../components/new-link-form"
import logo from "../assets/logo.svg";

export function Home() {
	const links = [
		{
			id: '1',
			title: 'brev.ly/Portfolio-Dev',
			url: 'devsite.portfolio.com.br/devname-123456',
			clicks: 30,
		},
		{
			id: '2',
			title: 'brev.ly/Linkedin-Profile',
			url: 'linkedin.com/in/myprofile',
			clicks: 15,
		},
	]

	return (
		<div className="min-h-screen bg-muted/40 p-6">
			<div className="mx-auto flex max-w-5xl flex-col gap-6">
				<Logo src={logo} />

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<NewLinkForm />
					<LinksList links={links} />
				</div>
			</div>
		</div>
	)
}