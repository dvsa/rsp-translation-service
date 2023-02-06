export interface TranslatedLanguage {
  detectedLanguage: { language: string, score: number },
  translations: Array<{ text: string, to: string }>
}
