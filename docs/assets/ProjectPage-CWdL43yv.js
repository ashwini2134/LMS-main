import{j as e}from"./auth-DjwE9vgQ.js";import{u as n,L as l}from"./router-vendor-N0BUPBA1.js";import"./api-Ba3rStlA.js";function x(){const{slug:s,number:t}=n(),r={0:[{title:"Degrees",id:"degrees"},{title:"Tic-Tac-Toe",id:"tictactoe"}],1:[{title:"Knights",id:"knights"},{title:"Minesweeper",id:"minesweeper"}],2:[{title:"PageRank",id:"pagerank"},{title:"Heredity",id:"heredity"}],3:[{title:"Crossword",id:"crossword"}],4:[{title:"Shopping",id:"shopping"},{title:"Nim",id:"nim"}],5:[{title:"Traffic",id:"traffic"}],6:[{title:"Parser",id:"parser"},{title:"Attention",id:"attention"}]}[t||0]||[];return e.jsx("div",{className:"min-h-screen bg-slate-950 text-white p-8",children:e.jsxs("div",{className:"max-w-5xl mx-auto",children:[e.jsxs("h1",{className:"text-5xl font-bold mb-3",children:["Project ",t]}),e.jsxs("p",{className:"text-slate-400 mb-12 text-lg",children:["Lecture ",t," Project"]}),e.jsx("div",{className:"grid gap-6",children:r.map(i=>e.jsxs(l,{to:`/course/${s}/lecture/${t}/project/${i.id}`,className:`\r
                flex items-center justify-between\r
                rounded-2xl\r
                border border-slate-700\r
                bg-slate-900\r
                hover:bg-slate-800\r
                transition-all\r
                p-6\r
              `,children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:`\r
                  w-12 h-12\r
                  rounded-xl\r
                  bg-blue-500/20\r
                  flex items-center justify-center\r
                  text-2xl\r
                `,children:"📄"}),e.jsx("div",{children:e.jsx("h2",{className:"text-2xl font-semibold",children:i.title})})]}),e.jsx("div",{className:"text-slate-400 text-2xl",children:"→"})]},i.id))})]})})}export{x as default};
