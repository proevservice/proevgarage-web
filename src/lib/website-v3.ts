export const services = [
{slug:"ev-air-conditioning",title:"ซ่อมแอร์รถไฟฟ้า",short:"แอร์ไม่เย็น · คอมแอร์ · ฟลัชชิ่ง",image:"/images/service-ac.jpg",description:"ตรวจหาสาเหตุแอร์ไม่เย็นและคอมเพรสเซอร์ทำงานผิดปกติ รวมถึงระบบระบายความร้อนที่เกี่ยวข้องกับรถไฟฟ้า",checks:["ตรวจอาการและอ่านข้อมูลการทำงานของระบบแอร์","ตรวจการรั่ว แรงดัน และสภาพน้ำมันตามอาการ","ประเมินการซ่อมคอมเพรสเซอร์และการล้างระบบ"],problems:["ac-not-cold"],keywords:["แอร์","คอมแอร์","air"]},
{slug:"ev-ac-cleaning",title:"ล้างแอร์รถไฟฟ้า",short:"ล้างแอร์ · ล้างแผงแอร์ · กรองแอร์",image:"/images/service-ac.jpg",description:"ล้างแอร์และแผงแอร์รถไฟฟ้า ช่วยให้ลมแอร์สะอาดและระบายความเย็นได้ดีขึ้น พร้อมตรวจระบบแอร์ไฟฟ้าเบื้องต้นไปในคราวเดียว",checks:["สอบถามอาการ เช่น ลมเบา มีกลิ่น หรือเย็นน้อยลง","ล้างแผงแอร์และทำความสะอาดชิ้นส่วนที่เกี่ยวข้องตามรุ่นรถ","ตรวจระบบแอร์เบื้องต้น หากพบความผิดปกติจะแจ้งก่อนดำเนินการเพิ่ม"],problems:["ac-not-cold"],keywords:["ล้างแอร์","แผงแอร์","กรองแอร์"]},
{slug:"ev-battery-bms",title:"แบตเตอรี่ EV และ BCU/BMS",short:"แบตเตอรี่ · SOC · บาลานซ์เซลล์",image:"/images/service-battery.jpg",description:"ตรวจระบบจัดการแบตเตอรี่และค่าการทำงาน เพื่อแยกปัญหาจากเซลล์แบตเตอรี่ กล่องควบคุม และอุปกรณ์ที่เกี่ยวข้องก่อนเลือกแนวทางซ่อม",checks:["ตรวจรหัสปัญหาและข้อมูล BCU/BMS","ตรวจแรงดันเซลล์ อุณหภูมิ และความแตกต่างตามสภาพการใช้งาน","ประเมินการซ่อม เปลี่ยนชิ้นส่วน หรือบาลานซ์ตามผลตรวจ"],problems:["battery-soc","hv-warning"],keywords:["แบต","BCU","BMS","battery"]},
{slug:"ev-charging",title:"ซ่อมระบบชาร์จรถไฟฟ้า",short:"ชาร์จไม่เข้า · OBC · CDU",image:"/images/service-charging.jpg",description:"วิเคราะห์ปัญหาการชาร์จโดยแยกฝั่งอุปกรณ์ชาร์จ พอร์ตชาร์จ และระบบภายในรถ เพื่อวางแผนซ่อมให้ตรงสาเหตุ",checks:["สอบถามว่าเกิดกับการชาร์จ AC หรือ DC","ตรวจพอร์ต สายไฟ และรหัสปัญหาที่เกี่ยวข้อง","ตรวจการทำงานของ OBC/CDU ตามรุ่นรถและผลวิเคราะห์"],problems:["charging-fault"],keywords:["ชาร์จ","OBC","CDU"]},
{slug:"ev-diagnostics",title:"วิเคราะห์ระบบไฟและไฟเตือน",short:"System Fault · ไม่เข้า READY · ไฟเตือน",image:"/images/service-diagnostics.jpg",description:"ตรวจข้อมูลจากกล่องควบคุมและวงจรที่เกี่ยวข้องกับอาการจริง เพื่อแยกสาเหตุก่อนตัดสินใจเปลี่ยนอะไหล่",checks:["อ่านรหัสปัญหาและบันทึกข้อมูลก่อนซ่อม","ตรวจแหล่งจ่ายไฟ สายไฟ และการสื่อสาร","ทดสอบระบบที่เกี่ยวข้องและสรุปแนวทางให้ลูกค้าทราบ"],problems:["not-ready","hv-warning"],keywords:["ระบบไฟ","Fault","READY"]},
{slug:"ev-suspension",title:"ช่วงล่างและเสียงผิดปกติ",short:"โช้ค · บูช · ลูกหมาก · เสียงดัง",image:"/images/service-suspension.jpg",description:"ตรวจช่วงล่างและหาตำแหน่งเสียงที่เกิดระหว่างใช้งาน เพื่อประเมินชิ้นส่วนที่ควรซ่อมหรือเปลี่ยนตามสภาพจริง",checks:["สอบถามลักษณะเสียงและช่วงที่เกิดอาการ","ตรวจโช้ค บูช ลูกหมาก และจุดยึดที่เกี่ยวข้อง","ทดสอบหลังงานซ่อมตามความเหมาะสม"],problems:["suspension-noise"],keywords:["ช่วงล่าง","โช้ค","เสียง"]},
{slug:"ev-maintenance",title:"เช็กระยะและแบตเตอรี่ 12V",short:"บำรุงรักษา · ของเหลว · ระบบ 12V",image:"/images/service-maintenance.jpg",description:"ดูแลรายการบำรุงรักษาตามรุ่น ระยะทาง และประวัติการใช้งาน พร้อมตรวจสภาพเบื้องต้นก่อนวางแผนดูแลต่อ",checks:["ตรวจแบตเตอรี่ 12V และระบบจ่ายไฟเบื้องต้น","ตรวจของเหลว ไส้กรอง และรายการตามรุ่นรถ","สรุปรายการที่ควรทำและแจ้งค่าใช้จ่ายก่อนดำเนินงาน"],problems:["not-ready"],keywords:["12V","เช็กระยะ","บำรุง"]}
];
export const problems = [
{slug:"ac-not-cold",title:"แอร์ไม่เย็น / คอมแอร์ไม่ทำงาน",intro:"อาการแอร์ไม่เย็นอาจมาจากหลายส่วน ควรตรวจข้อมูลระบบ การรั่ว และการควบคุมก่อนสรุปว่าเป็นคอมเพรสเซอร์",prepare:["รุ่นรถและระยะทาง","เย็นน้อยตลอดเวลาหรือเป็นบางช่วง","ประวัติเติมน้ำยาหรือซ่อมแอร์ล่าสุด"]},
{slug:"battery-soc",title:"เปอร์เซ็นต์แบตผิดปกติ / ลดเร็ว",intro:"เปอร์เซ็นต์แบตเตอรี่เพียงอย่างเดียวยังระบุชิ้นส่วนที่เสียไม่ได้ ควรเทียบข้อมูลเซลล์ ระบบจัดการแบตเตอรี่ และรูปแบบการใช้งาน",prepare:["SOC ก่อนและหลังใช้งาน","ระยะทางและรูปแบบการชาร์จ","ภาพไฟเตือนหรือข้อมูลที่เคยตรวจ"]},
{slug:"charging-fault",title:"ชาร์จไม่เข้า / ชาร์จแล้วตัด",intro:"แจ้งว่าเกิดกับ AC หรือ DC และเกิดทุกตู้หรือเฉพาะบางจุด ข้อมูลนี้ช่วยแยกปัญหาอุปกรณ์ภายนอกกับระบบในรถ",prepare:["ประเภทการชาร์จ AC หรือ DC","ข้อความแจ้งเตือน","เกิดกับกี่จุดชาร์จและตั้งแต่เมื่อไร"]},
{slug:"not-ready",title:"รถไม่เข้า READY / เปิดระบบไม่ได้",intro:"ควรตรวจแหล่งจ่ายไฟ 12V รหัสปัญหา และสถานะระบบที่เกี่ยวข้องก่อนประเมินการซ่อม",prepare:["ภาพหน้าจอและไฟเตือน","รถยังปลดล็อกหรือเปิดจอได้หรือไม่","ประวัติเปลี่ยนแบต 12V และเหตุการณ์ก่อนเกิดอาการ"]},
{slug:"hv-warning",title:"ไฟเตือนระบบแรงดันสูง",intro:"แจ้งข้อความเตือนและสถานะรถให้ทีมงานประเมินก่อนนำรถเข้าตรวจ หากไม่แน่ใจเรื่องการเคลื่อนย้าย ให้ติดต่ออู่ก่อน",prepare:["ภาพข้อความเตือนตามหน้าจอ","อาการร่วมและเวลาที่เกิด","ประวัติน้ำเข้า การชน หรือการซ่อมล่าสุด"]},
{slug:"suspension-noise",title:"ช่วงล่างดัง / เสียงขณะขับ",intro:"ลักษณะเสียงและสภาพถนนช่วยจำกัดตำแหน่งปัญหา ควรทดสอบอาการร่วมกับการตรวจสภาพชิ้นส่วน",prepare:["คลิปเสียงถ้ามี","ความเร็วและสภาพถนนที่เกิดเสียง","เกิดตอนเลี้ยว เบรก หรือผ่านทางขรุขระ"]}
];
// EV brands sold in Thailand (passenger cars), models per market listings Oct 2026.
export const vehicles = [
{slug:"byd",name:"BYD",models:["ATTO 1", "ATTO 2", "ATTO 3", "Dolphin", "Seal", "Seal 6", "Sealion 7", "M6", "e6"],keywords:["byd", "บีวายดี", "atto", "dolphin", "sealion"]},
{slug:"mg",name:"MG",models:["MG4", "MG S5 EV", "MG ZS EV", "MG EP", "MG ES", "MG URBAN", "MG IM5", "MG IM6", "Cyberster"],keywords:["mg"]},
{slug:"neta",name:"NETA",models:["NETA V", "NETA V-II", "NETA X"],keywords:["neta", "เนต้า"]},
{slug:"deepal",name:"DEEPAL",models:["Deepal S05", "Deepal S07", "Deepal L07", "Deepal E07"],keywords:["deepal", "ดีพอล"]},
{slug:"aion",name:"GAC AION",models:["AION UT", "AION Y Plus", "AION ES", "AION V", "Hyptec HT"],keywords:["aion", "ไอออน", "hyptec"]},
{slug:"ora",name:"GWM ORA",models:["ORA Good Cat", "ORA 07"],keywords:["good cat", "ora 07", "gwm"]},
{slug:"jaecoo-omoda",name:"JAECOO / OMODA",models:["JAECOO 5 EV", "JAECOO 6", "OMODA C5 EV"],keywords:["jaecoo", "omoda", "เจคู", "โอโมดะ"]},
{slug:"chery",name:"Chery",models:["Chery Q", "Chery V23"],keywords:["chery", "เชอรี่"]},
{slug:"geely",name:"Geely",models:["Geely EX2", "Geely EX5"],keywords:["geely", "จีลี่"]},
{slug:"zeekr",name:"ZEEKR",models:["ZEEKR X", "ZEEKR 7X", "ZEEKR 009"],keywords:["zeekr", "ซีคเกอร์"]},
{slug:"xpeng",name:"XPENG",models:["XPENG G6", "XPENG X9", "XPENG L03"],keywords:["xpeng", "เสี่ยวเผิง"]},
{slug:"changan",name:"Changan",models:["Changan Lumin", "Changan NEVO Q05"],keywords:["changan", "ฉางอัน", "lumin", "nevo"]},
{slug:"avatr",name:"AVATR",models:["AVATR 07", "AVATR 11"],keywords:["avatr", "อวาตาร์"]},
{slug:"wuling",name:"Wuling",models:["Wuling Air ev", "Wuling Binguo", "Starlight", "Eksion"],keywords:["wuling", "วูหลิง", "binguo"]},
{slug:"leapmotor",name:"Leapmotor",models:["Leapmotor B10", "Leapmotor C10", "Leapmotor B03X"],keywords:["leapmotor", "ลีปมอเตอร์"]},
{slug:"tesla",name:"Tesla",models:["Model 3", "Model Y"],keywords:["tesla", "เทสล่า"]},
{slug:"denza",name:"DENZA",models:["DENZA D9", "DENZA Z9 GT"],keywords:["denza"]},
{slug:"hyundai",name:"Hyundai",models:["IONIQ 5", "IONIQ 6"],keywords:["hyundai", "ฮุนได", "ioniq"]},
{slug:"kia",name:"Kia",models:["Kia EV5", "Kia EV9", "Kia Soul EV"],keywords:["kia ev", "kia soul", "เกีย"]},
{slug:"volvo",name:"Volvo",models:["EX30", "EX40", "EC40", "EX90", "ES90"],keywords:["volvo", "วอลโว่"]},
{slug:"bmw",name:"BMW",models:["iX1", "iX2", "iX3", "iX", "i4", "i5", "i7"],keywords:["bmw", "บีเอ็มดับเบิลยู"]},
{slug:"mercedes-benz",name:"Mercedes-Benz",models:["EQB", "EQE", "EQS", "CLA EV"],keywords:["mercedes", "benz", "เบนซ์"]},
{slug:"toyota",name:"Toyota",models:["bZ4X"],keywords:["bz4x"]},
{slug:"honda",name:"Honda",models:["e:N1", "e:N2", "Super-ONE"],keywords:["e:n1", "e:n2", "honda super-one"]},
{slug:"nissan",name:"Nissan",models:["Nissan LEAF"],keywords:["nissan leaf", "นิสสัน ลีฟ"]},
{slug:"smart",name:"smart",models:["smart #1", "smart #3", "smart #5"],keywords:["smart #1", "smart #3", "smart #5"]},
{slug:"vinfast",name:"VinFast",models:["VinFast VF series"],keywords:["vinfast", "วินฟาสต์"]},
{slug:"nio",name:"NIO / firefly",models:["firefly"],keywords:["firefly", "nio firefly"]},
{slug:"lepas",name:"LEPAS",models:["LEPAS L6"],keywords:["lepas"]},
{slug:"audi",name:"Audi",models:["Q6 e-tron", "Q8 e-tron", "e-tron GT"],keywords:["e-tron", "audi"]},
{slug:"porsche",name:"Porsche",models:["Taycan", "Macan Electric", "Cayenne Electric"],keywords:["porsche", "taycan", "ปอร์เช่"]},
{slug:"lexus",name:"Lexus",models:["Lexus RZ"],keywords:["lexus rz"]},
{slug:"mazda",name:"Mazda",models:["Mazda 6e", "Mazda CX-6e"],keywords:["mazda 6e", "cx-6e"]},
{slug:"mini",name:"MINI",models:["MINI Aceman"],keywords:["aceman", "mini ev"]},
{slug:"suzuki",name:"Suzuki",models:["Suzuki e VITARA"],keywords:["e vitara", "e-vitara"]},
{slug:"lotus",name:"Lotus",models:["Eletre", "Emeya"],keywords:["eletre", "emeya"]},
{slug:"jaguar",name:"Jaguar",models:["I-PACE"],keywords:["i-pace", "jaguar"]},
{slug:"hongqi",name:"HONGQI",models:["HONGQI E-HS9"],keywords:["hongqi", "e-hs9"]}
];
export const faqs = [
{question:"ต้องนัดหมายก่อนเข้ารับบริการไหม?",answer:"แนะนำให้แจ้งรุ่นรถ อาการ และวันที่สะดวกผ่าน LINE โทร หรือ Facebook เพื่อให้ทีมงานตรวจสอบคิวและเตรียมรับรถ"},
{question:"แจ้งราคาก่อนเริ่มซ่อมหรือไม่?",answer:"ทีมงานตรวจอาการและเสนอรายการพร้อมค่าใช้จ่ายให้พิจารณาก่อนดำเนินงาน รายการตรวจและค่าบริการขึ้นอยู่กับอาการและรุ่นรถ"},
{question:"ตรวจเช็คมีค่าใช้จ่ายไหม?",answer:"ตรวจเช็คเบื้องต้นฟรี หากต้องตรวจวิเคราะห์เชิงลึกและมีค่าใช้จ่าย ทีมงานจะแจ้งก่อน และหักเป็นค่าซ่อมได้เมื่อซ่อมกับเรา"},
{question:"ซ่อมด่วน รอรับได้ไหม?",answer:"รับงานซ่อมด่วน รอรับได้ ระยะเวลาจริงขึ้นอยู่กับอาการและอะไหล่ แจ้งรุ่นรถและอาการล่วงหน้าเพื่อให้ทีมงานจัดคิวให้"},
{question:"มีการรับประกันงานซ่อมอย่างไร?",answer:"มีการรับประกันงานซ่อม เงื่อนไขขึ้นอยู่กับประเภทงานและอะไหล่ที่ใช้ ทีมงานแจ้งให้ทราบก่อนอนุมัติงาน"},
{question:"ไม่แน่ใจว่ารถเสียส่วนไหน ต้องเลือกบริการอะไร?",answer:"เริ่มจากหน้าอาการเสีย หรือส่งภาพไฟเตือนพร้อมรุ่นรถให้ทีมงานช่วยประเมินแนวทางเข้าตรวจได้"}
];
export const SITE_URL="https://www.proevgarage.com";
// Shown first in brand lists; the rest sit under "ยี่ห้ออื่นๆ".
export const popularBrandSlugs=["byd","mg","neta","deepal","aion","ora","jaecoo-omoda","geely","zeekr","xpeng","tesla","chery"];
export function splitBrands<T extends {slug:string}>(list:T[]){return {popular:popularBrandSlugs.map(slug=>list.find(v=>v.slug===slug)).filter((v):v is T=>!!v),others:list.filter(v=>!popularBrandSlugs.includes(v.slug))};}
export function relatedServices(problem:string){return services.filter(s=>s.problems.includes(problem));}
export function matchesCase(item:{title:string;body:string;model:string},keywords:string[]){const text=[item.title,item.model,item.body].join(" ").toLowerCase();return keywords.some(k=>text.includes(k.toLowerCase()));}
