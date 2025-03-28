import { Kanji } from "./kanji";

const ConvertationTable = [
    { hiragana: 'あ', katakana: 'ア' },
    { hiragana: 'い', katakana: 'イ' },
    { hiragana: 'う', katakana: 'ウ' },
    { hiragana: 'え', katakana: 'エ' },
    { hiragana: 'お', katakana: 'オ' },
    { hiragana: 'か', katakana: 'カ' },
    { hiragana: 'き', katakana: 'キ' },
    { hiragana: 'く', katakana: 'ク' },
    { hiragana: 'け', katakana: 'ケ' },
    { hiragana: 'こ', katakana: 'コ' },
    { hiragana: 'が', katakana: 'ガ' },
    { hiragana: 'ぎ', katakana: 'ギ' },
    { hiragana: 'ぐ', katakana: 'グ' },
    { hiragana: 'げ', katakana: 'ゲ' },
    { hiragana: 'ご', katakana: 'ゴ' },
    { hiragana: 'な', katakana: 'ナ' },
    { hiragana: 'に', katakana: 'ニ' },
    { hiragana: 'ぬ', katakana: 'ヌ' },
    { hiragana: 'ね', katakana: 'ネ' },
    { hiragana: 'の', katakana: 'ノ' },
    { hiragana: 'ら', katakana: 'ラ' },
    { hiragana: 'り', katakana: 'リ' },
    { hiragana: 'る', katakana: 'ル' },
    { hiragana: 'れ', katakana: 'レ' },
    { hiragana: 'ろ', katakana: 'ロ' },
    { hiragana: 'ま', katakana: 'マ' },
    { hiragana: 'み', katakana: 'ミ' },
    { hiragana: 'む', katakana: 'ム' },
    { hiragana: 'め', katakana: 'メ' },
    { hiragana: 'も', katakana: 'モ' },
    { hiragana: 'は', katakana: 'ハ' },
    { hiragana: 'ひ', katakana: 'ヒ' },
    { hiragana: 'ふ', katakana: 'フ' },
    { hiragana: 'へ', katakana: 'ヘ' },
    { hiragana: 'ほ', katakana: 'ホ' },
    { hiragana: 'ば', katakana: 'バ' },
    { hiragana: 'び', katakana: 'ビ' },
    { hiragana: 'ぶ', katakana: 'ブ' },
    { hiragana: 'べ', katakana: 'ベ' },
    { hiragana: 'ぼ', katakana: 'ボ' },
    { hiragana: 'ぱ', katakana: 'パ' },
    { hiragana: 'ぴ', katakana: 'ピ' },
    { hiragana: 'ぷ', katakana: 'プ' },
    { hiragana: 'ぺ', katakana: 'ペ' },
    { hiragana: 'ぽ', katakana: 'ポ' },
    { hiragana: 'た', katakana: 'タ' },
    { hiragana: 'ち', katakana: 'チ' },
    { hiragana: 'つ', katakana: 'ツ' },
    { hiragana: 'て', katakana: 'テ' },
    { hiragana: 'と', katakana: 'ト' },
    { hiragana: 'だ', katakana: 'ダ' },
    { hiragana: 'ぢ', katakana: 'ヂ' },
    { hiragana: 'づ', katakana: 'ヅ' },
    { hiragana: 'で', katakana: 'デ' },
    { hiragana: 'ど', katakana: 'ド' },
    { hiragana: 'さ', katakana: 'サ' },
    { hiragana: 'し', katakana: 'シ' },
    { hiragana: 'す', katakana: 'ス' },
    { hiragana: 'せ', katakana: 'セ' },
    { hiragana: 'そ', katakana: 'ソ' },
    { hiragana: 'ざ', katakana: 'ザ' },
    { hiragana: 'じ', katakana: 'ジ' },
    { hiragana: 'ず', katakana: 'ズ' },
    { hiragana: 'ぜ', katakana: 'ゼ' },
    { hiragana: 'ぞ', katakana: 'ゾ' },
    { hiragana: 'や', katakana: 'ヤ' },
    { hiragana: 'ゆ', katakana: 'ユ' },
    { hiragana: 'よ', katakana: 'ヨ' },
    { hiragana: 'ゃ', katakana: 'ャ' },
    { hiragana: 'ゅ', katakana: 'ュ' },
    { hiragana: 'ょ', katakana: 'ョ' },
    { hiragana: 'わ', katakana: 'ワ' },
    { hiragana: 'を', katakana: 'ヲ' },
    { hiragana: 'ん', katakana: 'ン' },
];

export const ConvertHiraganaToKatakana = (input: string): string => {
    const chars = [...input];
    let output = '';
    chars.forEach(c => {
        const char = ConvertationTable.find(item => item.hiragana === c)?.katakana ?? c;
        output = output + char;
    });
    return output;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface Word {
    word: string;
    meaning: string;
    reading: string;
    jlpt: number;
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const RawDictionary = require('../../resources/dictionary.json');

export const readDictionary = (): Word[] => {
    const returnDicitionary: Word[] = [];
    Object.keys(RawDictionary).forEach((index) => {
        const word = RawDictionary[index] as Word;
        returnDicitionary.push(word);
    });
    return returnDicitionary;
};

export const archiveWord = (kanji: Kanji): void => {
    localStorage.setItem(kanji.key, "1");
};

export const dearchiveWord = (kanji: Kanji): void => {
    localStorage.setItem(kanji.key, "0");
};

export const getArchived = (kanji: Kanji): boolean => {
    return localStorage.getItem(kanji.key) === "1" ? true : false;
};

export const Dictionary = readDictionary();