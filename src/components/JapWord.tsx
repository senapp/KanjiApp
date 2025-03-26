import * as React from 'react';
import css from './JapWord.module.css';

type Props = {
    word: string;
    reading: string;
    meaning: string;
    mobile: boolean;
    level: number;
};

export const JapWord: React.FC<Props> = ({word, reading, meaning, mobile, level}) => (
    <div  className={mobile ? css.wordContainerMobile : css.wordContainer}>
        <div className={css.reading}>{reading}</div>
        <div className={css.word}>{word}</div>
        <div className={css.meaning}>{meaning}</div>
        <div className={css.level}>{"JLPT N" + level}</div>
    </div>
);
