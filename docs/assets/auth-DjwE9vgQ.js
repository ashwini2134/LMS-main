import{r as n}from"./router-vendor-N0BUPBA1.js";import{g as _,a as i,c as h,s as E}from"./api-Ba3rStlA.js";var m={exports:{}},c={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R;function A(){if(R)return c;R=1;var o=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function e(x,t,r){var u=null;if(r!==void 0&&(u=""+r),t.key!==void 0&&(u=""+t.key),"key"in t){r={};for(var a in t)a!=="key"&&(r[a]=t[a])}else r=t;return t=r.ref,{$$typeof:o,type:x,key:u,ref:t!==void 0?t:null,props:r}}return c.Fragment=l,c.jsx=e,c.jsxs=e,c}var p;function j(){return p||(p=1,m.exports=A()),m.exports}var C=j();const k=n.createContext(null);function J({children:o}){const[l,e]=n.useState(null),[x,t]=n.useState(!1),r=n.useCallback(async()=>{if(!_()){e(null),t(!0);return}try{const s=await i.me();e(s)}catch{e(null)}finally{t(!0)}},[]);n.useEffect(()=>{r()},[r]),n.useEffect(()=>{const s=()=>{e(null)};return window.addEventListener("fa:logout",s),()=>window.removeEventListener("fa:logout",s)},[]);const u=async(s,d)=>{const{access_token:f}=await i.login(s,d);E(f);const v=await i.me();e(v)},a=async(s,d,f)=>{const{access_token:v}=await i.register(s,d,f);E(v);const T=await i.me();e(T)},w=()=>{h(),e(null)};return C.jsx(k.Provider,{value:{user:l,ready:x,login:u,register:a,logout:w},children:o})}function g(){const o=n.useContext(k);if(!o)throw new Error("useAuth outside AuthProvider");return o}export{J as A,C as j,g as u};
