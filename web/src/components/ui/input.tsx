import { tv, type VariantProps } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export const inputVariants = tv({
	base: [
		'w-full rounded-lg border bg-surface text-sm transition-colors',
		'placeholder:text-muted-foreground',
		'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
		'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
	],
	variants: {
		size: {
			sm: 'h-8 px-2 text-xs',
			md: 'h-10 px-3 text-sm',
			lg: 'h-11 px-4 text-base',
		},
	},
	defaultVariants: {
		size: 'md',
	},
})

export interface InputProps
	extends ComponentProps<'input'>,
		VariantProps<typeof inputVariants> {}

export function Input({ className, size, disabled, ...props }: InputProps) {
	return (
		<input
			data-slot="input"
			data-disabled={disabled ? '' : undefined}
			className={twMerge(inputVariants({ size }), className)}
			disabled={disabled}
			{...props}
		/>
	)
}