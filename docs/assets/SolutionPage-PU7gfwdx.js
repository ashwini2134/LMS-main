import{j as e}from"./auth-DjwE9vgQ.js";import{u as h,r as s,L as f}from"./router-vendor-N0BUPBA1.js";import{M as j,r as b,a as g}from"./pages-lecture-QYcplIpV.js";import"./api-Ba3rStlA.js";import"./pages-course-Hk86trEG.js";function $(){const{slug:n,number:t,projectId:r}=h(),[d,m]=s.useState(""),[x,o]=s.useState(!0),[i,l]=s.useState("");return s.useEffect(()=>{async function u(){try{o(!0),l("");const a="/LMS/".replace(/\/$/,"")||"",c=await fetch(`${a}/data/${n}/lecture_${t}/${r}/solution.md`);if(!c.ok)throw new Error("Solution file not found");const p=await c.text();m(p)}catch(a){l(a.message||"Failed to load solution")}finally{o(!1)}}u()},[n,t,r]),x?e.jsx("div",{className:"min-h-screen flex items-center justify-center text-white",children:"Loading solution..."}):i?e.jsx("div",{className:"min-h-screen p-8 text-red-400",children:i}):e.jsxs("div",{className:"min-h-screen bg-slate-950 text-white",children:[e.jsx("div",{className:"border-b border-slate-800 bg-slate-900/50",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-8 py-8 flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsxs("p",{className:"text-slate-400 mb-2",children:["Lecture ",t," Solution"]}),e.jsxs("h1",{className:"text-5xl font-bold capitalize",children:[r==null?void 0:r.replace("-"," ")," Solution"]})]}),e.jsx(f,{to:`/course/${n}/lecture/${t}/project/${r}`,className:`\r
              px-5 py-3\r
              rounded-xl\r
              bg-slate-700\r
              hover:bg-slate-600\r
              transition-colors\r
              font-semibold\r
            `,children:"Back to Project"})]})}),e.jsx("div",{className:"max-w-5xl mx-auto px-8 py-12",children:e.jsx("div",{className:`\r
          prose\r
          prose-invert\r
          max-w-none\r
          prose-pre:bg-slate-900\r
          prose-pre:border\r
          prose-pre:border-slate-700\r
        `,children:e.jsx(j,{remarkPlugins:[g],rehypePlugins:[b],children:d})})})]})}export{$ as default};
