const blankWorkout = () => ({ name: '', exercises: [], startedAt: null, elapsed: 0 });
const routines = [
  { name: 'Costas + Bíceps', subtitle: 'Puxada vertical · Puxada horizontal · Braços · Cardio 25 min', color: 'blue', exercises: [['Puxador Frente (barra)', 4, '4–6', 'RPE 8–9'], ['Remada Curvada (máquina)', 4, '6–8', 'RPE 7–8'], ['Remada Unilateral (halter)', 3, '8–10', 'RPE 7–8'], ['Face Pull (cabo)', 3, '12–15', 'RPE 7'], ['Rosca Direta (barra)', 3, '8–10', 'RPE 7–8'], ['Rosca Martelo', 2, '10–12', 'RPE 7'], ['Banco Romano', 3, '10–12', 'RPE 7'], ['Cardio — esteira ou elíptico', 1, '25 min', '']] },
  { name: 'Ombro + Puxada Vertical', subtitle: 'Empurrar vertical · Puxada de equilíbrio · Deltoides · Cardio 25 min', color: 'blue', exercises: [['Desenvolvimento com Halter', 4, '4–6', 'RPE 8–9'], ['Elevação Lateral (halter)', 4, '12–15', ''], ['Crucifixo Inverso (máquina)', 3, '12–15', 'RPE 7'], ['Remada Alta', 3, '10–12', 'RPE 8–9'], ['Face Pull (cabo)', 3, '15', 'RPE 7'], ['Rotação Externa (elástico)', 3, '15', ''], ['Crunch no Cabo (em pé)', 3, '12–15', '45s'], ['Bird Dog', 3, '10 por lado', '45s'], ['Cardio — esteira ou elíptico', 1, '25 min', '']] },
  { name: 'Quadríceps + Posterior de Coxa', subtitle: 'Reabilitação · Cadeia posterior · Core', color: 'amber', exercises: [['Abdução de Quadril (máquina)', 2, '15–20', 'RPE 6'], ['Extensora Unilateral Excêntrica', 3, '8–10', '3 seg descida'], ['Goblet Squat', 3, '10–12', 'RPE 7'], ['Levantamento Terra (convencional)', 4, '5–6', 'RPE 8'], ['Flexora Sentada Unilateral', 3, '10–12', 'RPE 7'], ['Panturrilha Sentada', 3, '15–20', 'RPE 7'], ['Dead Bug', 3, '10 por lado', '45s'], ['Bird Dog', 3, '10 por lado', '45s']] },
  { name: 'Peito + Tríceps', subtitle: 'Empurrar horizontal · Tríceps · Manguito', color: 'lilac', exercises: [['Supino com Halter (plano)', 4, '4–6', 'RPE 8–9'], ['Face Pull (cabo)', 3, '15', 'RPE 7'], ['Chest Press (máquina inclinada)', 3, '8–10', 'RPE 7–8'], ['Pec Dec / Supino Máquina', 2, '8–10 + dropset', 'Até a falha no drop'], ['Tríceps Corda (cabo)', 3, '10–12', 'RPE 7–8'], ['Skull Crusher', 3, '8–10', 'RPE 7–8'], ['Prancha (isométrica)', 3, '20–30s', '45s'], ['Hollow Hold', 3, '15–20s', '45s']] },
  { name: 'Glúteo + Joelho + Bíceps', subtitle: 'Cadeia posterior · Glúteo · Reabilitação · Braços', color: 'amber', exercises: [['Abdução de Quadril (máquina)', 3, '15–20', 'RPE 6'], ['Glute Bridge (halter)', 4, '10–12', 'RPE 8'], ['RDL (halter)', 3, '10–12', 'RPE 7'], ['Goblet Squat', 3, '10–12', 'RPE 7'], ['Flexora Sentada Unilateral', 3, '10–12', 'RPE 7'], ['Glute Kickback (cabo)', 3, '12–15', 'RPE 7'], ['Abdução no Cabo', 3, '12–15', 'RPE 7–8'], ['Panturrilha em Pé Unilateral', 3, '15–20', 'RPE 7'], ['Rosca Inclinada com Halter', 3, '8–10', 'RPE 7–8'], ['Rosca no Cabo', 2, '12–15', 'RPE 7'], ['Crunch no Cabo (em pé)', 3, '12–15', '45s']] }
];
<<<<<<< HEAD
=======
let state=JSON.parse(localStorage.getItem('liftlog-v2-state')||'null')||{active:null,history:[],profileName:localStorage.getItem('liftlog-profile-name')||'Annah'};
const list=document.querySelector('#exerciseList'),template=document.querySelector('#exerciseTemplate'),restEl=document.querySelector('#restTimer');let restSeconds=0,restActive=false;
function save(){localStorage.setItem('liftlog-v2-state',JSON.stringify(state));localStorage.setItem('liftlog-profile-name',state.profileName)}
function active(){return state.active}
function showTraining(activeState){const timerRunning=activeState&&active().timerStarted;document.querySelector('#emptyWorkout').classList.toggle('hidden',activeState);document.querySelector('#sessionStrip').classList.toggle('hidden',!activeState);list.classList.toggle('hidden',!activeState);document.querySelector('#addExercise').classList.toggle('hidden',!activeState);document.querySelector('#startWorkout').classList.toggle('hidden',activeState);document.querySelector('#startTimer').classList.toggle('hidden',!activeState||timerRunning);document.querySelector('#endWorkout').classList.toggle('hidden',!timerRunning);document.querySelector('#toggleRest').disabled=!timerRunning;document.querySelector('#workoutTitle').textContent=activeState?active().name:'Pronto para treinar?';document.querySelector('#workoutDate').textContent=timerRunning?'TREINO EM ANDAMENTO':activeState?'ROTINA PRONTA — INICIE QUANDO QUISER':'SEU DIÁRIO DE TREINO'}
function render(){showTraining(!!active());list.innerHTML='';if(!active())return;active().exercises.forEach((exercise,i)=>{const card=template.content.cloneNode(true);card.querySelector('h2').textContent=exercise.name;card.querySelector('p').textContent=exercise.group;card.querySelector('.prev-load').textContent=exercise.previous||'sem histórico';card.querySelector('.exercise-rpe').value=exercise.rpe||'';card.querySelector('.exercise-notes').value=exercise.notes||'';card.querySelector('.exercise-rpe').addEventListener('change',e=>{exercise.rpe=e.target.value;save()});card.querySelector('.exercise-notes').addEventListener('change',e=>{exercise.notes=e.target.value;save()});const rows=card.querySelector('.set-rows');exercise.sets.forEach((set,j)=>rows.appendChild(makeRow(i,j,set)));card.querySelector('.new-set').addEventListener('click',()=>{const last=exercise.sets.at(-1);exercise.sets.push([last?.[0]||0,last?.[1]||10,false]);save();render();toast('Nova série adicionada')});card.querySelector('.remove-exercise').addEventListener('click',()=>{active().exercises.splice(i,1);save();render();toast('Exercício removido')});list.appendChild(card)});if(!active().exercises.length)list.innerHTML='<div class="empty-workout" style="margin:20px auto"><h2>Adicione o primeiro exercício</h2><p>Use a lista de movimentos ou digite um exercício personalizado.</p></div>';updateStats()}
function makeRow(i,j,set){const row=document.createElement('div');row.className=`set-row ${set[2]?'done':''}`;row.innerHTML=`<span class="set-num">${String(j+1).padStart(2,'0')}</span><input aria-label="peso em quilos" type="number" min="0" value="${set[0]}"><input aria-label="repetições" type="number" min="0" value="${set[1]}"><button class="check-set" aria-label="registrar série">${set[2]?'✓':'○'}</button>`;const inputs=row.querySelectorAll('input');inputs[0].addEventListener('change',e=>{active().exercises[i].sets[j][0]=+e.target.value;save();updateStats()});inputs[1].addEventListener('change',e=>{active().exercises[i].sets[j][1]=+e.target.value;save();updateStats()});row.querySelector('button').addEventListener('click',()=>{set[2]=!set[2];save();render();toast(set[2]?'Série registrada.':'Série desmarcada.')});return row}
function updateStats(){if(!active())return;const done=active().exercises.flatMap(x=>x.sets).filter(x=>x[2]),volume=done.reduce((t,x)=>t+x[0]*x[1],0);document.querySelector('#setCount').textContent=done.length;document.querySelector('#totalVolume').innerHTML=`${volume.toLocaleString('pt-BR')} <em>kg</em>`}
function renderProfile(){document.querySelector('#profileName').textContent=state.profileName;document.querySelector('#avatar').textContent=state.profileName.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase()}
function renderHistory(){const host=document.querySelector('#historyList');const saved=state.history.map((item,index)=>`<article><div class="date-box"><b>${item.date.slice(0,2)}</b><span>${item.date.slice(3,5)}</span></div><div><h2>${item.name}</h2><p>${item.exercises} exercícios · ${item.sets} séries concluídas · ${item.duration}</p></div><strong>${item.volume.toLocaleString('pt-BR')} <small>kg</small></strong><button class="delete-history" data-history="${index}">Apagar</button></article>`).join('');host.innerHTML=`<p class="date-label">TREINOS SALVOS</p>${saved||'<p style="color:#777;font-size:13px">Nenhum treino salvo ainda.</p>'}`;host.querySelectorAll('.delete-history').forEach(button=>button.addEventListener('click',()=>{state.history.splice(+button.dataset.history,1);save();renderHistory();toast('Registro apagado.')}))}
function renderRoutines(){document.querySelector('#routineGrid').innerHTML=routines.map((routine,index)=>{const selected=active()?.name===routine.name;return `<article class="routine-card ${routine.color} ${selected?'routine-selected':''}"><span>Treino ${String.fromCharCode(65+index)}</span><h2>${routine.name}</h2><p>${routine.subtitle}</p><footer><b>${routine.exercises.length} exercícios</b>${selected?'<button class="start-routine remove-routine" data-remove-routine="'+index+'" aria-label="Remover treino selecionado">Remover ×</button>':'<button class="start-routine" data-routine="'+index+'">Selecionar →</button>'}</footer></article>`}).join('');document.querySelectorAll('.start-routine[data-routine]').forEach(button=>button.addEventListener('click',()=>startRoutine(routines[+button.dataset.routine])));document.querySelectorAll('.remove-routine').forEach(button=>button.addEventListener('click',removeSelectedRoutine))}
function startRoutine(routine){if(active())return toast('Encerre o treino atual antes de selecionar outra rotina.');state.active={name:routine.name,startedAt:null,elapsed:0,timerStarted:false,exercises:routine.exercises.map(([name,sets,reps,detail])=>({name,group:reps.includes('min')?`Cardio · ${reps}`:`${sets} séries × ${reps}${detail?` · ${detail}`:''}`,previous:'sem histórico',rpe:detail.startsWith('RPE')?detail:'',notes:'',sets:Array.from({length:sets},()=>[0,0,false])}))};save();render();goTo('treino');toast(`${routine.name} pronta. Inicie o cronômetro quando quiser.`)}
function removeSelectedRoutine(){if(!active())return;const name=active().name;state.active=null;restActive=false;restSeconds=0;document.querySelector('#toggleRest').textContent='Iniciar pausa';save();render();renderRoutines();toast(`${name} removida da seleção.`)}
function goTo(page){document.querySelectorAll('.nav-item').forEach(x=>x.classList.toggle('active',x.dataset.page===page));document.querySelectorAll('.page').forEach(x=>x.classList.toggle('active-page',x.id===page));if(page==='historico')renderHistory()}
function clock(){if(active()?.timerStarted)active().elapsed++;if(restActive)restSeconds++;const elapsed=active()?.elapsed||0;document.querySelector('#workoutClock').textContent=`${String(Math.floor(elapsed/3600)).padStart(2,'0')}:${String(Math.floor(elapsed%3600/60)).padStart(2,'0')}:${String(elapsed%60).padStart(2,'0')}`;restEl.textContent=`${String(Math.floor(restSeconds/60)).padStart(2,'0')}:${String(restSeconds%60).padStart(2,'0')}`}setInterval(clock,1000);
const startModal=document.querySelector('#startModal');function openStart(){document.querySelector('#workoutName').value='';startModal.showModal()}document.querySelector('#startWorkout').addEventListener('click',openStart);document.querySelector('#emptyStartWorkout').addEventListener('click',openStart);document.querySelector('#startForm').addEventListener('submit',e=>{e.preventDefault();state.active=blankWorkout();state.active.name=document.querySelector('#workoutName').value.trim();state.active.timerStarted=false;save();startModal.close();render();toast('Treino pronto. Adicione exercícios e inicie o cronômetro quando quiser.')});
document.querySelector('#startTimer').addEventListener('click',()=>{active().timerStarted=true;active().startedAt=new Date().toISOString();save();render();toast('Cronômetro iniciado.')});
document.querySelector('#toggleRest').addEventListener('click',()=>{restActive=!restActive;document.querySelector('#toggleRest').textContent=restActive?'Encerrar pausa':'Iniciar pausa';if(restActive){restSeconds=0;toast('Pausa iniciada')}else toast('Pausa encerrada')});
document.querySelector('#endWorkout').addEventListener('click',()=>{const done=active().exercises.flatMap(x=>x.sets).filter(x=>x[2]),volume=done.reduce((t,x)=>t+x[0]*x[1],0),elapsed=active().elapsed;state.history.unshift({date:new Date().toLocaleDateString('pt-BR'),name:active().name,exercises:active().exercises.length,sets:done.length,volume,duration:`${Math.floor(elapsed/60)} min`,exerciseLog:active().exercises});state.active=null;restActive=false;restSeconds=0;document.querySelector('#toggleRest').textContent='Iniciar pausa';save();render();renderHistory();goTo('historico');toast('Treino encerrado e salvo no histórico.')});
const exerciseModal=document.querySelector('#exerciseModal');document.querySelector('#addExercise').addEventListener('click',()=>exerciseModal.showModal());document.querySelector('#exerciseBank').addEventListener('change',e=>{if(e.target.value)document.querySelector('#exerciseName').value=e.target.value});document.querySelector('#exerciseForm').addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#exerciseName').value.trim(),group=document.querySelector('#exerciseGroup').value.trim()||'Exercício personalizado',weight=+document.querySelector('#exerciseWeight').value,reps=+document.querySelector('#exerciseReps').value;active().exercises.push({name,group,previous:'sem histórico',rpe:'',notes:'',sets:[[weight,reps,false]]});save();render();exerciseModal.close();e.target.reset();toast('Exercício adicionado')});
const profileModal=document.querySelector('#profileModal');document.querySelector('#editProfile').addEventListener('click',()=>{document.querySelector('#profileInput').value=state.profileName;profileModal.showModal()});document.querySelector('#profileForm').addEventListener('submit',e=>{e.preventDefault();state.profileName=document.querySelector('#profileInput').value.trim();save();renderProfile();profileModal.close();toast('Nome atualizado')});document.querySelectorAll('.nav-item').forEach(button=>button.addEventListener('click',()=>goTo(button.dataset.page)));function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');setTimeout(()=>el.classList.remove('visible'),2600)}render();renderProfile();renderHistory();renderRoutines();
>>>>>>> cc374bed53eda62b137d67569a0bc0e2a9180ed4

