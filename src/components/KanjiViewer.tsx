/* eslint-disable no-console */
import * as React from 'react';
import { useState } from 'react';
import { Button } from './Button';
import { GetJlpt, GetRandomKanjiLevel, Kanji } from '../control/kanji';
import { Dictionary, Word } from '../control/japanese';
import css from './KanjiViewer.module.css';

export const KanjiViewer: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState(-1);
    const [currentKanji, setCurrentKanji] = useState<Kanji>();
    const [wordsVisible, setWordsVisible] = useState(false);

    const renderLevel = (level: number): JSX.Element => (
        <div>
            <div className={css.jlptNumber}>{GetJlpt(level).length}</div>
            <Button
                className={level !== currentLevel ? css.buttonYellow : ''}
                disable={level === currentLevel}
                label={`JLPT ${level}`}
                onClick={() => {
                    setCurrentLevel(level);
                    setCurrentKanji(GetRandomKanjiLevel(level));
                    setWordsVisible(false);
                }}
            />
        </div>
    );

    const createKanjiWordView = (): JSX.Element => {
        if (currentKanji) {
            const filtered = (Dictionary.filter(item => item.word.includes(currentKanji.key)));
            const output: Word[] = [];
            filtered.forEach(element => {
                if (output.filter(item => item.word === element.word && item.meaning.toLowerCase() === element.meaning.toLowerCase()).length === 0) {
                    output.push(element);
                }
            });

            return <div>{output.sort(
                (a, b) => b.jlpt - a.jlpt || (a.meaning + a.word).length - (b.meaning + b.word).length
            ).map(item => `「${item.word}${item.meaning}」`)}</div>;
        }

        return <>
            Words are either the meaning of Kanji or it is an old Kanji
        </>;
    };

    return (
        <>
            {currentKanji && (
                <div className={css.kanjiBox}>
                    <div className={css.kanjiMeaning}>
                        {currentKanji.value.meanings.join(', ')}
                    </div>
                    <div className={css.kanjiContainer}>
                        <div className={css.kanjiDetailsContainer}>
                            {currentKanji.value.readings_kun.length > 0 &&<div className={css.kanjiDetailsLeft}>
                                {currentKanji.value.readings_kun.join('\n')}
                            </div>}
                        </div>
                        <div className={css.kanji}>{currentKanji.key}</div>
                        <div className={css.kanjiDetailsContainer}>
                            {currentKanji.value.readings_on.length > 0 && <div className={css.kanjiDetailsRight}>
                                {currentKanji.value.readings_on.join('\n')}
                            </div>}
                        </div>
                    </div>
                    { wordsVisible && <div className={css.kanjiWords}>{createKanjiWordView()}</div>}
                    <div className={css.buttonBar}>
                        <Button
                            className={`${css.buttonGreen}`}
                            label={`Next`}
                            onClick={() => {
                                setCurrentKanji(GetRandomKanjiLevel(currentLevel));
                                setWordsVisible(false);
                            }}
                        />
                        <Button
                            className={`${css.buttonBlue}`}
                            label={wordsVisible ? 'Hide Words' : `See Words`}
                            onClick={() => setWordsVisible(!wordsVisible)}
                        />
                    </div>
                </div>
            )}
            <div className={css.jlptControl}>
                {renderLevel(5)}
                {renderLevel(4)}
                {renderLevel(3)}
                {renderLevel(2)}
                {renderLevel(1)}
            </div>
        </>
    );
};
