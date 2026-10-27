type CaseTopic = { title?: string; summary?: string; body?: string };
export function serviceSlugsForCase(item: CaseTopic): string[];
export function casesForService<T extends CaseTopic>(cases: T[], slug: string): T[];
