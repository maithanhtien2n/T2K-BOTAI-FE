import{m as x,c as j,o as t,d as l,e,t as M,Y as y,Z as q,u as I,L as R,v as T,J as L,G as d,f as U,g as o,F as D,n as E,A as v,M as S,s as N,x as F,$ as G,w as H,a0 as K,q as A}from"./index-43c2b127.js";import{_ as O}from"./ButtonBack-888e2ed9.js";const z={class:"flex gap-2"},J=["src"],Y={class:"flex flex-column gap-1 w-full"},Z={class:"font-bold text-800"},P=["innerHTML"],C={__name:"UserChat",props:{image:{type:String,required:!1,default:""},name:{type:String,required:!1,default:""},message:{type:String,required:!1,default:""},role:{type:String,required:!1,default:""}},setup(m){const p=m,i=x(()=>{switch(p.role){case"user":return{image:"/images/user.jpg",name:"Bạn"};case"assistant":return{image:"/images/botai.webp",name:"Trợ lý ảo"};default:return{image:"https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg",name:""}}});return(r,w)=>{const g=j("Skeleton");return t(),l("div",z,[e("img",{class:"w-2rem h-2rem border-circle object-fit-cover box-shadow-1",src:i.value.image||"https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg",alt:"Lỗi ảnh"},null,8,J),e("div",Y,[e("span",Z,M(i.value.name),1),m.message?(t(),l("div",{key:0,innerHTML:m.message,style:{"text-align":"justify","white-space":"pre-wrap"},class:"text-800 line-height-3"},null,8,P)):(t(),y(g,{key:1,class:"w-full mt-2",height:"4rem"}))])])}}},Q={class:"flex flex-column h-full"},W={key:1,class:"flex justify-content-center align-items-center"},X={class:"flex flex-column gap-3 align-items-center"},ee=e("img",{class:"w-10rem h-10rem",src:"https://cdn-icons-png.flaticon.com/512/1698/1698535.png",alt:"Lỗi ảnh"},null,-1),te={class:"text-center line-height-2"},se={class:"text-main-color"},ae={key:0,class:"h-4rem"},ne={style:{bottom:"1.8rem","background-color":"#f2f1f7"},class:"fixed z-5 left-0 right-0 px-3"},oe={style:{"max-width":"50rem"},class:"p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"},le=["onKeypress"],re={style:{"padding-left":"0.7rem"},class:"border-left-1 text-400"},ie={key:0,class:"pi pi-spin pi-spinner text-900"},de={__name:"VirtualAssistantChat",setup(m){const p=q(),i=I(),{onGetterMessages:r,onActionChat:w,onActionCheckLinkChat:g,onActionCreateThread:B,onActionGetThread:V}=R(),c=T(""),u=T(!1),_=x(()=>p.query.thread),b=x(()=>p.params.userId),h=()=>{setTimeout(()=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})},1)},$=()=>{r.value=[],i.replace({name:"VirtualAssistant"})},k=async()=>{if(u.value)return;r.value.push({role:"user",content:c.value}),h();let s=c.value;c.value="",setTimeout(()=>{u.value=!0,h()},1e3);const a=await w({threadId:_.value,userId:b.value,content:s});a.success&&(r.value=a.data),h(),u.value=!1};return L(async()=>{var a,n;const s=await g(b.value);if(s.success)if(d.value.fullName=((a=s==null?void 0:s.data)==null?void 0:a.fullName)||"",d.value.userName=((n=s==null?void 0:s.data)==null?void 0:n.userName)||"",_.value)await V(_.value);else{const f=await B();f.success&&i.replace({name:"VirtualAssistantChat",params:{userId:d._id},query:{thread:f.data.id}})}else{i.replace({name:"NotFound"});return}h()}),(s,a)=>(t(),l("div",Q,[U(O,{accessToken:o(K),onOnBack:$},null,8,["accessToken"]),e("div",{style:{"max-width":"52rem"},class:N([{"px-3 pb-3":!o(A),"justify-content-center":!o(r).length},"flex flex-1 flex-column gap-4 m-auto w-full pt-3"])},[(t(!0),l(D,null,E(o(r),(n,f)=>(t(),y(C,{key:f,image:"",name:n.role,message:n.content,role:n.role},null,8,["name","message","role"]))),128)),u.value?(t(),y(C,{key:0,role:"assistant"})):v("",!0),o(r).length?v("",!0):(t(),l("div",W,[e("div",X,[ee,e("span",te,[S(" Chào bạn, tôi là chat bot do "),e("span",se,M(o(d).fullName||o(d).userName),1),S(" tạo ra! ")])])]))],2),o(A)?v("",!0):(t(),l("div",ae)),e("div",ne,[e("div",oe,[F(e("input",{"onUpdate:modelValue":a[0]||(a[0]=n=>c.value=n),type:"text",class:"w-full border-none outline-none",placeholder:"Bạn muốn hỏi gì?",onKeypress:H(k,["enter"])},null,40,le),[[G,c.value]]),e("div",re,[u.value?(t(),l("i",ie)):(t(),l("i",{key:1,class:N(["pi pi-angle-right text-900 on-click",{"p-disabled":!c.value}]),onClick:k},null,2))])])])]))}};export{de as default};