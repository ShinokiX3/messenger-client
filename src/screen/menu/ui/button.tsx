import { IconButton } from '@/components/button/button';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface BackButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export const BackButton: React.FC<BackButton> = (props) => {
    return (
        <IconButton style={{ padding: '20px' }} {...props}>
            <FontAwesomeIcon
                className="text-color-message text-large-font-size search-ico-rotate-effect"
                icon={faArrowLeft}
            />
        </IconButton>
    );
};