let state = JSON.parse(localStorage.getItem('liftlog-v2-state') || 'null') || { active: null, history: [], profileName: localStorage.getItem('liftlog-profile-name') || 'Luiza Martins' };
const list = document.querySelector('#exerciseList'),
  template = document.querySelector('#exerciseTemplate'),
  restEl = document.querySelector('#restTimer');
let restSeconds = 0,
  restActive = false;

function save() {
  localStorage.setItem('liftlog-v2-state', JSON.stringify(state));
  localStorage.setItem('liftlog-profile-name', state.profileName);
}

function active() { return state.active }

// ========== FUNÇÃO CENTRALIZADA PARA LIMPAR ESTADO ==========
function clearWorkoutState() {
  state.active = null;
  restActive = false;
  restSeconds = 0;
  document.querySelector('#toggleRest').textContent = 'Iniciar pausa';
  document.querySelector('#workoutClock').textContent = '00:00:00';
  restEl.textContent = '00:00';
  save();
}

function showTraining(activeState) {
  const timerRunning = activeState && active().timerStarted;
  document.querySelector('#emptyWorkout').classList.toggle('hidden', activeState);
  document.querySelector('#sessionStrip').classList.toggle('hidden', !activeState);
  list.classList.toggle('hidden', !activeState);
  document.querySelector('#addExercise').classList.toggle('hidden', !activeState);
  document.querySelector('#startWorkout').classList.toggle('hidden', activeState);
  document.querySelector('#startTimer').classList.toggle('hidden', !activeState || timerRunning);
  document.querySelector('#endWorkout').classList.toggle('hidden', !timerRunning);
  document.querySelector('#toggleRest').disabled = !timerRunning;
  document.querySelector('#workoutTitle').textContent = activeState ? active().name : 'Pronto para treinar?';
  document.querySelector('#workoutDate').textContent = timerRunning ? 'TREINO EM ANDAMENTO' : activeState ? 'ROTINA PRONTA — INICIE QUANDO QUISER' : 'SEU DIÁRIO DE TREINO';
}

