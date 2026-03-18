import { Copy, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'
import { Button } from './ui/button'
import { useDeleteLink } from '../hooks/delete-linkink'

export interface LinkItemProps extends ComponentProps<'div'> {
	original: string
	short: string
	hits: number
}

export function LinkItem({ original, short, hits, className, ...props }: LinkItemProps) {
	const { mutate: deleteLink, isPending } = useDeleteLink();

	const shortLink = `${import.meta.env.VITE_FRONTEND_URL}/${short}`;

	async function handleCopy() {
		await navigator.clipboard.writeText(shortLink);
	}

	return (
		<div
			data-slot="link-item"
			className={twMerge(
				'flex items-center justify-between gap-4 py-4',
				className
			)}
			{...props}
		>
			<div className="flex flex-col">
				<span className="text-sm font-medium text-primary">{shortLink}</span>
				<span className="text-xs text-foreground-subtle">{`${original} `}</span>
			</div>

			<div className="flex items-center gap-3">
				<span className="text-xs text-foreground-subtle">
					{hits} acessos
				</span>

				<div className="flex gap-1">
					<Button variant="ghost" size="sm" aria-label="Copiar link" onClick={handleCopy}>
						<Copy />
					</Button>

					<Button variant="ghost" size="sm" aria-label="Excluir link" onClick={() => deleteLink(short)} disabled={isPending}>
						<Trash2 />
					</Button>
				</div>
			</div>
		</div>
	)
}