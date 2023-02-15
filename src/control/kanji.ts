import { getRandomInt } from '../utils/funcs';

/* eslint-disable @typescript-eslint/naming-convention */
export interface KanjiDetails {
    strokes: number;
    grade: number;
    freq: number;
    jlpt_old: number;
    jlpt_new: number;
    meanings: string[];
    readings_on: string[];
    readings_kun: string[];
    wk_level: number;
    wk_meanings: string[];
    wk_readings_on: string[];
    wk_readings_kun: string[];
    wk_radicals: string[];
}

export interface Kanji {
    key: string;
    value: KanjiDetails;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const KanjiList = require('../../resources/kanji.json');

export const getJlptLevelKanji = (level: number): Kanji[] => {
    const returnKanji: Kanji[] = [];
    Object.keys(KanjiList).forEach(kanjiChar => {
        const kanji = KanjiList[kanjiChar] as KanjiDetails;
        if (kanji.jlpt_new !== null && kanji.jlpt_new === level) {
            returnKanji.push({ key: kanjiChar, value: kanji });
        }
    });
    return returnKanji;
};

export const JLPT5 = getJlptLevelKanji(5);
export const JLPT4 = getJlptLevelKanji(4);
export const JLPT3 = getJlptLevelKanji(3);
export const JLPT2 = getJlptLevelKanji(2);
export const JLPT1 = getJlptLevelKanji(1);

export const GetJlpt = (level: number): Kanji[] => {
    switch (level) {
        case 1: return JLPT1;
        case 2: return JLPT2;
        case 3: return JLPT3;
        case 4: return JLPT4;
        case 5:
        default: return JLPT5;
    }
};

export const GetRandomKanjiGroup = (kanjiLevel: Kanji[]): Kanji => {
    const kanjis = Object.keys(kanjiLevel);
    return kanjiLevel[kanjis[getRandomInt(kanjis.length)]];
};

export const GetRandomKanjiLevel = (jlptLevel: number): Kanji => {
    const jlpt = GetJlpt(jlptLevel);
    const kanjis = Object.keys(GetJlpt(jlptLevel));
    return jlpt[kanjis[getRandomInt(kanjis.length)]];
};