function render() {
  showTraining(!!active());
  list.innerHTML = '';
  if (!active()) return;
  active().exercises.forEach((exercise, i) => {
    const card = template.content.cloneNode(true);
    card.querySelector('h2').textContent = exercise.name;
    card.querySelector('p').textContent = exercise.group;
    card.querySelector('.prev-load').textContent = exercise.previous || 'sem histórico';
    card.querySelector('.exercise-rpe').value = exercise.rpe || '';
    card.querySelector('.exercise-notes').value = exercise.notes || '';
    card.querySelector('.exercise-rpe').addEventListener('change', e => { exercise.rpe = e.target.value;
      save() });
    card.querySelector('.exercise-notes').addEventListener('change', e => { exercise.notes = e.target.value;
      save() });
    const rows = card.querySelector('.set-rows');
    exercise.sets.forEach((set, j) => rows.appendChild(makeRow(i, j, set)));
    card.querySelector('.new-set').addEventListener('click', () => {
      const last = exercise.sets.at(-1);
      exercise.sets.push([last?.[0] || 0, last?.[1] || 10, false]);
      save();
      render();
      toast('Nova série adicionada');
    });
    card.querySelector('.remove-exercise').addEventListener('click', () => {
      active().exercises.splice(i, 1);
      save();
      render();
      toast('Exercício removido');
    });
    list.appendChild(card);
  });
  if (!active().exercises.length) list.innerHTML = '<div class="empty-workout" style="margin:20px auto"><h2>Adicione o primeiro exercício</h2><p>Use a lista de movimentos ou digite um exercício personalizado.</p></div>';
  updateStats();
}

