// Vehicle brand pages = fixed core brands + extra EV brands that get a page
// automatically as soon as a repair case mentions them (build time).
// Server-only: reads repair cases from content/.
import {vehicles as coreVehicles} from "./website-v3";
import {getRepairCases} from "./repair-cases";

type Vehicle = {slug:string;name:string;models:string[];keywords:string[]};

// Known EV brands sold in Thailand. `match` is tested against the case title
// and the start of its text (hashtags and links stripped), not the whole post.
const extraBrands: (Vehicle & {match:RegExp})[] = [
 {slug:"zeekr",name:"ZEEKR",models:["ZEEKR X","ZEEKR 001","ZEEKR 7X"],keywords:["zeekr","ซีคเกอร์"],match:/zeekr|ซีคเกอร์/i},
 {slug:"tesla",name:"Tesla",models:["Model 3","Model Y"],keywords:["tesla","เทสล่า"],match:/tesla|เทสล่า|model\s?[3y]\b/i},
 {slug:"xpeng",name:"XPENG",models:["XPENG G6","XPENG X9"],keywords:["xpeng","เสี่ยวเผิง"],match:/xpeng|เสี่ยวเผิง/i},
 {slug:"changan",name:"Changan",models:["Lumin","Avatr"],keywords:["changan","ฉางอัน","lumin","avatr"],match:/changan|ฉางอัน|\blumin\b|avatr/i},
 {slug:"geely",name:"Geely",models:["Geely EX5"],keywords:["geely","จีลี่"],match:/geely|จีลี่/i},
 {slug:"jaecoo-omoda",name:"JAECOO / OMODA",models:["JAECOO J6","OMODA C5 EV"],keywords:["jaecoo","omoda","เจคู","โอโมดะ"],match:/jaecoo|omoda|เจคู|โอโมดะ/i},
 {slug:"wuling",name:"Wuling",models:["Wuling Air ev","Wuling Bingo"],keywords:["wuling","วูหลิง"],match:/wuling|วูหลิง/i},
 {slug:"volvo",name:"Volvo",models:["EX30","XC40 Recharge"],keywords:["volvo","วอลโว่"],match:/volvo|วอลโว่/i},
 {slug:"bmw",name:"BMW",models:["iX","i4","iX1"],keywords:["bmw","บีเอ็ม"],match:/\bbmw\b|บีเอ็ม/i},
 {slug:"mercedes",name:"Mercedes-Benz",models:["EQA","EQB","EQS"],keywords:["mercedes","benz","เบนซ์"],match:/mercedes|\beq[abces]\b/i},
 {slug:"hyundai-kia",name:"Hyundai / Kia",models:["IONIQ 5","Kia EV6"],keywords:["hyundai","ioniq","kia","ฮุนได"],match:/hyundai|ioniq|ฮุนได|\bkia\b/i},
 {slug:"porsche",name:"Porsche",models:["Taycan"],keywords:["porsche","taycan"],match:/porsche|taycan/i},
];

function caseText(item:{title?:string;summary?:string;body?:string}){
 const title=String(item.title||"").split(/#|https?:\/\//)[0];
 const summary=String(item.summary||item.body||"").split(/\r?\n/).filter(l=>!/#|https?:\/\/|📍|📞|💬|🌐/.test(l)).join(" ").slice(0,400);
 return title+" "+summary;
}

const cases=getRepairCases();
const autoBrands:Vehicle[]=extraBrands
 .filter(b=>!coreVehicles.some(v=>v.slug===b.slug))
 .filter(b=>cases.some(c=>b.match.test(caseText(c))))
 .map(({match,...b})=>b);

export const vehicles:Vehicle[]=[...coreVehicles,...autoBrands];
