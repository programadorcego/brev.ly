import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'
import { Link2 } from 'lucide-react'

export interface EmptyListProps extends ComponentProps<'div'> {}

export function EmptyList({ className, ...props }: EmptyListProps) {
	return (
		<div
			data-slot="empty-list"
			className={twMerge(
				'flex flex-col items-center justify-center gap-4 py-16 text-center',
				className
			)}
			{...props}
		>
			<Link2 className="size-6 text-muted-foreground" />

			<span className="text-xs uppercase tracking-wide text-foreground-subtle">
				Ainda não existem links cadastrados
			</span>
		</div>
	)
}