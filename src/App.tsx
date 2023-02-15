import * as React from 'react';
import css from './App.module.css';
import { KanjiViewer } from './components/KanjiViewer';

export const App: React.FC = () => (
    <div className={css.container}>
        <KanjiViewer />
    </div>
);
