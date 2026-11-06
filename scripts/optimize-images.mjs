// Shrinks oversized photos in public/images before each build so pages load
// fast on mobile. Safe to run repeatedly: files are only rewritten when the
// result is meaningfully smaller, and names/paths never change.
import {readdir,stat,readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT=path.resolve("public/images");
const MAX_WIDTH=1600;
const MIN_BYTES=200*1024; // leave already-small files alone

async function* walk(dir){
 for(const entry of await readdir(dir,{withFileTypes:true})){
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())yield* walk(full);
  else if(/\.(jpe?g|png)$/i.test(entry.name))yield full;
 }
}

let saved=0,changed=0;
for await(const file of walk(ROOT)){
 const before=(await stat(file)).size;
 if(before<MIN_BYTES)continue;
 const input=await readFile(file);
 const image=sharp(input,{failOn:"none"}).rotate();
 const meta=await image.metadata();
 const resized=meta.width&&meta.width>MAX_WIDTH?image.resize({width:MAX_WIDTH,withoutEnlargement:true}):image;
 const output=/\.png$/i.test(file)
  ?await resized.png({compressionLevel:9,palette:!meta.hasAlpha,quality:85}).toBuffer()
  :await resized.jpeg({quality:78,mozjpeg:true,progressive:true}).toBuffer();
 if(output.length<before*0.9){await writeFile(file,output);saved+=before-output.length;changed++;}
}
console.log(`optimize-images: ${changed} files shrunk, saved ${(saved/1048576).toFixed(1)} MB`);
