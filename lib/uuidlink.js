(()=>{"use strict";var r={611:(r,t,e)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Parser=void 0;const a=e(828),s=e(779);t.Parser=class{constructor(r,t){this.raw="",this.full_source="",this._content="",this.paramArray=[],this.paramObj={},this.raw=r,this.full_source=t}build(){let r=/^(-{3,})\n([\s\S]+?\n)\1\n?([\s\S]*)/.exec(this.raw);if(r){let t=r[2];this._content=r[3];const e=/(\w+):[^\n]\s*(.*?)\n/g;let a;for(;a=e.exec(t);)this.paramArray=this.paramArray.concat({type:0,name:a[1],value:a[2]}),this.paramObj=Object.assign(Object.assign({},this.paramObj),{[a[1]]:a[2]});const s=/(\w+):\s*\n((?:\s+-\s+.+\n)*)/g;let n;for(;n=s.exec(t);){let r=n[1],t=n[2];const e=/-\s(.*?)\n/g;let a,s=[];for(;a=e.exec(t);)s=s.concat(a[1]);this.paramArray=this.paramArray.concat({type:1,name:r,value:s}),this.paramObj=Object.assign(Object.assign({},this.paramObj),{[r]:s})}}return this}getParamsArray(){return this.paramArray}getSingleParamsArray(){return this.paramArray.filter((r=>0===r.type))}getMultipleParamsArray(){return this.paramArray.filter((r=>1===r.type))}getContent(){return this._content}getParamsObj(){return this.paramObj}addUUID(){let r=(0,a.v1)();return this.paramArray=this.paramArray.concat({type:0,name:"uuidlink",value:r}),this.paramObj=Object.assign(Object.assign({},this.paramObj),{uuidlink:r}),this}generate(){let r="---\n";this.paramArray.forEach((t=>{0===t.type&&(r+=`${t.name}: ${t.value}\n`),1===t.type&&(r+=`${t.name}:\n`,t.value.forEach((t=>{r+=`  - ${t}\n`})))})),r=r+"---\n"+`${this._content}`,(0,s.writeFileSync)(this.full_source,r,"utf-8")}}},779:r=>{r.exports=require("hexo-fs")},828:r=>{r.exports=require("uuid")}},t={};function e(a){var s=t[a];if(void 0!==s)return s.exports;var n=t[a]={exports:{}};return r[a](n,n.exports,e),n.exports}(()=>{const r=e(611);hexo.extend.filter.register("before_post_render",(t=>{if(t.source.indexOf("_drafts")>=0||"post"!==t.layout)return t;let e=new r.Parser(t.raw,t.full_source).build(),a=e.getParamsObj();if(a.hasOwnProperty("uuidlink")&&""!==a.uuidlink&&null!==a.uuidlink)return t;e.addUUID().generate()}),10)})()})();