/* FIT TO PASS nutrition extension — free, local-first, no paid API key.
   Generic food values are estimates; packaged-food lookup uses Open Food Facts and must be checked against the label. */
(function () {
  'use strict';

  const $n = id => document.getElementById(id);
  const nutrientProfiles = {
    '黄油吐司': {c:48,fat:12,fiber:2,satFat:5,sugar:8,freeSugar:null,sodium:450,cholesterol:35},
    '奥利奥饼干': {c:71,fat:20,fiber:2.5,satFat:6,sugar:38,freeSugar:35,sodium:400,cholesterol:0},
    '奥利奥': {c:71,fat:20,fiber:2.5,satFat:6,sugar:38,freeSugar:35,sodium:400,cholesterol:0},
    '白吐司': {c:49,fat:3.2,fiber:2.7,satFat:0.7,sugar:5,freeSugar:null,sodium:500,cholesterol:0},
    '全麦面包': {c:41,fat:4.2,fiber:7,satFat:0.7,sugar:6,freeSugar:null,sodium:400,cholesterol:0},
    '全麦吐司': {c:41,fat:4.2,fiber:7,satFat:0.7,sugar:6,freeSugar:null,sodium:400,cholesterol:0},
    '米饭': {c:28.2,fat:0.3,fiber:0.4,satFat:0.1,sugar:0.1,freeSugar:0,sodium:1,cholesterol:0},
    '燕麦': {c:67.7,fat:6.5,fiber:10.1,satFat:1.1,sugar:1,freeSugar:0,sodium:2,cholesterol:0},
    '燕麦粥': {c:12,fat:1.4,fiber:1.7,satFat:0.2,sugar:0.3,freeSugar:0,sodium:5,cholesterol:0},
    '水煮蛋': {c:1.1,fat:10.6,fiber:0,satFat:3.3,sugar:1.1,freeSugar:0,sodium:124,cholesterol:373},
    '煎蛋': {c:0.8,fat:14.5,fiber:0,satFat:3.7,sugar:0.8,freeSugar:0,sodium:160,cholesterol:370},
    '炒鸡蛋': {c:1.6,fat:10.6,fiber:0,satFat:3.3,sugar:1.1,freeSugar:0,sodium:120,cholesterol:350},
    '牛奶': {c:4.8,fat:3.3,fiber:0,satFat:1.9,sugar:4.8,freeSugar:0,sodium:43,cholesterol:10},
    '全脂牛奶': {c:4.8,fat:3.3,fiber:0,satFat:1.9,sugar:4.8,freeSugar:0,sodium:43,cholesterol:10},
    '半脱脂牛奶': {c:4.8,fat:1.7,fiber:0,satFat:1.1,sugar:4.8,freeSugar:0,sodium:44,cholesterol:7},
    '脱脂牛奶': {c:5,fat:0.2,fiber:0,satFat:0.1,sugar:5,freeSugar:0,sodium:42,cholesterol:2},
    '无糖酸奶': {c:4.7,fat:3.5,fiber:0,satFat:2.2,sugar:4.7,freeSugar:0,sodium:46,cholesterol:13},
    '希腊酸奶': {c:3.6,fat:5,fiber:0,satFat:3.3,sugar:3.6,freeSugar:0,sodium:36,cholesterol:10},
    '香蕉': {c:22.8,fat:0.3,fiber:2.6,satFat:0.1,sugar:12.2,freeSugar:0,sodium:1,cholesterol:0},
    '苹果': {c:13.8,fat:0.2,fiber:2.4,satFat:0,sugar:10.4,freeSugar:0,sodium:1,cholesterol:0},
    '橙子': {c:11.8,fat:0.1,fiber:2.4,satFat:0,sugar:9.4,freeSugar:0,sodium:0,cholesterol:0},
    '鸡胸肉': {c:0,fat:3.6,fiber:0,satFat:1,sugar:0,freeSugar:0,sodium:74,cholesterol:85},
    '鸡腿肉': {c:0,fat:10.9,fiber:0,satFat:3,sugar:0,freeSugar:0,sodium:90,cholesterol:115},
    '牛肉': {c:0,fat:10,fiber:0,satFat:4,sugar:0,freeSugar:0,sodium:60,cholesterol:90},
    '猪肉': {c:0,fat:14,fiber:0,satFat:5,sugar:0,freeSugar:0,sodium:60,cholesterol:80},
    '三文鱼': {c:0,fat:13,fiber:0,satFat:3.1,sugar:0,freeSugar:0,sodium:59,cholesterol:55},
    '鱼肉': {c:0,fat:1.5,fiber:0,satFat:0.3,sugar:0,freeSugar:0,sodium:70,cholesterol:60},
    '鳕鱼': {c:0,fat:0.7,fiber:0,satFat:0.1,sugar:0,freeSugar:0,sodium:54,cholesterol:43},
    '虾': {c:0.2,fat:0.3,fiber:0,satFat:0.1,sugar:0,freeSugar:0,sodium:111,cholesterol:189},
    '豆腐': {c:2,fat:5,fiber:0.7,satFat:0.9,sugar:0.6,freeSugar:0,sodium:7,cholesterol:0},
    '西兰花': {c:6.6,fat:0.4,fiber:2.6,satFat:0.1,sugar:1.7,freeSugar:0,sodium:33,cholesterol:0},
    '青菜': {c:3.5,fat:0.3,fiber:1.8,satFat:0.1,sugar:1.2,freeSugar:0,sodium:65,cholesterol:0},
    '黄瓜': {c:3.6,fat:0.1,fiber:0.5,satFat:0,sugar:1.7,freeSugar:0,sodium:2,cholesterol:0},
    '番茄': {c:3.9,fat:0.2,fiber:1.2,satFat:0,sugar:2.6,freeSugar:0,sodium:5,cholesterol:0},
    '胡萝卜': {c:9.6,fat:0.2,fiber:2.8,satFat:0,sugar:4.7,freeSugar:0,sodium:69,cholesterol:0},
    '菠菜': {c:3.6,fat:0.4,fiber:2.2,satFat:0.1,sugar:0.4,freeSugar:0,sodium:79,cholesterol:0},
    '生菜': {c:2.9,fat:0.2,fiber:1.3,satFat:0,sugar:1.2,freeSugar:0,sodium:28,cholesterol:0},
    '蘑菇': {c:3.3,fat:0.3,fiber:1,satFat:0.1,sugar:2,freeSugar:0,sodium:5,cholesterol:0},
    '洋葱': {c:9.3,fat:0.1,fiber:1.7,satFat:0,sugar:4.2,freeSugar:0,sodium:4,cholesterol:0},
    '玉米': {c:21,fat:1.5,fiber:2.4,satFat:0.2,sugar:4.5,freeSugar:0,sodium:15,cholesterol:0},
    '豌豆': {c:14.5,fat:0.4,fiber:5.1,satFat:0.1,sugar:5.7,freeSugar:0,sodium:5,cholesterol:0},
    '菜花': {c:5,fat:0.3,fiber:2,satFat:0.1,sugar:1.9,freeSugar:0,sodium:30,cholesterol:0},
    '草莓': {c:7.7,fat:0.3,fiber:2,satFat:0,sugar:4.9,freeSugar:0,sodium:1,cholesterol:0},
    '蓝莓': {c:14.5,fat:0.3,fiber:2.4,satFat:0,sugar:10,freeSugar:0,sodium:1,cholesterol:0},
    '牛油果': {c:8.5,fat:14.7,fiber:6.7,satFat:2.1,sugar:0.7,freeSugar:0,sodium:7,cholesterol:0},
    '杏仁': {c:21.6,fat:49.9,fiber:12.5,satFat:3.8,sugar:4.4,freeSugar:0,sodium:1,cholesterol:0},
    '核桃': {c:13.7,fat:65.2,fiber:6.7,satFat:6.1,sugar:2.6,freeSugar:0,sodium:2,cholesterol:0},
    '腰果': {c:30.2,fat:43.9,fiber:3.3,satFat:7.8,sugar:5.9,freeSugar:0,sodium:12,cholesterol:0},
    '花生酱': {c:20,fat:50,fiber:6,satFat:10,sugar:9,freeSugar:null,sodium:400,cholesterol:0},
    '切达奶酪': {c:1.3,fat:33.1,fiber:0,satFat:21.1,sugar:0.5,freeSugar:0,sodium:621,cholesterol:105},
    '黑巧克力': {c:45.9,fat:42.6,fiber:10.9,satFat:24.5,sugar:24,freeSugar:null,sodium:20,cholesterol:0},
    '薯片': {c:52,fat:34,fiber:4.8,satFat:10,sugar:0.5,freeSugar:0,sodium:525,cholesterol:0},
    '曲奇': {c:65,fat:22,fiber:2.5,satFat:10,sugar:25,freeSugar:null,sodium:350,cholesterol:30},
    '食用油': {c:0,fat:100,fiber:0,satFat:14,sugar:0,freeSugar:0,sodium:0,cholesterol:0},
    '黄油': {c:0.1,fat:81,fiber:0,satFat:51,sugar:0.1,freeSugar:0,sodium:215,cholesterol:215},
    '咖啡': {c:0,fat:0,fiber:0,satFat:0,sugar:0,freeSugar:0,sodium:2,cholesterol:0},
    '米粥': {c:12,fat:0.2,fiber:0.2,satFat:0,sugar:0.1,freeSugar:0,sodium:2,cholesterol:0},
    '面条': {c:25,fat:1.5,fiber:1.2,satFat:0.3,sugar:0.6,freeSugar:0,sodium:5,cholesterol:0},
    '意大利面': {c:30.9,fat:0.9,fiber:1.8,satFat:0.2,sugar:0.6,freeSugar:0,sodium:1,cholesterol:0},
    '意大利面（熟）': {c:30.9,fat:0.9,fiber:1.8,satFat:0.2,sugar:0.6,freeSugar:0,sodium:1,cholesterol:0},
    '披萨': {c:33,fat:10,fiber:2.3,satFat:4,sugar:3,sodium:600,cholesterol:25},
    '汉堡': {c:30,fat:12,fiber:2,satFat:4.5,sugar:5,sodium:550,cholesterol:45},
    '牛肉汉堡': {c:28,fat:13,fiber:2,satFat:5,sugar:5,sodium:600,cholesterol:55},
    '薯条': {c:41,fat:15,fiber:3.8,satFat:2.5,sugar:0.3,sodium:210,cholesterol:0},
    '沙拉': {c:5,fat:4,fiber:2,satFat:1,sugar:3,freeSugar:null,sodium:180,cholesterol:10},
    '鸡肉沙拉': {c:7,fat:6,fiber:2,satFat:1.5,sugar:3,freeSugar:null,sodium:250,cholesterol:35},
    '番茄炒蛋': {c:5,fat:8,fiber:1,satFat:2,sugar:3,freeSugar:0,sodium:250,cholesterol:90},
    '蔬菜汤': {c:5,fat:1,fiber:1.5,satFat:0.2,sugar:2,sodium:250,cholesterol:0},
    '鸡汤': {c:1,fat:1.5,fiber:0,satFat:0.4,sugar:0.5,sodium:250,cholesterol:10}
  };

  const nutrientKeys = ['p','c','fat','fiber','satFat','sugar','freeSugar','sodium','cholesterol'];
  const nutrientLabels = {p:'蛋白质',c:'碳水化合物',fat:'脂肪',fiber:'膳食纤维',satFat:'饱和脂肪',sugar:'总糖',freeSugar:'游离糖',sodium:'钠',cholesterol:'胆固醇'};
  const nutrientUnits = {p:'g',c:'g',fat:'g',fiber:'g',satFat:'g',sugar:'g',freeSugar:'g',sodium:'mg',cholesterol:'mg'};
  const isNum = v => v !== null && v !== undefined && v !== '' && Number.isFinite(Number(v));
  const fmt = v => Math.round((Number(v)||0)*10)/10;
  const getPer100 = (food,key) => {
    let v = food && food[key];
    if (!isNum(v) && nutrientProfiles[food && food.name]) v = nutrientProfiles[food.name][key];
    return isNum(v) ? Number(v) : null;
  };

  if (typeof foods !== 'undefined') {
    foods.forEach(food => {
      if (nutrientProfiles[food.name]) Object.assign(food,nutrientProfiles[food.name]);
    });
    if (!foods.some(food => food.name === '沙拉酱')) {
      foods.push({name:'沙拉酱',k:450,p:1,unit:15,aliases:['沙拉酱','蛋黄酱','美乃滋','mayonnaise'],c:7,fat:45,fiber:0,satFat:7,sugar:5,freeSugar:null,sodium:650,cholesterol:40});
    }
  }

  function totalsFor(list) {
    const result = {};
    ['k'].concat(nutrientKeys).forEach(key => {
      let value = 0, known = 0;
      (list||[]).forEach(food => {
        const per = key === 'k' ? (isNum(food.k) ? Number(food.k) : null) : getPer100(food,key);
        if (per !== null) { value += (Number(food.grams)||0)*per/100; known++; }
      });
      result[key] = {value:value,known:known,total:(list||[]).length,complete:known === (list||[]).length};
    });
    return result;
  }

  function foodSummary(food) {
    const t = totalsFor([food]);
    return '约 '+Math.round(t.k.value)+' kcal · 蛋白质 '+(t.p.known?fmt(t.p.value)+' g':'未提供')+' · 碳水 '+(t.c.known?fmt(t.c.value)+' g':'未提供')+' · 脂肪 '+(t.fat.known?fmt(t.fat.value)+' g':'未提供')+' · 纤维 '+(t.fiber.known?fmt(t.fiber.value)+' g':'未提供');
  }

  if (typeof parseText === 'function') {
    const originalParseText = parseText;
    parseText = function (text) {
      return originalParseText(text).map(food => Object.assign(food,nutrientProfiles[food.name]||{}));
    };
  }

  function fieldInput(label,key,food,step) {
    const value = isNum(food[key]) ? food[key] : '';
    return '<label class="ftp-estimate-field">'+label+'<input type="number" min="0" step="'+(step||'0.1')+'" data-field="'+key+'" value="'+value+'" aria-label="'+label+'"></label>';
  }

  if (typeof renderEstimate === 'function') {
    renderEstimate = function () {
      const box = $n('estimateRows');
      if (!box) return;
      box.innerHTML = '';
      pending.forEach((food,index) => {
        const row = document.createElement('div');
        row.className = 'ftp-estimate-card';
        row.innerHTML =
          '<div class="ftp-estimate-top"><b>'+safe(food.name)+'</b><button type="button" class="secondary" data-remove="'+index+'">删除</button></div>'+
          '<div class="ftp-estimate-grid">'+
            fieldInput('份量（g）','grams',food,'1')+
            fieldInput('热量 kcal/100g','k',food,'1')+
            fieldInput('蛋白质 g/100g','p',food,'0.1')+
            fieldInput('碳水 g/100g','c',food,'0.1')+
            fieldInput('脂肪 g/100g','fat',food,'0.1')+
          '</div>'+
          '<details class="ftp-estimate-more"><summary>补充营养数据（每100g，可留空）</summary><div class="ftp-estimate-grid ftp-extra-grid">'+
            fieldInput('膳食纤维 g','fiber',food,'0.1')+
            fieldInput('饱和脂肪 g','satFat',food,'0.1')+
            fieldInput('总糖 g','sugar',food,'0.1')+
            fieldInput('游离糖 g','freeSugar',food,'0.1')+
            fieldInput('钠 mg','sodium',food,'1')+
            fieldInput('胆固醇 mg','cholesterol',food,'1')+
          '</div></details>'+
          '<div class="ftp-estimate-total" data-summary="'+index+'">'+foodSummary(food)+'</div>';
        box.append(row);
      });
      box.querySelectorAll('input[data-field]').forEach(input => input.addEventListener('input',function () {
        const index = Number(input.closest('.ftp-estimate-card').querySelector('[data-remove]').dataset.remove);
        const key = input.dataset.field;
        pending[index][key] = input.value.trim() === '' ? null : Math.max(0,Number(input.value)||0);
        const summary = box.querySelector('[data-summary="'+index+'"]');
        if (summary) summary.textContent = foodSummary(pending[index]);
        updateReply();
      }));
      box.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click',function () {
        pending.splice(Number(button.dataset.remove),1);
        renderEstimate();
        updateReply();
      }));
    };
  }

  if (typeof updateReply === 'function') {
    updateReply = function () {
      const result = totalsFor(pending);
      const missing = pending.length-result.p.known;
      const note = missing ? '；'+missing+'项尚缺蛋白质数据，完整度需进一步核对' : '';
      const el = $n('reply');
      if (!el) return;
      el.classList.remove('hidden');
      el.textContent = pending.length ?
        '当前待保存 '+pending.length+' 项：约 '+Math.round(result.k.value)+' kcal；蛋白质 '+fmt(result.p.value)+' g；碳水 '+(result.c.known?fmt(result.c.value)+' g':'数据不足')+'；脂肪 '+(result.fat.known?fmt(result.fat.value)+' g':'数据不足')+'；膳食纤维 '+(result.fiber.known?fmt(result.fiber.value)+' g':'数据不足')+note+'。检查后点击“确认并保存”。' :
        '还没有待保存食物。可以从清单添加、搜索包装食品，或直接手动录入任何食物。';
    };
  }

  function showEstimate() {
    $n('estimates') && $n('estimates').classList.remove('hidden');
    renderEstimate();
    updateReply();
  }

  const picker = document.querySelector('.food-picker');
  if (picker && !$n('ftpFoodTools')) {
    const tools = document.createElement('div');
    tools.id = 'ftpFoodTools';
    tools.innerHTML =
      '<div class="ftp-food-search">'+
        '<h3>🔎 搜索品牌 / 包装食品营养数据</h3>'+
        '<p class="note">使用免费的 Open Food Facts 开放数据库检索包装食品；数据由用户贡献，可能缺项或不准确，请与包装营养标签核对。只在点击搜索时联网，不会后台自动搜索。</p>'+
        '<div class="ftp-search-row"><input id="ftpProductQuery" type="search" placeholder="例如：Tesco Greek yoghurt / Weetabix / protein bar"><button id="ftpSearchProduct" type="button">搜索营养数据</button></div>'+
        '<div id="ftpProductStatus" class="note" aria-live="polite"></div><div id="ftpProductResults"></div>'+
      '</div>'+
      '<div class="ftp-manual-food">'+
        '<h3>✍️ 直接录入任何食物 / 自制菜</h3>'+
        '<p class="note">清单里没有的沙拉、盖饭、外卖或自制菜，都可以直接记录。只知道热量时，填写整份热量即可；其他营养素可以留空，不会被系统错误地当成0。</p>'+
        '<div class="ftp-manual-grid">'+
          '<label>食物 / 菜品名称<input id="ftpManualName" type="text" placeholder="例如：自制鸡胸肉蔬菜沙拉"></label>'+
          '<label>整份估计重量（g）<input id="ftpManualGrams" type="number" min="1" max="5000" value="300"></label>'+
          '<label>整份热量（kcal）<input id="ftpManualKcal" type="number" min="0" max="10000" placeholder="必填"></label>'+
          '<label>蛋白质（整份 g）<input id="ftpManualP" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>碳水化合物（整份 g）<input id="ftpManualC" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>脂肪（整份 g）<input id="ftpManualFat" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>膳食纤维（整份 g）<input id="ftpManualFiber" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>饱和脂肪（整份 g）<input id="ftpManualSatFat" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>总糖（整份 g）<input id="ftpManualSugar" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>游离糖（整份 g）<input id="ftpManualFreeSugar" type="number" min="0" step="0.1" placeholder="选填"></label>'+
          '<label>钠（整份 mg）<input id="ftpManualSodium" type="number" min="0" step="1" placeholder="选填"></label>'+
          '<label>胆固醇（整份 mg）<input id="ftpManualChol" type="number" min="0" step="1" placeholder="选填"></label>'+
        '</div><button id="ftpAddManual" type="button">＋ 添加这份食物</button>'+
      '</div>';
    picker.insertAdjacentElement('afterend',tools);
  }

  const manualFields = [
    ['p','ftpManualP'],['c','ftpManualC'],['fat','ftpManualFat'],['fiber','ftpManualFiber'],
    ['satFat','ftpManualSatFat'],['sugar','ftpManualSugar'],['freeSugar','ftpManualFreeSugar'],
    ['sodium','ftpManualSodium'],['cholesterol','ftpManualChol']
  ];
  $n('ftpAddManual') && ($n('ftpAddManual').onclick = function () {
    const name = $n('ftpManualName').value.trim();
    const grams = Number($n('ftpManualGrams').value);
    const kcal = Number($n('ftpManualKcal').value);
    if (!name) return alert('请填写食物或菜品名称。');
    if (!(grams>0 && grams<=5000)) return alert('请填写1–5000g的合理份量。');
    if (!isNum($n('ftpManualKcal').value) || kcal<0 || kcal>10000) return alert('请填写整份热量（kcal）。');
    const item = {id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:name,grams:grams,k:kcal*100/grams,p:null,c:null,fat:null,fiber:null,satFat:null,sugar:null,freeSugar:null,sodium:null,cholesterol:null,meal:$n('meal').value,uncertain:true,source:'手动输入'};
    manualFields.forEach(([key,id]) => {
      const value = $n(id).value.trim();
      item[key] = value === '' ? null : Number(value)*100/grams;
    });
    pending.push(item);
    ['ftpManualName','ftpManualKcal','ftpManualP','ftpManualC','ftpManualFat','ftpManualFiber','ftpManualSatFat','ftpManualSugar','ftpManualFreeSugar','ftpManualSodium','ftpManualChol'].forEach(id => $n(id).value='');
    $n('ftpManualGrams').value='300';
    showEstimate();
    $n('estimates').scrollIntoView({behavior:'smooth',block:'start'});
  });

  if ($n('addUnknown')) $n('addUnknown').onclick = function () {
    const panel = $n('ftpFoodTools');
    if (panel) panel.scrollIntoView({behavior:'smooth',block:'center'});
    $n('ftpManualName') && $n('ftpManualName').focus();
  };

  if ($n('addCatalogFood')) $n('addCatalogFood').onclick = function () {
    const food = foods.find(item => item.name === $n('foodPick').value);
    if (!food) return alert('请先选择食物。');
    const grams = Number($n('foodGrams').value);
    if (!(grams>0 && grams<=5000)) return alert('请填写合理的食物重量。');
    pending.push(Object.assign({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:food.name,grams:grams,k:food.k,p:food.p,meal:$n('meal').value,uncertain:true,source:'内置食物估算'},food));
    showEstimate();
  };

  let lastOffSearch = 0;
  let offProducts = [];
  function offValue(nutrients,key) {
    const value = nutrients && nutrients[key];
    return isNum(value) ? Number(value) : null;
  }
  function mapOffProduct(product) {
    const n = product.nutriments || {};
    let kcal = offValue(n,'energy-kcal_100g');
    if (kcal === null) {
      const kj = offValue(n,'energy_100g');
      if (kj !== null) kcal = kj/4.184;
    }
    if (kcal === null) return null;
    let sodium = offValue(n,'sodium_100g');
    if (sodium !== null) sodium *= 1000;
    else {
      const salt = offValue(n,'salt_100g');
      sodium = salt === null ? null : salt*400;
    }
    const name = String(product.product_name||product.product_name_en||'未命名产品').trim();
    return {
      id:crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()),
      name:name+(product.brands?'（'+product.brands+'）':''),
      grams:100,k:kcal,p:offValue(n,'proteins_100g'),c:offValue(n,'carbohydrates_100g'),
      fat:offValue(n,'fat_100g'),fiber:offValue(n,'fiber_100g'),
      satFat:offValue(n,'saturated-fat_100g'),sugar:offValue(n,'sugars_100g'),
      freeSugar:null,sodium:sodium,cholesterol:offValue(n,'cholesterol_100g'),
      meal:$n('meal').value,uncertain:true,source:'Open Food Facts（众包数据）',
      productUrl:product.url||'',brand:product.brands||''
    };
  }
  function renderOffResults(products) {
    const root = $n('ftpProductResults');
    root.innerHTML = '';
    if (!products.length) { root.textContent='没有找到包含热量数据的产品。可以尝试英文品牌名，或使用下方手动录入。'; return; }
    products.forEach((product,index) => {
      const item = mapOffProduct(product);
      if (!item) return;
      const row = document.createElement('div');
      row.className='ftp-off-result';
      const info = document.createElement('div');
      info.innerHTML='<b>'+safe(item.name)+'</b><div class="note">'+Math.round(item.k)+' kcal/100g · 蛋白质 '+(item.p===null?'—':fmt(item.p))+'g · 碳水 '+(item.c===null?'—':fmt(item.c))+'g · 脂肪 '+(item.fat===null?'—':fmt(item.fat))+'g</div><div class="note">数据来源：Open Food Facts；请核对包装标签。</div>';
      const add = document.createElement('button');
      add.type='button';add.textContent='添加';
      add.onclick=function(){item.meal=$n('meal').value;pending.push(Object.assign({},item));showEstimate();};
      row.append(info,add);root.append(row);
    });
  }
  $n('ftpSearchProduct') && ($n('ftpSearchProduct').onclick = async function () {
    const query = $n('ftpProductQuery').value.trim();
    if (!query) { $n('ftpProductStatus').textContent='请先输入产品名称或品牌。'; return; }
    if (Date.now()-lastOffSearch<6500) { $n('ftpProductStatus').textContent='为遵守免费数据库的搜索频率限制，请稍等几秒再搜索。'; return; }
    lastOffSearch=Date.now();
    const button=$n('ftpSearchProduct');button.disabled=true;button.textContent='正在搜索…';
    $n('ftpProductStatus').textContent='正在查询免费开放食品数据库…';
    try {
      const url='https://world.openfoodfacts.org/cgi/search.pl?search_terms='+encodeURIComponent(query)+'&search_simple=1&action=process&json=1&page_size=8&fields=product_name,product_name_en,brands,quantity,nutriments,url';
      const response=await fetch(url,{headers:{Accept:'application/json'}});
      if (!response.ok) throw new Error('数据库响应 '+response.status);
      const data=await response.json();
      offProducts=Array.isArray(data.products)?data.products:[];
      renderOffResults(offProducts);
      $n('ftpProductStatus').textContent='搜索完成。结果为社区贡献数据，不保证每个营养字段完整或准确。';
    } catch (error) {
      $n('ftpProductStatus').textContent='暂时无法连接食品数据库：'+error.message+'。你仍可使用内置食物或手动录入。';
    } finally {
      button.disabled=false;button.textContent='搜索营养数据';
    }
  });

  function renderDailyNutrition() {
    const root=$n('ftpDailyNutritionGrid');
    if (!root || typeof day!=='function') return;
    const foodsToday=day(selected()).foods||[];
    const sum=totalsFor(foodsToday);
    const targets=typeof calculateNutritionTargets==='function'?calculateNutritionTargets(goals):null;
    const metrics=[
      {label:'能量',key:'k',unit:'kcal',target:targets&&targets.calories},
      {label:'蛋白质',key:'p',unit:'g',target:targets&&targets.proteinTarget},
      {label:'碳水化合物',key:'c',unit:'g',target:targets&&targets.carbs},
      {label:'脂肪',key:'fat',unit:'g',target:targets&&targets.fat},
      {label:'膳食纤维',key:'fiber',unit:'g',target:targets&&targets.fiber}
    ];
    if (!foodsToday.length) {
      root.innerHTML='<div class="nutrition-empty">今天还没有饮食记录。添加食物后，这里会自动汇总能量、蛋白质、碳水、脂肪和膳食纤维。</div>';
    } else {
      root.innerHTML=metrics.map(metric=>{
        const x=sum[metric.key],pct=metric.target?Math.min(100,x.value/metric.target*100):0;
        const partial=x.known<x.total;
        const amount=x.known===0?'暂无数据':fmt(x.value)+' '+metric.unit+(partial?'（'+x.known+'/'+x.total+'项有数据）':'');
        const target=metric.target?' / '+metric.target+' '+metric.unit:' / 目标待计算';
        return '<div class="ftp-nutrient-card"><div class="ftp-nutrient-head"><b>'+metric.label+'</b><span>'+amount+target+'</span></div><div class="ftp-nutrient-track"><i style="width:'+(metric.target?pct:0)+'%"></i></div><small>'+(partial?'当前仅累计有数据的食物，实际摄入可能更高':(metric.target?'当前记录 / 每日参考目标':'请先完善个人资料计算目标'))+'</small></div>';
      }).join('');
    }

    const extras=$n('ftpExtraNutrients');
    if (extras) {
      const extraMetrics=[
        ['饱和脂肪','satFat','g',targets&&targets.satFatMax,'<'],
        ['游离糖','freeSugar','g',targets&&targets.freeSugarMax,'<'],
        ['钠','sodium','mg',targets&&targets.sodiumMax,'<'],
        ['总糖','sugar','g',null,''],
        ['胆固醇','cholesterol','mg',null,'']
      ];
      extras.innerHTML=extraMetrics.map(row=>{
        const x=sum[row[1]],val=x.known?fmt(x.value)+' '+row[2]:'数据不足';
        const target=row[3]?(row[4]+' '+row[3]+' '+row[2]):(row[1]==='cholesterol'?'不设统一上限':'仅观察');
        return '<div class="ftp-extra-item"><span>'+row[0]+'</span><b>'+val+'</b><small>参考：'+target+(x.known<x.total&&foodsToday.length?' · '+x.known+'/'+x.total+'项':'')+'</small></div>';
      }).join('');
    }

    const alerts=$n('ftpNutritionAlerts');
    if (alerts) {
      const notes=[];
      const incomplete=['p','c','fat','fiber'].some(key=>sum[key].known<sum[key].total);
      if (incomplete && foodsToday.length) notes.push('有些食物缺少完整营养数据。当前合计只计算已知项目，不能把缺失值当作0，也不能据此判断全天是否达标。');
      if (targets && sum.sodium.known===foodsToday.length && foodsToday.length && sum.sodium.value>targets.sodiumMax) notes.push('钠摄入估算已超过每日参考上限；留意酱料、加工肉、汤底和包装食品。');
      if (targets && sum.satFat.known===foodsToday.length && foodsToday.length && sum.satFat.value>targets.satFatMax) notes.push('饱和脂肪估算已超过参考上限，可考虑减少黄油、肥肉和高脂奶酪。');
      if (sum.freeSugar.known<sum.freeSugar.total && foodsToday.length) notes.push('游离糖数据尚不完整；系统不会把完整水果中的天然糖自动算作游离糖。');
      if (foodsToday.length) notes.push('胆固醇仅显示食物估算量，不设置通用的个人达标上限；应结合整体膳食和临床血脂结果理解。');
      alerts.innerHTML=notes.map(note=>'<div class="ftp-nutrition-alert">'+safe(note)+'</div>').join('');
    }
  }

  function renderMealNutrition() {
    const root=$n('todayFoods');
    if (!root) return;
    const cards=[...root.querySelectorAll('.meal-card')];
    cards.forEach(card=>{
      const title=card.querySelector('h3');
      if (!title) return;
      const meal=title.textContent.split(' ')[0];
      const entries=(day(selected()).foods||[]).filter(food=>(food.meal||'加餐')===meal);
      const sum=totalsFor(entries);
      let note=card.querySelector('.ftp-meal-nutrition');
      if (!note) {note=document.createElement('div');note.className='ftp-meal-nutrition';card.append(note);}
      if (!entries.length) {note.textContent='';return;}
      note.textContent='营养小计：蛋白质 '+(sum.p.known?fmt(sum.p.value)+'g':'—')+' · 碳水 '+(sum.c.known?fmt(sum.c.value)+'g':'—')+' · 脂肪 '+(sum.fat.known?fmt(sum.fat.value)+'g':'—')+' · 纤维 '+(sum.fiber.known?fmt(sum.fiber.value)+'g':'—');
    });
  }

  if (typeof render === 'function') {
    const originalRender=render;
    render=function(){originalRender();renderDailyNutrition();renderMealNutrition();};
  }

  const proteinMeasure=$n('proteinMeasure');
  if (proteinMeasure) {
    const oldText=proteinMeasure.textContent;
    proteinMeasure.title=oldText;
  }

  const dashboardTargets=$n('dashboardNutritionTargets');
  if (dashboardTargets && ! $n('ftpDailyNutrition')) {
    const panel=document.createElement('div');
    panel.id='ftpDailyNutrition';
    panel.innerHTML='<h3 class="ftp-daily-title">今日实际营养摄入</h3><div id="ftpDailyNutritionGrid"></div><h4 class="ftp-extra-title">其他观察指标</h4><div id="ftpExtraNutrients" class="ftp-extra-grid"></div><div id="ftpNutritionAlerts" aria-live="polite"></div>';
    dashboardTargets.insertAdjacentElement('afterend',panel);
  }

  /* Personalised custom exercise names for activities not in the preset list. */
  function addCustomOption(selectId) {
    const select=$n(selectId);
    if (select && ![...select.options].some(option=>option.value==='custom')) {
      const option=document.createElement('option');option.value='custom';option.textContent='其他（自定义）';select.append(option);
    }
  }
  addCustomOption('exerciseType');
  addCustomOption('extraExerciseType');
  const mainExercise=$n('exerciseType');
  if (mainExercise && mainExercise.parentElement && !$n('ftpMainExerciseName')) {
    const input=document.createElement('input');input.id='ftpMainExerciseName';input.type='text';input.placeholder='输入运动名称，例如：游泳、羽毛球、跑步';input.style.marginTop='7px';input.className='hidden';
    mainExercise.parentElement.append(input);
    mainExercise.addEventListener('change',()=>input.classList.toggle('hidden',mainExercise.value!=='custom'));
  }
  const extraExercise=$n('extraExerciseType');
  if (extraExercise && extraExercise.parentElement && !$n('ftpExtraExerciseName')) {
    const input=document.createElement('input');input.id='ftpExtraExerciseName';input.type='text';input.placeholder='输入其他运动项目';input.style.marginTop='7px';input.className='hidden';
    extraExercise.parentElement.append(input);
    extraExercise.addEventListener('change',()=>input.classList.toggle('hidden',extraExercise.value!=='custom'));
  }
  if (typeof renderExerciseEntries==='function') {
    renderExerciseEntries=function(){
      const root=$n('exerciseEntries');if(!root)return;root.innerHTML='';
      const h=day(selected()).health||{};
      (h.exerciseEntries||[]).forEach((entry,index)=>{
        const row=document.createElement('div');row.className='row';
        const label=document.createElement('span');
        const names={strength:'力量训练',cardio:'低冲击有氧',yoga:'瑜伽拉伸',dance:'跳舞',cycle:'室内单车',stairs:'爬楼梯',walk:'快走'};
        label.textContent=(entry.name||names[entry.type]||entry.type)+' · '+entry.minutes+'分钟';
        const remove=document.createElement('button');remove.className='secondary';remove.textContent='删除';
        remove.onclick=()=>{h.exerciseEntries.splice(index,1);persist();render();};
        row.append(label,remove);root.append(row);
      });
    };
  }
  if (typeof renderHealth==='function') {
    const originalRenderHealth=renderHealth;
    renderHealth=function(){
      originalRenderHealth();
      const h=day(selected()).health||{};
      if ($n('ftpMainExerciseName')) {
        $n('ftpMainExerciseName').value=h.exerciseCustomName||'';
        $n('ftpMainExerciseName').classList.toggle('hidden',$n('exerciseType').value!=='custom');
      }
      if ($n('ftpExtraExerciseName')) $n('ftpExtraExerciseName').classList.toggle('hidden',$n('extraExerciseType').value!=='custom');
      if (h.exerciseType==='custom' && h.exerciseCustomName && $n('healthSummary')) {
        $n('healthSummary').textContent=$n('healthSummary').textContent.replace('运动 custom','运动 '+h.exerciseCustomName);
      }
    };
  }
  if ($n('saveHealth')) {
    const oldSaveHealth=$n('saveHealth').onclick;
    $n('saveHealth').onclick=function(){
      if (oldSaveHealth) oldSaveHealth();
      const h=day(selected()).health||{};
      if (h.exerciseType==='custom') h.exerciseCustomName=($n('ftpMainExerciseName')&&$n('ftpMainExerciseName').value.trim())||'自定义运动';
      else delete h.exerciseCustomName;
      persist();if(typeof renderHealth==='function')renderHealth();
    };
  }
  if ($n('addExerciseEntry')) {
    const oldAddExercise=$n('addExerciseEntry').onclick;
    $n('addExerciseEntry').onclick=function(){
      const type=$n('extraExerciseType').value;
      const name=$n('ftpExtraExerciseName')?$n('ftpExtraExerciseName').value.trim():'';
      if (type==='custom' && !name) return alert('请填写自定义运动名称。');
      if (oldAddExercise) oldAddExercise();
      const entries=day(selected()).health.exerciseEntries||[];
      if (type==='custom' && entries.length) entries[entries.length-1].name=name;
      persist();renderExerciseEntries();
    };
  }

  /* Full-nutrient import prompt; manual review remains mandatory before saving. */
  if ($n('copyPrompt')) {
    $n('copyPrompt').onclick=function(){
      const prompt='请根据我提供的食物照片或描述，估算每种食物的可食重量(g)、每100g热量(kcal)、蛋白质(g)、碳水化合物(g)、脂肪(g)、膳食纤维(g)、饱和脂肪(g)、总糖(g)、游离糖(g)、钠(mg)、胆固醇(mg)。区分实测标签数据与估算值；未知字段填null，不要编造。考虑烹调用油、酱料和份量不确定性。只输出JSON：{"date":"'+selected()+'","meal":"午餐","foods":[{"name":"食物名称","grams":150,"k":130,"p":2.6,"c":28.2,"fat":0.3,"fiber":0.4,"satFat":0.1,"sugar":0.1,"freeSugar":null,"sodium":1,"cholesterol":0,"source":"估算","uncertain":true}]}';
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(prompt).then(()=>alert('完整营养估算指令已复制。')).catch(()=>window.prompt('复制以下指令：',prompt));
      else window.prompt('复制以下指令：',prompt);
    };
  }
  if (typeof chatPreview==='function') {
    const oldChatPreview=chatPreview;
    chatPreview=function(){
      oldChatPreview();
      if (Array.isArray(pending)) {
        pending=pending.map(food=>Object.assign(food,nutrientProfiles[food.name]||{}));
        renderEstimate();updateReply();
      }
    };
  }

  /* CSV export now includes every tracked nutrient without changing the JSON backup format. */
  if ($n('csv')) {
    $n('csv').onclick=function(){
      const rows=[['日期','餐次','食物','重量g','热量kcal','蛋白质g','碳水g','脂肪g','膳食纤维g','饱和脂肪g','总糖g','游离糖g','钠mg','胆固醇mg','数据来源']];
      Object.entries(db.days).forEach(([date,value])=>(value.foods||[]).forEach(food=>{
        const t=totalsFor([food]);
        rows.push([date,food.meal,food.name,food.grams,Math.round(t.k.value),t.p.known?fmt(t.p.value):'',t.c.known?fmt(t.c.value):'',t.fat.known?fmt(t.fat.value):'',t.fiber.known?fmt(t.fiber.value):'',t.satFat.known?fmt(t.satFat.value):'',t.sugar.known?fmt(t.sugar.value):'',t.freeSugar.known?fmt(t.freeSugar.value):'',t.sodium.known?fmt(t.sodium.value):'',t.cholesterol.known?fmt(t.cholesterol.value):'',food.source||'内置/历史估算']);
      }));
      const csv='\ufeff'+rows.map(row=>row.map(value=>'"'+String(value??'').replaceAll('"','""')+'"').join(',')).join('\r\n');
      download(csv,'FIT_TO_PASS_完整营养记录_'+today()+'.csv','text/csv;charset=utf-8');
    };
  }

  const style=document.createElement('style');
  style.textContent=
    '.ftp-food-search,.ftp-manual-food{border:1px solid #dcebe2;background:#fbfefc;border-radius:15px;padding:14px;margin:12px 0}'+
    '.ftp-food-search h3,.ftp-manual-food h3{font-size:16px;margin:0 0 5px;color:#244e3b}'+
    '.ftp-search-row{display:grid;grid-template-columns:1fr auto;gap:8px}'+
    '.ftp-manual-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}'+
    '.ftp-manual-grid label,.ftp-estimate-field{font-size:12px;color:#5d7466}'+
    '.ftp-manual-grid input,.ftp-estimate-field input{margin-top:4px;padding:8px;font-size:14px}'+
    '.ftp-off-result{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:10px 0;border-top:1px solid #e7eee9}'+
    '.ftp-estimate-card{border:1px solid #dfeae2;border-radius:13px;background:#fbfefc;padding:12px;margin:10px 0}'+
    '.ftp-estimate-top{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:9px}'+
    '.ftp-estimate-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}'+
    '.ftp-extra-grid{grid-template-columns:repeat(3,minmax(0,1fr))}'+
    '.ftp-estimate-more{margin-top:8px;font-size:13px;color:#496c57}'+
    '.ftp-estimate-more summary{cursor:pointer;padding:6px 0}'+
    '.ftp-estimate-total{margin-top:9px;padding:9px 10px;border-radius:9px;background:#eef8f2;color:#315b43;font-size:13px;line-height:1.5}'+
    '.ftp-daily-title{font-size:16px;margin:16px 0 9px;color:#244e3b}'+
    '.ftp-nutrient-card{padding:9px 0;border-bottom:1px solid #e9f0eb}'+
    '.ftp-nutrient-head{display:flex;justify-content:space-between;gap:8px;align-items:baseline;font-size:13px}'+
    '.ftp-nutrient-head span{font-weight:700;text-align:right;color:#2e6548}'+
    '.ftp-nutrient-track{height:8px;background:#edf2ee;border-radius:99px;overflow:hidden;margin:6px 0 4px}'+
    '.ftp-nutrient-track i{display:block;height:100%;background:#27a56a;border-radius:99px}'+
    '.ftp-nutrient-card small,.ftp-extra-item small{font-size:11px;color:#78887e}'+
    '.ftp-extra-title{font-size:14px;margin:13px 0 7px;color:#496c57}'+
    '.ftp-extra-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}'+
    '.ftp-extra-item{background:#f5faf6;border:1px solid #e5eee7;border-radius:10px;padding:8px;min-width:0}'+
    '.ftp-extra-item span,.ftp-extra-item b,.ftp-extra-item small{display:block}'+
    '.ftp-extra-item span{font-size:11px;color:#6d7e73}.ftp-extra-item b{font-size:15px;color:#315b43;margin:3px 0}'+
    '.ftp-nutrition-alert{margin-top:7px;padding:8px 10px;border-radius:9px;background:#fff8ec;color:#805d2b;font-size:12px;line-height:1.5}'+
    '.ftp-meal-nutrition{margin-top:8px;padding:8px 10px;background:#f3f8f4;border-radius:8px;color:#52705d;font-size:12px}'+
    '@media(max-width:760px){.ftp-manual-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ftp-estimate-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ftp-extra-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}'+
    '@media(max-width:480px){.ftp-search-row{grid-template-columns:1fr}.ftp-manual-grid,.ftp-extra-grid{grid-template-columns:1fr}.ftp-nutrient-head{align-items:flex-start;flex-direction:column}.ftp-off-result{align-items:flex-start}}';
  document.head.append(style);

  if (typeof render==='function') render();
})();