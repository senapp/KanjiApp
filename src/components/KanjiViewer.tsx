/* eslint-disable no-console */
import * as React from 'react';
import { useReducer, useState } from 'react';
import { Button } from './Button';
import { GetJlpt, GetJlptCount, GetJlptCountArchive, GetRandomKanjiLevel, Kanji } from '../control/kanji';
import { Dictionary, Word, archiveWord, dearchiveWord, getArchived } from '../control/japanese';
import css from './KanjiViewer.module.css';
import { JapWord } from './JapWord';
import { isMobile } from '../utils/funcs';

type Props = {
    archiveMode: boolean;
}

export const KanjiViewer: React.FC<Props> = ({ archiveMode }) => {
    const [currentLevel, setCurrentLevel] = useState(-1);
    const [currentKanji, setCurrentKanji] = useState<Kanji>();
    const [wordsVisible, setWordsVisible] = useState(false);
    
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const mobileView = isMobile();

    const renderLevel = (level: number): JSX.Element => (
        <div>
            <div className={css.jlptNumber}>{GetJlptCountArchive(level)}/{GetJlptCount(level)}</div>
            <Button
                className={level !== currentLevel ? css.buttonYellow : ''}
                disable={level === currentLevel}
                label={`JLPT ${level}`}
                onClick={() => {
                    setCurrentLevel(level);
                    setCurrentKanji(GetRandomKanjiLevel(level, archiveMode));
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

            return <>{output.sort(
                (a, b) => b.jlpt - a.jlpt || (a.meaning + a.word).length - (b.meaning + b.word).length
            ).map(item => <JapWord mobile={mobileView} word={item.word} reading={item.reading} meaning={item.meaning}></JapWord>)}</>;
        }

        return <>
            Words are either the meaning of Kanji or it is an old Kanji
        </>;
    };

    return (
        <>
            {currentKanji && (
                <div className={css.kanjiBox}>
                    <div title='Meaning' className={css.kanjiMeaning}>
                        {currentKanji.value.meanings.join(', ')}
                    </div>
                    <div className={css.kanjiContainer}>
                        <div className={css.kanjiDetailsContainer}>
                            {currentKanji.value.readings_kun.length > 0 &&<div title='Kun Reading' className={css.kanjiDetailsLeft}>
                                {currentKanji.value.readings_kun.join('\n')}
                            </div>}
                        </div>
                        <div className={css.kanji}>{currentKanji.key}</div>
                        <div className={css.kanjiDetailsContainer}>
                            {currentKanji.value.readings_on.length > 0 && <div title='On Reading' className={css.kanjiDetailsRight}>
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
                                setCurrentKanji(GetRandomKanjiLevel(currentLevel, archiveMode));
                                setWordsVisible(false);
                            }}
                        />
                        <Button
                            className={`${css.buttonBlue}`}
                            label={wordsVisible ? 'Hide Words' : `See Words`}
                            onClick={() => setWordsVisible(!wordsVisible)}
                        />
                        <Button
                            className={`${css.buttonYellow}`}
                            label={getArchived(currentKanji) ? "Remove Archive" : "Archive"}
                            onClick={() => {
                                getArchived(currentKanji) ? dearchiveWord(currentKanji) : archiveWord(currentKanji);
                                forceUpdate();
                            }}
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
