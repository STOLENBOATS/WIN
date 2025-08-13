(function(){
  if (sessionStorage.getItem(NAV.STORAGE.SESSION) !== 'ok'){ alert('Sessão expirada. Faça login.'); location.replace('login.html'); return; }
  const form = document.getElementById('formWin');
  const input = document.getElementById('win');
  const file = document.getElementById('winPhoto');
  const out = document.getElementById('winOut');
  const table = document.getElementById('interpWinBody');

  function interpretWIN(win){
    const c = win.replace(/-/g,'').toUpperCase().trim();
    if (c.length!==14 && c.length!==16) return {valid:false, reason:'Tamanho inválido (14/16).'};
    if (c.length===15) return {valid:false, reason:'Formato EUA não admite 15.'};
    if (!/^[A-Z0-9]+$/.test(c)) return {valid:false, reason:'Caracteres inválidos.'};
    const eu = (c.length===14);
    const country=c.slice(0,2), maker=c.slice(2,5);
    let series, month, year, model;
    if (eu){ series=c.slice(5,10); month=c.slice(10,11); year=c.slice(11,12); model=c.slice(12,14); }
    else { series=c.slice(5,12); month=c.slice(12,13); year=c.slice(13,14); model=c.slice(14,16); }
    if(!/^[A-Z]{2}$/.test(country)) return {valid:false,reason:'País inválido.'};
    if(!/^[A-Z]{3}$/.test(maker)) return {valid:false,reason:'Fabricante inválido.'};
    if(!/^[A-HJ-NPR-Z]$/.test(month)) return {valid:false,reason:'Mês inválido (I,O,Q proibidas).'};
    if(!/^[0-9]$/.test(year)) return {valid:false,reason:'Ano (1 dígito) inválido.'};
    if(!/^[0-9]{2}$/.test(model)) return {valid:false,reason:'Modelo (2 dígitos) inválido.'};
    const map="ABCDEFGHJKLMNPRSTUVWXYZ".split(''); const idx=map.indexOf(month);
    const monthName=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][idx%12];
    const yy=parseInt(year,10), myy=parseInt(model,10);
    return {valid:true, reason:'Estrutura válida.', eu, cleaned:c, country, maker, series, month, monthName, year, yearOptions:[1900+yy,2000+yy], model:model, modelOptions:[1900+myy,2000+myy]};
  }

  function renderInterpretation(info){
    table.innerHTML='';
    const rows=[
      ['País','Country', info.country, 'Código de país (2 letras) / 2-letter country code'],
      ['Fabricante','Manufacturer', info.maker, 'Código fabricante (3 letras) / 3-letter maker code'],
      ['Série','Series', info.series, 'Sequência livre / Free sequence'],
      ['Mês de produção','Prod. month', info.month, info.monthName],
      ['Ano de produção','Prod. year', info.year, info.yearOptions.join(' / ')],
      ['Ano do modelo','Model year', info.model, info.modelOptions.join(' / ')],
      ['Formato','Format', info.eu?'UE (14)':'EUA (16)', 'Derivado do comprimento / Based on length']
    ];
    rows.forEach(r=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${r[0]}<div class="small">${r[1]}</div></td><td><strong>${r[2]}</strong></td><td>${r[3]}</td>`;
      table.appendChild(tr);
    });
  }

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const win = input.value.trim();
    const info = interpretWIN(win);
    if(!info.valid){ out.innerHTML = '<span class="badge bad">Inválido</span> '+info.reason; table.innerHTML=''; }
    else { out.innerHTML = '<span class="badge good">Válido</span> Estrutura conforme regras básicas.'; renderInterpretation(info); }
    // Photo (optional)
    let photoName='', photoData='';
    if (file && file.files && file.files[0]){ photoName=file.files[0].name; try{ photoData = await readFileAsDataURL(file.files[0]); }catch(e){} }
    // Save
    const rec = {date:new Date().toISOString(), win, valid:info.valid, reason:info.reason || (info.valid?'OK':''), photoName, photoData};
    const arr = loadFromLS(NAV.STORAGE.WIN_HISTORY); arr.unshift(rec); saveToLS(NAV.STORAGE.WIN_HISTORY, arr);
  });
})();