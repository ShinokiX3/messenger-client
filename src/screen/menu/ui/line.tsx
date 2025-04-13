import React, { useMemo } from 'react';

interface Line {
    className?: string;
    color?: string,
    size?: 'l' | 'xl',
    rounded?: boolean;
}

const heights = {
    'l': '6px',
    'xl': '10px',
}

const Line: React.FC<Line> = ({ className, color = 'balck', size = 'l', rounded = false }) => {
    const styles = useMemo<React.CSSProperties>(() => ({
        backgroundColor: color,
        height: heights[size],
        borderRadius: rounded ? '2px' : 'initial'
    }), [color, size, rounded])

    return (
        <div style={styles} className={`w-full ${className}`} />
    );
};

export default Line;