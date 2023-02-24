import { getRandomInt } from '../utils/funcs';
import { ConvertHiraganaToKatakana } from './japanese';

/* eslint-disable @typescript-eslint/naming-convention */
export interface KanjiDetails {
  kanji: string;
  grade: number;
  jlpt: number;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
}

export interface Kanji {
  key: string;
  value: KanjiDetails;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const KanjiList = require('../../resources/kanji.json');

export const getJlptLevelKanji = (level: number): Kanji[] => {
    const returnKanji: Kanji[] = [];
    Object.keys(KanjiList).forEach((kanjiChar) => {
        const kanji = KanjiList[kanjiChar] as KanjiDetails;
        if (kanji.jlpt !== null && kanji.jlpt === level || kanji.jlpt === null && 0 === level) {
            kanji.readings_kun = kanji.readings_kun.map(kun => kun.replace('.', '〜').replace('-', '〜'));
            kanji.readings_on = kanji.readings_on.map(on => ConvertHiraganaToKatakana(on).replace('.', '〜').replace('-', '〜'));
            returnKanji.push({ key: kanji.kanji, value: kanji });
        }
    });
    return returnKanji;
};

export const JLPT5 = getJlptLevelKanji(5);
export const JLPT4 = getJlptLevelKanji(4);
export const JLPT3 = getJlptLevelKanji(3);
export const JLPT2 = getJlptLevelKanji(2);
export const JLPT1 = getJlptLevelKanji(1);
export const JLPT0 = getJlptLevelKanji(0);
export const FullKanjiList = JLPT5.concat(JLPT4).concat(JLPT3).concat(JLPT2).concat(JLPT1).concat(JLPT0);

export const GetJlpt = (level: number): Kanji[] => {
    switch (level) {
        case 0:
            return JLPT0;
        case 1:
            return JLPT1;
        case 2:
            return JLPT2;
        case 3:
            return JLPT3;
        case 4:
            return JLPT4;
        case 5:
        default:
            return JLPT5;
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
