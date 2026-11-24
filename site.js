(() => {
  'use strict';
  const cfg = window.ACREOUTLOOK_CONFIG || {};
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.contactEmail || '') ? cfg.contactEmail : 'support@acreoutlook.com';
  const subject = cfg.betaSubject || 'AcreOutlook grower beta request';
  document.querySelectorAll('[data-contact]').forEach(a => { a.href = `mailto:${email}`; if (a.textContent.includes('@')) a.textContent = email; });
  document.querySelectorAll('[data-beta]').forEach(a => { a.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`; });
  document.querySelectorAll('[data-app-link]').forEach(a => { if (/^https:\/\//.test(cfg.appUrl || '')) { a.href = cfg.appUrl; a.hidden = false; } });
  const year = document.querySelector('#year'); if (year) year.textContent = new Date().getFullYear();
  const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('#navigation');
  if (menu && nav) {
    const closeMenu = () => {nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); menu.setAttribute('aria-label','Open navigation');};
    menu.addEventListener('click', () => {const open = !nav.classList.contains('open'); nav.classList.toggle('open',open); menu.setAttribute('aria-expanded',String(open)); menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
  }
  document.querySelectorAll('[data-close-dialog]').forEach(b => b.addEventListener('click',()=>b.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect(); if(e.target===d && (e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)) d.close();}));
  const beta = document.querySelector('#beta-dialog');
  if (beta && typeof beta.showModal === 'function') document.querySelectorAll('[data-beta]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();beta.showModal();}));
  let requestText = '';
  const form = document.querySelector('#beta-form');
  if (form) form.addEventListener('submit',e=>{
    e.preventDefault(); const values = new FormData(form);
    requestText = `Hello AcreOutlook,\n\nI'd like to learn about the grower beta.\n\nName: ${String(values.get('name')||'').trim()}\nRegion: ${String(values.get('region')||'').trim()}\nMain crops: ${values.get('crops')}\n\nPlease send me participation and onboarding details.\n`;
    const send = document.querySelector('#send-request'); send.href=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText)}`;
    document.querySelector('#request-result').hidden=false;
    document.querySelector('#copy-status').textContent=''; send.focus();
  });
  const copy = document.querySelector('#copy-request');
  if (copy) copy.addEventListener('click',async()=>{
    const status=document.querySelector('#copy-status');
    try{await navigator.clipboard.writeText(requestText);status.textContent='Copied. Paste the request into an email and send it when ready.';}
    catch{status.textContent=`Copy from the text below and send to ${email}.`;let area=document.querySelector('#copy-fallback');if(!area){area=document.createElement('textarea');area.id='copy-fallback';area.readOnly=true;area.setAttribute('aria-label','Request text to copy');area.style.width='100%';area.style.minHeight='160px';status.after(area);}area.value=requestText;area.focus();area.select();}
  });
  const features = {
    weather: {category:'Your daily starting point',title:'A clear view of the day ahead.',description:'Current conditions, an hourly forecast and precipitation radar. Check what’s happening around your location, without setting up a field or account.',points:['Local conditions and hourly forecasts','Radar opens by default','Public weather without an account'],image:'weather',label:'Current weather'},
    briefing: {category:'A quick read across your ground',title:'What matters today, without the digging.',description:'See up to three prioritized field insights, choose a field and open the supporting evidence. Each item offers a direct next step.',points:['Switch between your saved fields','Understand the inputs and limitations','Add a rainfall or stage update'],image:'briefing',label:'Daily field briefing'},
    timeline: {category:'Your season in context',title:'Keep observations and estimates distinct.',description:'Follow confirmed crop stages alongside corn heat-unit benchmarks. Keep variety and season context together, with assumptions in view.',points:['Corn, soybeans and wheat workflows','Grower-confirmed stage observations','Clearly labeled development estimates'],image:'timeline',label:'Crop timeline'},
    water: {category:'Rainfall meets crop demand',title:'Bring the water picture together.',description:'Compare potential crop water use with rain and irrigation entries. Add appropriate field inputs to explore water-balance scenarios.',points:['Your gauge totals replace modeled rain','Reference ET and selected crop coefficients','Missing inputs stay visible'],image:'water',label:'Field water outlook'},
    windows: {category:'Weather opportunities for fieldwork',title:'Find a window worth checking.',description:'Review forecast windows for spraying, planting and harvest. See the planning filters and verify the conditions on your own ground.',points:['Wind, humidity and rain outlook','Timing in the field’s local time zone','On-site and product-label checks still apply'],image:'windows',label:'Spray-weather windows'}
  };
  const tabs=[...document.querySelectorAll('[data-feature]')]; let current='weather', weatherView='weather';
  const featureImg=document.querySelector('#feature-image');
  function setImage(key,label){if(!featureImg)return;featureImg.src=`assets/screens/${key}.png`;featureImg.alt=`Illustrative AcreOutlook ${label.toLowerCase()} screen`;document.querySelector('#screen-label').textContent=label;}
  function selectFeature(key,focus=false){
    const f=features[key];if(!f||!featureImg)return;current=key;
    tabs.forEach(t=>{const selected=t.dataset.feature===key;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;if(selected&&focus)t.focus();});
    document.querySelector('#feature-panel').setAttribute('aria-labelledby',`tab-${key}`);
    document.querySelector('#feature-category').textContent=f.category;document.querySelector('#feature-title').textContent=f.title;document.querySelector('#feature-description').textContent=f.description;
    const list=document.querySelector('#feature-points');list.replaceChildren(...f.points.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    document.querySelector('.tour-image-options').hidden=key!=='weather';
    setImage(key==='weather'?weatherView:f.image,key==='weather'&&weatherView==='radar'?'Weather radar':f.label);
  }
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectFeature(t.dataset.feature));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i-1+tabs.length)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectFeature(tabs[next].dataset.feature,true);tabs[next].scrollIntoView({block:'nearest',inline:'nearest'});}});});
  document.querySelectorAll('[data-weather-view]').forEach(b=>b.addEventListener('click',()=>{weatherView=b.dataset.weatherView;document.querySelectorAll('[data-weather-view]').forEach(x=>{const active=x===b;x.classList.toggle('selected',active);x.setAttribute('aria-pressed',String(active));});selectFeature(current);}));
  const enlarge=document.querySelector('#enlarge-screen'),screenDialog=document.querySelector('#screen-dialog');
  if(enlarge&&screenDialog&&typeof screenDialog.showModal==='function')enlarge.addEventListener('click',()=>{const image=document.querySelector('#large-screen');image.src=featureImg.src;image.alt=featureImg.alt;document.querySelector('#screen-dialog-title').textContent=document.querySelector('#screen-label').textContent;screenDialog.showModal();});
})();
