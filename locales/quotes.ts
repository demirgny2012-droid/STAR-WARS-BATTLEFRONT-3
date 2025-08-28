import type { Language } from '../types';

export type Quote = {
  quote: string;
  author: string;
};

const en: Quote[] = [
    { quote: "Hello there.", author: "Obi-Wan Kenobi" },
    { quote: "I have a bad feeling about this.", author: "Everyone" },
    { quote: "May the Force be with you.", author: "The Jedi Order" },
    { quote: "It's a trap!", author: "Admiral Ackbar" },
    { quote: "Do. Or do not. There is no try.", author: "Yoda" },
    { quote: "I am your father.", author: "Darth Vader" },
    { quote: "This is the way.", author: "The Mandalorian" },
    { quote: "Never tell me the odds!", author: "Han Solo" },
    { quote: "I find your lack of faith disturbing.", author: "Darth Vader" },
    { quote: "So this is how liberty dies... with thunderous applause.", author: "Padmé Amidala" },
    { quote: "I am one with the Force and the Force is with me.", author: "Chirrut Îmwe" },
    { quote: "Rebellions are built on hope.", author: "Jyn Erso" }
];

const tr: Quote[] = [
    { quote: "Merhaba.", author: "Obi-Wan Kenobi" },
    { quote: "Bu işle ilgili kötü bir hissim var.", author: "Herkes" },
    { quote: "Güç seninle olsun.", author: "Jedi Düzeni" },
    { quote: "Bu bir tuzak!", author: "Amiral Ackbar" },
    { quote: "Yap. Ya da yapma. Denemek yok.", author: "Yoda" },
    { quote: "Ben senin babanım.", author: "Darth Vader" },
    { quote: "Yol budur.", author: "Mandalorian" },
    { quote: "Bana asla ihtimallerden bahsetme!", author: "Han Solo" },
    { quote: "İnanç eksikliğini rahatsız edici buluyorum.", author: "Darth Vader" },
    { quote: "Özgürlük işte böyle ölür... gök gürültülü alkışlarla.", author: "Padmé Amidala" },
    { quote: "Ben Güç ile birim ve Güç benimle.", author: "Chirrut Îmwe" },
    { quote: "İsyanlar umut üzerine kuruludur.", author: "Jyn Erso" }
];


export const quotes: Record<Language, Quote[]> = { en, tr };
