import { Download } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { EmptyList } from "./empty-list"
import { LinkItem } from "./link-item"
import type { Link } from "../api/fetch-links"

export interface LinksListProps {
	links: Link[]
}

export function LinksList({ links }: LinksListProps) {
	return (
		<Card data-slot="links-list">
			<CardHeader className="flex-row items-center justify-between">
				<CardTitle>Meus links</CardTitle>

				<Button variant="secondary" size="sm">
					<Download />
					Baixar CSV
				</Button>
			</CardHeader>

			<CardContent className="flex min-h-[200px] items-center justify-center">
				{links.length === 0 ? (
					<EmptyList />
				) : (
					<div className="flex w-full flex-col divide-y divide-border">
						{links.map((link) => (
							<LinkItem
								key={link.id}
								original={link.originalLink}
								short={link.shortLink}
								hits={link.hits}
							/>
						))}
					</div>
				)}
			</CardContent>
		</Card>
	)
}