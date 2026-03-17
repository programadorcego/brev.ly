import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export interface LogoProps extends ComponentProps<'div'> {
	src?: string
}

export function Logo({ className, src = '/logo.svg', ...props }: LogoProps) {
	return (
		<div
			data-slot="logo"
			className={twMerge('flex items-center gap-2', className)}
			{...props}
		>
			<img
				src={src}
				alt="brev.ly"
				className="h-8 w-auto"
			/>

			<span className="sr-only">brev.ly</span>
		</div>
	)
}