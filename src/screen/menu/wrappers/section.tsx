import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useCallback, useMemo, useRef } from 'react';
import throttle from 'lodash/throttle';
import Slider from '../slider';
import { useActions } from '@/hooks/useActions';

const MIN_MENU_WIDTH = 400;
const MAX_MENU_WIDTH = 600;

interface SectionProps {
    children?: React.ReactNode;
}

export const Section = ({ children }: SectionProps) => {
    const user = useTypedSelector((state) => state.user);
    const { setMenuWidth } = useActions();

    const menuW = useMemo(() => `${user.ui?.menuW}`, [user.ui.menuW]);

    const throttledSetWidth = useMemo(
        () =>
            throttle((width: number) => {
                setMenuWidth(`${width}px`);
            }, 60),
        [setMenuWidth]
    );

    const handler = useCallback(
        (e: React.MouseEvent<Element, MouseEvent> | MouseEvent) => {
            const x = e.pageX;
            const newWidth = Math.max(MIN_MENU_WIDTH, Math.min(MAX_MENU_WIDTH, x));
            throttledSetWidth(newWidth);
        },
        [throttledSetWidth]
    );

    return (
        <section
            className={`h-full bg-theme-side-bg-color w-grid-side-w
            relative transition-[width]
            ${user.ui.shouldHideMenu ? 'hide' : ''}`}
            style={menuW && window.innerWidth > 1275 ? { width: menuW } : {}}
        >
            <Slider side="right" handler={handler} />
            { children }  
        </section>
    );
};
