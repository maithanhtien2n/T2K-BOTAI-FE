import{u as D,L as N,r as f,G as v,I as O,J as U,c as x,d as a,f as i,g as s,e as t,C as E,x as G,y as L,t as g,F as V,n as M,A as q,M as H,N as j,o}from"./index-1b2f3aee.js";import{c as J,a as y,u as z,b as K,d as P,_ as Q}from"./InputTextValidate-d55a5043.js";import{_ as W}from"./ButtonBack-403de9a1.js";const X={style:{"max-width":"52rem"},class:"m-auto pt-3"},Y=t("div",{class:"flex flex-column gap-2 align-items-center"},[t("span",{class:"text-custom-1 flex"},"Cấu hình bot"),t("span",{style:{"max-width":"30rem"},class:"text-700 line-height-2 text-center"}," Bạn hãy cung cấp thông tin chuẩn xác để bot có thể học và trả lời tự nhiên và đúng nhất. ")],-1),Z=t("br",null,null,-1),tt={class:"w-full text-right"},et={class:"flex flex-column gap-3"},st={class:"flex flex-column gap-2"},nt=t("div",null,[H("Hướng dẫn cho trợ lý "),t("span",{class:"p-error"},"*")],-1),lt={class:"flex flex-column gap-2"},at={class:"flex align-items-center gap-2"},it=t("span",null,"Thêm tệp tin",-1),ot={style:{overflow:"hidden"},class:"relative"},ct=t("i",{class:"pi pi-plus-circle on-click text-800"},null,-1),rt={class:"flex flex-column gap-2"},ut={class:"flex align-items-center gap-1"},dt={class:"text-700"},mt=["onClick"],pt={key:0,class:"text-custom-mini text-700"},Vt={__name:"VirtualAssistantConfig",setup(ht){const k=D(),{onGetterVirtualAssistant:b,onActionGetVirtualAssistant:d,onActionSaveVirtualAssistant:w}=N(),m=f({userId:v.value._id,system:""}),p=f({userId:v.value._id,name:null,instructions:null,files:[]}),C=J({name:y().required("Vui lòng nhập tên trợ lý"),instructions:y().required("Vui lòng nhập hướng dẫn cho trợ lý")}),{values:c,resetForm:F,setFieldValue:_t,handleSubmit:A}=z({initialValues:p,validationSchema:C,keepValuesOnUnmount:!0}),{value:r,errorMessage:h}=K("instructions"),{push:B,remove:S}=P("files"),I=async e=>{const n=await j(e.target.files[0]);B(n);const u=document.getElementById("inputFile");u.value=""},R=e=>{S(e)},T=A(async()=>{(await w(c)).success&&d(m.userId,!0)});return O(b,e=>{F({values:Object.assign(p,e)})}),U(()=>{d(m.userId)}),(e,n)=>{const u=x("Button"),$=x("Textarea");return o(),a(V,null,[i(W,{onOnBack:n[0]||(n[0]=l=>s(k).replace({name:"VirtualAssistant"}))}),t("div",X,[Y,Z,t("div",tt,[i(u,{label:"Lưu cấu hình",onClick:s(T)},null,8,["onClick"])]),t("div",et,[i(Q,{label:"Tên trợ lý",name:"name",class:"w-full"}),t("div",st,[nt,t("div",null,[i($,{modelValue:s(r),"onUpdate:modelValue":n[1]||(n[1]=l=>E(r)?r.value=l:null),rows:"8",class:"w-full",placeholder:"Hướng dẫn cho bot..."},null,8,["modelValue"]),G(t("small",{class:"p-error"},g(s(h)),513),[[L,s(h)]])])]),t("div",lt,[t("div",at,[it,t("div",ot,[ct,t("input",{type:"file",id:"inputFile",class:"absolute top-0 right-0 left-0 bottom-0 opacity-0 on-click",accept:".txt, .xlsx, csv",onChange:I},null,32)])]),t("div",rt,[(o(!0),a(V,null,M(s(c).files,(l,_)=>(o(),a("div",{key:_},[t("div",ut,[t("span",dt,g(l.name),1),t("i",{class:"pi pi-times-circle text-700",onClick:ft=>R(_)},null,8,mt)])]))),128)),s(c).files.length?q("",!0):(o(),a("div",pt," Chưa có tệp tin nào. "))])])])])],64)}}};export{Vt as default};