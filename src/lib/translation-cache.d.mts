export interface TranslationRecord{version:1;slug:string;sourceHash:string;title:string;summary:string;body:string;provider?:string;model?:string;translatedAt?:string}
export function sourceHash(body:string):string;
export function currentTranslation(record:unknown,slug:string,body:string):TranslationRecord|null;
