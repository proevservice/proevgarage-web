import {createHash} from "node:crypto";
export function sourceHash(body){return createHash("sha256").update(body,"utf8").digest("hex");}
export function currentTranslation(record,slug,body){return record?.version===1&&record.slug===slug&&(record.sourceHash===sourceHash(body)||(record.provider==="reviewed"&&record.sourceBody===body))&&["title","summary","body"].every(key=>typeof record[key]==="string"&&record[key].trim())?record:null;}
