export type LanguageCode = 'en' | 'hi' | 'mr';

export interface ILanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  icon: string;
}
