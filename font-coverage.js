// Current static text uses complete, verified initial Noto subsets.
// Load the full licensed repertoire only when a text-entry control needs it.
(() => {
 let attached=false;
 const attach=()=>{
  if(attached)return;
  attached=true;
  const script=document.querySelector('script[src$="/font-coverage.js"]');
  if(!script)return;
  const sheet=document.createElement('link');
  sheet.rel='stylesheet';
  sheet.href=new URL('botanical-font-coverage.css',script.src).href;
  document.head.append(sheet);
 };
 document.addEventListener('focusin',event=>{
  if(event.target instanceof HTMLElement&&event.target.matches('input,textarea,select,[contenteditable="true"]'))attach();
 });
})();
