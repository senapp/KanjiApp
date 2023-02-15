/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import css from './KanjiViewer.module.css';
import { Button } from './Button';
import { GetJlpt, GetRandomKanjiLevel, Kanji } from '../control/kanji';
import { ConvertHiraganaToKatakana } from '../control/japanese';

export const KanjiViewer: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentKanji, setCurrentKanji] = useState<Kanji>();

    const renderLevel = (level: number): JSX.Element => <div>
        <div className={css.jlptNumber}>{GetJlpt(level).length}</div>
        <Button
            className={level !== currentLevel ? css.buttonYellow : ''}
            disable={level === currentLevel}
            label={`JLPT ${level}`}
            onClick={() => {
                setCurrentLevel(level);
                setCurrentKanji(GetRandomKanjiLevel(level));
            }}
        />
    </div>;

    return (<>
        {currentKanji && <div className={css.kanjiBox}>
            <div className={css.kanjiContainer}>
                <div className={css.kanjiDetails}>{'「' + currentKanji.value.readings_kun.map(item => item.replace('.', '〜')).join('」「') + '」'}</div>
                <div className={css.kanji}>{currentKanji.key}</div>
                <div className={css.kanjiDetails}>{'「' + currentKanji.value.readings_on.map(item => ConvertHiraganaToKatakana(item).replace('.', '〜')).join('」「') + '」'}</div>
            </div>
            <div className={css.kanjiMeaning}>{currentKanji.value.meanings.join(', ')}</div>
            <Button
                className={`${css.buttonGreen} ${css.kanjiNext}`}
                label={`Next`}
                onClick={() => setCurrentKanji(GetRandomKanjiLevel(currentLevel))}
            />
        </div>}
        <div className={css.jlptControl}>
            {renderLevel(5)}
            {renderLevel(4)}
            {renderLevel(3)}
            {renderLevel(2)}
            {renderLevel(1)}
        </div>
    </>);
};

