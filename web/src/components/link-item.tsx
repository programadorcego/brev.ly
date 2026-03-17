import { Copy, Trash2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'
import { Button } from './ui/button'

export interface LinkItemProps extends ComponentProps<'div'> {
	title: string
	url: string
	clicks: number
}

export function LinkItem({ title, url, clicks, className, ...props }: LinkItemProps) {
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
				<span className="text-sm font-medium text-primary">{title}</span>
				<span className="text-xs text-foreground-subtle">{url}</span>
			</div>

			<div className="flex items-center gap-3">
				<span className="text-xs text-foreground-subtle">
					{clicks} acessos
				</span>

				<div className="flex gap-1">
					<Button variant="ghost" size="sm" aria-label="Copiar link">
						<Copy />
					</Button>

					<Button variant="ghost" size="sm" aria-label="Excluir link">
						<Trash2 />
					</Button>
				</div>
			</div>
		</div>
	)
}