function makeRow(i, j, set) {
  const row = document.createElement('div');
  row.className = `set-row ${set[2] ? 'done' : ''}`;
  row.innerHTML = `<span class="set-num">${String(j + 1).padStart(2, '0')}</span><input aria-label="peso em quilos" type="number" min="0" value="${set[0]}"><input aria-label="repetições" type="number" min="0" value="${set[1]}"><button class="check-set" aria-label="registrar série">${set[2] ? '✓' : '○'}</button>`;
  const inputs = row.querySelectorAll('input');
  inputs[0].addEventListener('change', e => { active().exercises[i].sets[j][0] = +e.target.value;
    save();
    updateStats() });
  inputs[1].addEventListener('change', e => { active().exercises[i].sets[j][1] = +e.target.value;
    save();
    updateStats() });
  row.querySelector('button').addEventListener('click', () => {
    set[2] = !set[2];
    save();
    render();
    toast(set[2] ? 'Série registrada.' : 'Série desmarcada.');
  });
  return row;
}

function updateStats() {
  if (!active()) return;
  const done = active().exercises.flatMap(x => x.sets).filter(x => x[2]),
    volume = done.reduce((t, x) => t + x[0] * x[1], 0);
  document.querySelector('#setCount').textContent = done.length;
  document.querySelector('#totalVolume').innerHTML = `${volume.toLocaleString('pt-BR')} <em>kg</em>`;
}

