import * as React from 'react';
import css from './App.module.css';
import { KanjiViewer } from './components/KanjiViewer';
import { useReducer, useState } from 'react';
import { Toggle } from './components/Toggle';
import { Button } from './components/Button';

export const App: React.FC = () => {
    const [archiveMode, setArchiveMode] = useState(false);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    return (
    <div className={css.container}>
        <div className={css.toolbarContainer}>
            <Button className={`${css.clearButton}`} label={"Clear Archive"} onClick={() => {
                localStorage.clear();
                forceUpdate();
            }} />
            <Toggle label='Archived Mode' onClick={setArchiveMode} />
        </div>
        <KanjiViewer archiveMode={archiveMode} />
    </div>);
};
