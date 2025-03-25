import * as React from 'react';
import { useState } from 'react';
import css from './Toggle.module.css';

type Props = {
    label: string;
    onClick: (toggle: boolean) => void;
    startState?: boolean;
    className?: string;
    disable?: boolean;
}

export const Toggle: React.FC<Props> = ({ onClick, label, className = '', disable = false, startState = false }) => {
    const [toggled, setToggled] = useState(startState);

    const onToggle = (): void => {
        if (!disable) {
            setToggled(!toggled);
            onClick(!toggled);
        }
    };

    return (<div className={css.toggleContainer}>
        <div className={css.label}>
            {label}
        </div>
        <div className={`${css.toggle} ${className} ${toggled && css.toggled} ${disable && css.disable}`.trimEnd()} onClick={onToggle}>
        {"✓"}
        </div>
    </div>
    );
};