function renderProfile() {
  document.querySelector('#profileName').textContent = state.profileName;
  document.querySelector('#avatar').textContent = state.profileName.split(/\s+/).map(x => x[0]).slice(0, 2).join('').toUpperCase();
}

function renderHistory() {
  const host = document.querySelector('#historyList');
  const saved = state.history.map((item, index) => `<article><div class="date-box"><b>${item.date.slice(0, 2)}</b><span>${item.date.slice(3, 5)}</span></div><div><h2>${item.name}</h2><p>${item.exercises} exercícios · ${item.sets} séries concluídas · ${item.duration}</p></div><strong>${item.volume.toLocaleString('pt-BR')} <small>kg</small></strong><button class="delete-history" data-history="${index}">Apagar</button></article>`).join('');
  host.innerHTML = `<p class="date-label">TREINOS SALVOS</p>${saved || '<p style="color:#777;font-size:13px">Nenhum treino salvo ainda.</p>'}`;
  host.querySelectorAll('.delete-history').forEach(button => button.addEventListener('click', () => {
    state.history.splice(+button.dataset.history, 1);
    save();
    renderHistory();
    toast('Registro apagado.');
  }));
}

// ========== RENDER ROUTINES COM BOTÕES DESABILITADOS ==========
function renderRoutines() {
  document.querySelector('#routineGrid').innerHTML = routines.map((routine, index) => {
    const isActive = active() !== null && active()?.name === routine.name;
    const hasActiveRoutine = active() !== null;

    return `<article class="routine-card ${routine.color} ${isActive ? 'routine-selected' : ''}">
      <span>Treino ${String.fromCharCode(65 + index)}</span>
      <h2>${routine.name}</h2>
      <p>${routine.subtitle}</p>
      <footer>
        <b>${routine.exercises.length} exercícios</b>
        ${isActive ? 
          '<button class="start-routine remove-routine" data-remove-routine="' + index + '" aria-label="Remover treino selecionado">Remover ×</button>' : 
          (hasActiveRoutine ? 
            '<button class="start-routine" disabled style="opacity:0.5;cursor:not-allowed;">Treino em andamento</button>' :
            '<button class="start-routine" data-routine="' + index + '">Selecionar →</button>'
          )
        }
      </footer>
    </article>`;
  }).join('');

  document.querySelectorAll('.start-routine[data-routine]').forEach(button =>
    button.addEventListener('click', () => startRoutine(routines[+button.dataset.routine]))
  );

  document.querySelectorAll('.remove-routine').forEach(button =>
    button.addEventListener('click', removeSelectedRoutine)
  );
}

