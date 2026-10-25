import test from 'node:test';
import assert from 'node:assert/strict';
import {IMPORT_TAG, classifyPost} from './facebook-tag.mjs';
test('only an explicit full hashtag publishes',()=>{
 assert.equal(classifyPost({message:'NETA repair resolved'}).status,'skip');
 for(const message of [IMPORT_TAG, 'Repair\n'+IMPORT_TAG, 'Repair ('+IMPORT_TAG.toLowerCase()+')'])assert.equal(classifyPost({message}).status,'publish');
 for(const message of [IMPORT_TAG+'extra',IMPORT_TAG+'_old','prefix'+IMPORT_TAG,'#'+IMPORT_TAG,''])assert.equal(classifyPost({message}).status,'skip');
});
