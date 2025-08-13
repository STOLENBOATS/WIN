(function(){
  if (sessionStorage.getItem(NAV.STORAGE.SESSION) !== 'ok'){ alert('Sessão expirada. Faça login.'); location.replace('login.html'); return; }
  const form = document.getElementById('formMotor');
  const brandSel = document.getElementById('brand');
  const snInput = document.getElementById('sn');
  const file = document.getElementById('motorPhoto');
  const out = document.getElementById('motorOut');
  const brandFields = document.getElementById('brandFields');

  function updateBrandFields(){
    const b=brandSel.value;
    let hintPT='', hintEN='';
    if(b==='Yamaha'){ hintPT='Ex.: F350NSA 6ML N 1005843 (chapa lateral)'; hintEN='e.g., F350NSA 6ML N 1005843 (side plate)'; }
    if(b==='Honda'){  hintPT='Ex.: BF150A… (chapa lateral)'; hintEN='e.g., BF150A… (side plate)'; }
    brandFields.innerHTML = `<div class="small">${hintPT}<br>${hintEN}</div>`;
  }
  brandSel.addEventListener('change', updateBrandFields); updateBrandFields();

  function validateMotor(b, sn){
    sn = sn.trim().toUpperCase();
    if(!sn) return {valid:false, reason:'Indique o número de série.'};
    if(sn.length<6) return {valid:false, reason:'S/N demasiado curto.'};
    if(!/^[A-Z0-9\-\/ ]+$/.test(sn)) return {valid:false, reason:'Caracteres inesperados.'};
    return {valid:true, reason:'Estrutura mínima válida.'};
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const brand = brandSel.value;
    const sn = snInput.value;
    const info = validateMotor(brand, sn);
    out.innerHTML = info.valid ? '<span class="badge good">Válido</span> Estrutura mínima OK.' : '<span class="badge bad">Inválido</span> '+info.reason;
    let photoName='', photoData='';
    if (file && file.files && file.files[0]){ photoName=file.files[0].name; try{ photoData = await readFileAsDataURL(file.files[0]); }catch(e){} }
    const rec = {date:new Date().toISOString(), brand, sn, valid:info.valid, reason:info.reason || (info.valid?'OK':''), photoName, photoData};
    const arr = loadFromLS(NAV.STORAGE.MOTOR_HISTORY); arr.unshift(rec); saveToLS(NAV.STORAGE.MOTOR_HISTORY, arr);
  });
})();