function startRoutine(routine) {
  if (active()) return toast('Encerre o treino atual antes de selecionar outra rotina.');
  state.active = {
    name: routine.name,
    startedAt: null,
    elapsed: 0,
    timerStarted: false,
    exercises: routine.exercises.map(([name, sets, reps, detail]) => ({
      name,
      group: reps.includes('min') ? `Cardio · ${reps}` : `${sets} séries × ${reps}${detail ? ` · ${detail}` : ''}`,
      previous: 'sem histórico',
      rpe: detail.startsWith('RPE') ? detail : '',
      notes: '',
      sets: Array.from({ length: sets }, () => [0, 0, false])
    }))
  };
  save();
  render();
  goTo('treino');
  toast(`${routine.name} pronta. Inicie o cronômetro quando quiser.`);
}

// ========== REMOVER COM CONFIRMAÇÃO ==========
function removeSelectedRoutine() {
  if (!active()) return;

  // Abre o modal de confirmação
  showConfirmDialog(
    `Tem certeza que deseja remover o treino "${active().name}"?`,
    () => {
      const name = active().name;
      clearWorkoutState();
      render();
      renderRoutines();
      toast(`${name} removida da seleção.`);
    }
  );
}

// ========== MODAL DE CONFIRMAÇÃO ==========
const confirmModal = document.querySelector('#confirmDialog');
let pendingRemove = null;

function showConfirmDialog(message, callback) {
  document.querySelector('#confirmMessage').textContent = message;
  pendingRemove = callback;
  confirmModal.showModal();
}

document.querySelector('#confirmCancel')?.addEventListener('click', () => {
  confirmModal.close();
  pendingRemove = null;
});

document.querySelector('#confirmOk')?.addEventListener('click', () => {
  if (pendingRemove) pendingRemove();
  confirmModal.close();
  pendingRemove = null;
});

// ========== NAVEGAÇÃO ==========
function goTo(page) {
  document.querySelectorAll('.nav-item').forEach(x => x.classList.toggle('active', x.dataset.page === page));
  document.querySelectorAll('.page').forEach(x => x.classList.toggle('active-page', x.id === page));
  if (page === 'historico') renderHistory();
}

