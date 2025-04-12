import { useMemo } from "react";

export type TextSize = 'm' | 'l' | 'xl';
export type TextColor = 'gray' | 'default';

interface TextProps {
    className?: string;
    size?: TextSize;
    bold?: boolean;
    wrap?: boolean;
    color?: TextColor;
    children: string | React.ReactNode;
}

const sizes = {
    'm': '14px',
    'l': '16px',
    'xl': '22px',
}

const colors = {
    'gray': 'var(--color-message)',
    'default': 'white'
}

export const Text = (props: TextProps) => {
    const { 
        className,
        bold = false,
        size = 'l',
        wrap = false,
        color = 'default',
        children,
        ...other
    } = props;

    const styles = useMemo<React.CSSProperties>(() => ({
        fontSize: sizes[size],
        fontWeight: bold ? 600 : 400,
        color: colors[color],
        overflowWrap: wrap ? "anywhere" : "initial"
    }), [size, bold, wrap])

    return (
        <p style={styles} className={`${className}`} {...other}>
            { children }
        </p>
    );
};
