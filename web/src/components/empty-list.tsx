import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'
import { Link2 } from 'lucide-react'

export interface EmptyListProps extends ComponentProps<'div'> {}

export function EmptyList({ className, ...props }: EmptyListProps) {
	return (
		<div
			data-slot="empty-list"
			className={twMerge(
				'flex flex-col items-center justify-center gap-3 py-10 text-center',
				className
			)}
			{...props}
		>
			<div className="flex size-10 items-center justify-center rounded-full bg-muted">
				<Link2 className="size-4 text-muted-foreground" />
			</div>

			<div className="flex flex-col gap-1">
				<span className="text-sm font-medium text-foreground">
					Nenhum link ainda
				</span>

				<span className="text-xs text-foreground-subtle">
					Cole um link acima para começar
				</span>
			</div>
		</div>
	)
}