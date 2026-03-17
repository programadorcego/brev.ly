import { twMerge } from 'tailwind-merge'
import type { ComponentProps } from 'react'

export interface LabelProps extends ComponentProps<'label'> { }

export function Label({ className, ...props }: LabelProps) {
    return (
        <label
            data-slot="label"
            className={twMerge(
                'text-xs font-medium text-foreground-subtle',
                className
            )}
            {...props}
        />
    )
}