// ========== RELÓGIO ==========
function clock() {
  if (active()?.timerStarted) active().elapsed++;
  if (restActive) restSeconds++;
  const elapsed = active()?.elapsed || 0;
  document.querySelector('#workoutClock').textContent =
    `${String(Math.floor(elapsed / 3600)).padStart(2, '0')}:${String(Math.floor(elapsed % 3600 / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
  restEl.textContent =
    `${String(Math.floor(restSeconds / 60)).padStart(2, '0')}:${String(restSeconds % 60).padStart(2, '0')}`;
}
setInterval(clock, 1000);

// ========== EVENTOS DOS BOTÕES ==========
const startModal = document.querySelector('#startModal');

function openStart() {
  document.querySelector('#workoutName').value = '';
  startModal.showModal();
}
document.querySelector('#startWorkout').addEventListener('click', openStart);
document.querySelector('#emptyStartWorkout').addEventListener('click', openStart);

document.querySelector('#startForm').addEventListener('submit', e => {
  e.preventDefault();
  state.active = blankWorkout();
  state.active.name = document.querySelector('#workoutName').value.trim();
  state.active.timerStarted = false;
  save();
  startModal.close();
  render();
  toast('Treino pronto. Adicione exercícios e inicie o cronômetro quando quiser.');
});

document.querySelector('#startTimer').addEventListener('click', () => {
  active().timerStarted = true;
  active().startedAt = new Date().toISOString();
  save();
  render();
  toast('Cronômetro iniciado.');
});

document.querySelector('#toggleRest').addEventListener('click', () => {
  restActive = !restActive;
  document.querySelector('#toggleRest').textContent = restActive ? 'Encerrar pausa' : 'Iniciar pausa';
  if (restActive) {
    restSeconds = 0;
    toast('Pausa iniciada');
  } else toast('Pausa encerrada');
});

// ========== ENCERRAR TREINO (usando clearWorkoutState) ==========
document.querySelector('#endWorkout').addEventListener('click', () => {
  const done = active().exercises.flatMap(x => x.sets).filter(x => x[2]),
    volume = done.reduce((t, x) => t + x[0] * x[1], 0),
    elapsed = active().elapsed;
  state.history.unshift({
    date: new Date().toLocaleDateString('pt-BR'),
    name: active().name,
    exercises: active().exercises.length,
    sets: done.length,
    volume,
    duration: `${Math.floor(elapsed / 60)} min`,
    exerciseLog: active().exercises
  });
  clearWorkoutState();
  render();
  renderHistory();
  goTo('historico');
  toast('Treino encerrado e salvo no histórico.');
});

// ========== EXERCÍCIOS ==========
const exerciseModal = document.querySelector('#exerciseModal');
document.querySelector('#addExercise').addEventListener('click', () => exerciseModal.showModal());
document.querySelector('#exerciseBank').addEventListener('change', e => {
  if (e.target.value) document.querySelector('#exerciseName').value = e.target.value;
});
document.querySelector('#exerciseForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#exerciseName').value.trim(),
    group = document.querySelector('#exerciseGroup').value.trim() || 'Exercício personalizado',
    weight = +document.querySelector('#exerciseWeight').value,
    reps = +document.querySelector('#exerciseReps').value;
  active().exercises.push({ name, group, previous: 'sem histórico', rpe: '', notes: '', sets: [
      [weight, reps, false]
    ] });
  save();
  render();
  exerciseModal.close();
  e.target.reset();
  toast('Exercício adicionado');
});

// ========== PERFIL ==========
const profileModal = document.querySelector('#profileModal');
document.querySelector('#editProfile').addEventListener('click', () => {
  document.querySelector('#profileInput').value = state.profileName;
  profileModal.showModal();
});
document.querySelector('#profileForm').addEventListener('submit', e => {
  e.preventDefault();
  state.profileName = document.querySelector('#profileInput').value.trim();
  save();
  renderProfile();
  profileModal.close();
  toast('Nome atualizado');
});

// ========== NAVEGAÇÃO ==========
document.querySelectorAll('.nav-item').forEach(button =>
  button.addEventListener('click', () => goTo(button.dataset.page))
);

// ========== TOAST ==========
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message;
  el.classList.add('visible');
  setTimeout(() => el.classList.remove('visible'), 2600);
}

// ========== INICIALIZAÇÃO ==========
render();
renderProfile();
renderHistory();
renderRoutines();

/* =========================================================
   Mobile vertical menu
   ========================================================= */
(() => {
  const menu = document.querySelector('.sidebar');
  const trigger = document.querySelector('#mobileMenuButton');
  const overlay = document.querySelector('#mobileMenuOverlay');
  if (!menu || !trigger || !overlay) return;

  const closeMenu = () => {
    menu.classList.remove('menu-open');
    overlay.classList.remove('is-visible');
    trigger.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mobile-menu-active');
  };

  const openMenu = () => {
    menu.classList.add('menu-open');
    overlay.classList.add('is-visible');
    trigger.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mobile-menu-active');
  };

  trigger.addEventListener('click', () => {
    menu.classList.contains('menu-open') ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.sidebar .nav-item').forEach(item => {
    item.addEventListener('click', closeMenu);
  });

  document.querySelector('.sidebar .brand')?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
})();