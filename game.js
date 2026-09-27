(() => {
  'use strict';

  const STORAGE_KEY = 'iwakan_tap_progress_v35_69stages';
  const EXPLANATION_STORAGE_KEY = 'iwakan_explanations_v35_69stages';
  const STAGE_SELECT_UNLOCK_KEY = 'iwakan_stage_select_unlocked_v35_69stages';
  const PREVIOUS_STAGE_SELECT_UNLOCK_KEY = 'iwakan_stage_select_unlocked_v34_69stages';
  const EDIT_STEP = 0.005;
  const MIN_SIZE = 0.01;
  const CORRECT_ICON_SRC = 'assets/correct.png';
  const WRONG_ICON_SRC = 'assets/wrong.png';
  const BGM_SRCS = ['assets/bgm_track1.mp3', 'assets/bgm_track2.mp3'];

  // Preload result icons so the feedback appears immediately on the first tap.
  const correctIconPreload = new Image();
  correctIconPreload.src = CORRECT_ICON_SRC;
  const wrongIconPreload = new Image();
  wrongIconPreload.src = WRONG_ICON_SRC;

  const defaultStages = [
    { src: "assets/scene1.jpg", target: { x: 0.130, y: 0.679, w: 0.634, h: 0.249 }, explanation: "「お腹減ったな……」\n彼女にはグローブが食べ物に見えているようだ" },
    { src: "assets/scene2.jpg", target: { x: 0.685, y: 0.411, w: 0.309, h: 0.381 }, explanation: "お巡りさん来てください！\n変な制服を着たお巡りさんが……！！" },
    { src: "assets/scene3.jpg", target: { x: 0.109, y: 0.311, w: 0.287, h: 0.406 }, explanation: "壁に移る影がおかしい\n影ではない何かだろうか……" },
    { src: "assets/scene4.jpg", target: { x: 0.329, y: 0.567, w: 0.334, h: 0.318 }, explanation: "汗かき過ぎなのでは……？" },
    { src: "assets/scene5.jpg", target: { x: 0.302, y: 0.742, w: 0.476, h: 0.179 }, explanation: "これは……\n何の足跡だろうか……？" },
    { src: "assets/scene6.jpg", target: { x: 0.495, y: 0.758, w: 0.393, h: 0.213 }, explanation: "このスーパーは品揃えがいいと評判だ" },
    { src: "assets/scene7.jpg", target: { x: 0.375, y: 0.081, w: 0.284, h: 0.276 }, explanation: "奇麗な星空には、人知を超えた何かが顕現しているかもしれない……" },
    { src: "assets/scene8.jpg", target: { x: 0.758, y: 0.241, w: 0.172, h: 0.449 }, explanation: "昼下がりの情事……？" },
    { src: "assets/scene9.jpg", target: { x: 0.671, y: 0.055, w: 0.327, h: 0.212 }, explanation: "歯科医院にこんな道具が置いてあるのだろうか……？" },
    { src: "assets/scene10.jpg", target: { x: 0.439, y: 0.801, w: 0.340, h: 0.148 }, explanation: "それは……\nホットドッグではないようだ" },
    { src: "assets/scene11.jpg", target: { x: 0.524, y: 0.162, w: 0.323, h: 0.148 }, explanation: "クラーケン襲来！！" },
    { src: "assets/scene12.jpg", target: { x: 0.164, y: 0.576, w: 0.286, h: 0.162 }, explanation: "後の女性は何者だろうか……？" },
    { src: "assets/scene13.jpg", target: { x: 0.613, y: 0.140, w: 0.347, h: 0.133 }, explanation: "その人はこれから何を食べるつもりなのだろうか……？" },
    { src: "assets/scene14.jpg", target: { x: 0.488, y: 0.130, w: 0.344, h: 0.134 }, explanation: "トレーナーの首に……" },
    { src: "assets/scene15.jpg", target: { x: 0.306, y: 0.172, w: 0.577, h: 0.079 }, explanation: "その湖には古代生物の生き残りが潜んでいるという噂がある" },
    { src: "assets/scene16.jpg", target: { x: 0.836, y: 0.191, w: 0.160, h: 0.273 }, explanation: "鏡の中の私\n鏡写しになっていないけれど……" },
    { src: "assets/scene17.jpg", target: { x: 0.669, y: 0.252, w: 0.280, h: 0.152 }, explanation: "おばあちゃん、箸はいらないの……？" },
    { src: "assets/scene18.jpg", target: { x: 0.570, y: 0.161, w: 0.257, h: 0.156 }, explanation: "ネギの勇者" },
    { src: "assets/scene19.jpg", target: { x: 0.634, y: 0.679, w: 0.366, h: 0.106 }, explanation: "その鶏肉、洗ったの……？" },
    { src: "assets/scene20.jpg", target: { x: 0.024, y: 0.767, w: 0.285, h: 0.135 }, explanation: "その尻尾は一体……？" },
    { src: "assets/scene21.jpg", target: { x: 0.662, y: 0.135, w: 0.195, h: 0.193 }, explanation: "背中、背中……！！" },
    { src: "assets/scene22.jpg", target: { x: 0.153, y: 0.614, w: 0.277, h: 0.135 }, explanation: "リンゴの中にボウリング球が混じっている……" },
    { src: "assets/scene23.jpg", target: { x: 0.672, y: 0.218, w: 0.219, h: 0.137 }, explanation: "クラゲに混じってレジ袋が浮いている……" },
    { src: "assets/scene24.jpg", target: { x: 0.776, y: 0.257, w: 0.224, h: 0.129 }, explanation: "ゴリラにも職業選択の自由……？" },
    { src: "assets/scene25.jpg", target: { x: 0.814, y: 0.196, w: 0.186, h: 0.154 }, explanation: "この食肉加工場には色々な動物の肉が入荷する\n時々この世のものではない獣の肉も入荷するようだ" },
    { src: "assets/scene26.jpg", target: { x: 0.052, y: 0.506, w: 0.262, h: 0.104 }, explanation: "ドーナツショップのショーケースだが……\nそれはドーナツではないようだ" },
    { src: "assets/scene27.jpg", target: { x: 0.663, y: 0.315, w: 0.179, h: 0.152 }, explanation: "覗かれている……" },
    { src: "assets/scene28.jpg", target: { x: 0.380, y: 0.566, w: 0.223, h: 0.122 }, explanation: "浦島太郎……？" },
    { src: "assets/scene29.jpg", target: { x: 0.062, y: 0.694, w: 0.190, h: 0.137 }, explanation: "お主、本当に人間か……？" },
    { src: "assets/scene30.jpg", target: { x: 0.450, y: 0.150, w: 0.200, h: 0.130 }, explanation: "何者かが螺旋階段の上から見下ろしている……" },
    { src: "assets/scene31.jpg", target: { x: 0.443, y: 0.692, w: 0.226, h: 0.114 }, explanation: "現像中の写真に現像中の写真が……" },
    { src: "assets/scene32.jpg", target: { x: 0.079, y: 0.158, w: 0.156, h: 0.158 }, explanation: "それはパンじゃないよ！\n借り物競争じゃないから！！" },
    { src: "assets/scene33.jpg", target: { x: 0.670, y: 0.617, w: 0.215, h: 0.106 }, explanation: "蠅の王がいる" },
    { src: "assets/scene34.jpg", target: { x: 0.099, y: 0.128, w: 0.078, h: 0.283 }, explanation: "不審な人影が見える……" },
    { src: "assets/scene35.jpg", target: { x: 0.772, y: 0.821, w: 0.170, h: 0.128 }, explanation: "カーテンの下から誰かの足が……" },
    { src: "assets/scene36.jpg", target: { x: 0.728, y: 0.104, w: 0.153, h: 0.138 }, explanation: "一緒に食べる……？" },
    { src: "assets/scene37.jpg", target: { x: 0.004, y: 0.082, w: 0.124, h: 0.164 }, explanation: "窓から誰かが覗いている……" },
    { src: "assets/scene38.jpg", target: { x: 0.268, y: 0.611, w: 0.243, h: 0.081 }, explanation: "クローゼットの中に誰かが潜んでいる……" },
    { src: "assets/scene39.jpg", target: { x: 0.000, y: 0.733, w: 0.149, h: 0.125 }, explanation: "置き配は便利だが、荷物が届いた直後には取りに行かない方が良さそうだ" },
    { src: "assets/scene40.jpg", target: { x: 0.259, y: 0.375, w: 0.193, h: 0.094 }, explanation: "隣の人の絵に落書きをしてはいけません！" },
    { src: "assets/scene41.jpg", target: { x: 0.784, y: 0.649, w: 0.142, h: 0.127 }, explanation: "公園には何が埋まっているか分からない" },
    { src: "assets/scene42.jpg", target: { x: 0.809, y: 0.218, w: 0.117, h: 0.151 }, explanation: "おかしな形の鶏が紛れ込んでいる……" },
    { src: "assets/scene43.jpg", target: { x: 0.754, y: 0.690, w: 0.128, h: 0.129 }, explanation: "そのボトルの中身は一体……？" },
    { src: "assets/scene44.jpg", target: { x: 0.825, y: 0.658, w: 0.172, h: 0.096 }, explanation: "その男性はこの世の者ではなさそうだ……" },
    { src: "assets/scene45.jpg", target: { x: 0.306, y: 0.416, w: 0.203, h: 0.078 }, explanation: "4人でファミレスに来たのだが……\n店員には3人しか見えていないようだ" },
    { src: "assets/scene46.jpg", target: { x: 0.792, y: 0.382, w: 0.177, h: 0.089 }, explanation: "冷蔵庫の陰から、誰かの手が伸びている……" },
    { src: "assets/scene47.jpg", target: { x: 0.304, y: 0.208, w: 0.116, h: 0.113 }, explanation: "それは誰の足なのか……" },
    { src: "assets/scene48.jpg", target: { x: 0.811, y: 0.235, w: 0.097, h: 0.134 }, explanation: "サンドバッグに人の顔が浮かび上がっている……" },
    { src: "assets/scene49.jpg", target: { x: 0.797, y: 0.010, w: 0.166, h: 0.076 }, explanation: "この公園には芸術的な街灯がある" },
    { src: "assets/scene50.jpg", target: { x: 0.630, y: 0.396, w: 0.117, h: 0.103 }, explanation: "そのウサギだけやけに生々しいが……" },
    { src: "assets/scene51.jpg", target: { x: 0.460, y: 0.619, w: 0.204, h: 0.056 }, explanation: "変わった形のハサミだ" },
    { src: "assets/scene52.jpg", target: { x: 0.663, y: 0.438, w: 0.188, h: 0.057 }, explanation: "車の下に何かがしがみついている" },
    { src: "assets/scene53.jpg", target: { x: 0.734, y: 0.777, w: 0.154, h: 0.065 }, explanation: "電源プラグが抜けているが、画面に写っている映像は一体……" },
    { src: "assets/scene54.jpg", target: { x: 0.096, y: 0.446, w: 0.108, h: 0.089 }, explanation: "そのメイド、何を入れている……？" },
    { src: "assets/scene55.jpg", target: { x: 0.813, y: 0.258, w: 0.103, h: 0.086 }, explanation: "誰かが見ている……" },
    { src: "assets/scene56.jpg", target: { x: 0.761, y: 0.417, w: 0.139, h: 0.062 }, explanation: "布団の陰から何者かの手が……\n生者なのか、死者なのか……" },
    { src: "assets/scene57.jpg", target: { x: 0.762, y: 0.182, w: 0.089, h: 0.092 }, explanation: "書棚の陰に……" },
    { src: "assets/scene58.jpg", target: { x: 0.442, y: 0.081, w: 0.126, h: 0.064 }, explanation: "花火の中に目のようなものが……" },
    { src: "assets/scene59.jpg", target: { x: 0.520, y: 0.352, w: 0.134, h: 0.059 }, explanation: "それは新種のリンゴ……\nではないようだ" },
    { src: "assets/scene60.jpg", target: { x: 0.710, y: 0.409, w: 0.138, h: 0.050 }, explanation: "的の後に誰かが立っているようだが……" },
    { src: "assets/scene61.jpg", target: { x: 0.450, y: 0.546, w: 0.119, h: 0.056 }, explanation: "おい！\nちゃんと彫ってるんだろうな！？" },
    { src: "assets/scene62.jpg", target: { x: 0.686, y: 0.520, w: 0.144, h: 0.043 }, explanation: "最近この辺りで下着泥棒が出没しているらしい" },
    { src: "assets/scene63.jpg", target: { x: 0.705, y: 0.288, w: 0.081, h: 0.076 }, explanation: "トイレには誰かが潜んでいる" },
    { src: "assets/scene64.jpg", target: { x: 0.328, y: 0.194, w: 0.108, h: 0.056 }, explanation: "サメが咥えている物は……？" },
    { src: "assets/scene65.jpg", target: { x: 0.295, y: 0.470, w: 0.123, h: 0.048 }, explanation: "その魚だけ本物ではないようだ" },
    { src: "assets/scene66.jpg", target: { x: 0.791, y: 0.132, w: 0.095, h: 0.055 }, explanation: "その手は……？" },
    { src: "assets/scene67_v37.jpg", target: { x: 0.118, y: 0.318, w: 0.083, h: 0.047 }, explanation: "お洒落な鳩だ" },
    { src: "assets/scene68.jpg", target: { x: 0.000, y: 0.630, w: 0.086, h: 0.042 }, explanation: "車を搬入した際に轢かれた者がいるようだ……" },
    { src: "assets/scene69.jpg", target: { x: 0.738, y: 0.237, w: 0.063, h: 0.035 }, explanation: "こんにちは！！" },
  ];

  const deepClone = (value) => JSON.parse(JSON.stringify(value));
  const stages = deepClone(defaultStages);

  const $ = (id) => document.getElementById(id);
  const startPanel = $('startPanel');
  const stageSelectPanel = $('stageSelectPanel');
  const gamePanel = $('gamePanel');
  const editorPanel = $('editorPanel');
  const resultPanel = $('resultPanel');
  const secretEditorTrigger = $('secretEditorTrigger');

  const startButton = $('startButton');
  const stageSelectButton = $('stageSelectButton');
  const hitboxEditButton = $('hitboxEditButton');
  const stageEditButton = $('stageEditButton');
  const stageBackButton = $('stageBackButton');
  const resultStageSelectButton = $('resultStageSelectButton');
  const resultEditButton = $('resultEditButton');
  const retryButton = $('retryButton');
  const quitButton = $('quitButton');
  const soundToggleButton = $('soundToggleButton');
  const stageGrid = $('stageGrid');

  const imageShell = $('imageShell');
  const sceneImage = $('sceneImage');
  const markerLayer = $('markerLayer');
  const loading = $('loading');
  const stageText = $('stageText');
  const livesText = $('livesText');
  const hintText = $('hintText');

  const toast = $('toast');
  const resultSymbol = $('resultSymbol');
  const resultTitle = $('resultTitle');
  const resultMessage = $('resultMessage');
  const clearCount = $('clearCount');
  const missCount = $('missCount');

  const answerOverlay = $('answerOverlay');
  const answerStageLabel = $('answerStageLabel');
  const answerPreview = $('answerPreview');
  const answerText = $('answerText');
  const answerNextButton = $('answerNextButton');

  const editorPrevButton = $('editorPrevButton');
  const editorNextButton = $('editorNextButton');
  const editorStageLabel = $('editorStageLabel');
  const editorShell = $('editorShell');
  const editorImage = $('editorImage');
  const editorOverlay = $('editorOverlay');
  const editRect = $('editRect');
  const editorLoading = $('editorLoading');
  const editorValues = $('editorValues');
  const editorResetButton = $('editorResetButton');
  const editorCopyCurrentButton = $('editorCopyCurrentButton');
  const editorCopyAllButton = $('editorCopyAllButton');
  const editorPlayButton = $('editorPlayButton');
  const editorBackButton = $('editorBackButton');
  const editorExplanation = $('editorExplanation');
  const editorExplanationSaveButton = $('editorExplanationSaveButton');
  const editorExplanationResetButton = $('editorExplanationResetButton');

  let stageIndex = 0;
  let stageMisses = 0;
  let totalMisses = 0;
  let solved = false;
  let playMode = 'campaign';
  let toastTimer = null;
  let audioContext = null;
  let masterGain = null;
  let bgmGain = null;
  let bgmTimer = null;
  let bgmPlaying = false;
  let bgmStep = 0;
  let soundEnabled = true;
  let bgmAudio = null;
  let bgmTrackIndex = 0;
  let bgmFadeTimer = null;
  let answerOpen = false;
  let stageSelectUnlocked = false;

  let editStageIndex = 0;
  let editorDrawing = false;
  let drawStart = null;

  let secretTapCount = 0;
  let secretTapTimer = null;

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round3(value) {
    return Math.round(value * 1000) / 1000;
  }

  function normalizeTarget(target) {
    const t = {
      x: clamp(target.x, 0, 1),
      y: clamp(target.y, 0, 1),
      w: clamp(target.w, MIN_SIZE, 1),
      h: clamp(target.h, MIN_SIZE, 1)
    };
    if (t.x + t.w > 1) t.x = 1 - t.w;
    if (t.y + t.h > 1) t.y = 1 - t.h;
    t.x = clamp(t.x, 0, 1 - MIN_SIZE);
    t.y = clamp(t.y, 0, 1 - MIN_SIZE);
    t.w = clamp(t.w, MIN_SIZE, 1 - t.x);
    t.h = clamp(t.h, MIN_SIZE, 1 - t.y);
    return {
      x: round3(t.x),
      y: round3(t.y),
      w: round3(t.w),
      h: round3(t.h)
    };
  }

  function loadCustomTargets() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return;
      saved.forEach((target, index) => {
        if (!stages[index] || !target) return;
        stages[index].target = normalizeTarget(target);
      });
    } catch (error) {
      console.warn('custom target load failed', error);
    }
  }

  function saveCustomTargets() {
    const payload = stages.map((stage) => normalizeTarget(stage.target));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }


  function loadCustomExplanations() {
    try {
      const raw = localStorage.getItem(EXPLANATION_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (!Array.isArray(saved)) return;
      saved.forEach((text, index) => {
        if (!stages[index] || typeof text !== 'string') return;
        stages[index].explanation = text;
      });
    } catch (error) {
      console.warn('custom explanation load failed', error);
    }
  }

  function saveCustomExplanations() {
    const payload = stages.map((stage) => stage.explanation || '');
    localStorage.setItem(EXPLANATION_STORAGE_KEY, JSON.stringify(payload));
  }

  function loadStageSelectUnlock() {
    try {
      stageSelectUnlocked = localStorage.getItem(STAGE_SELECT_UNLOCK_KEY) === '1' ||
        localStorage.getItem(PREVIOUS_STAGE_SELECT_UNLOCK_KEY) === '1';
      if (stageSelectUnlocked) localStorage.setItem(STAGE_SELECT_UNLOCK_KEY, '1');
    } catch (error) {
      stageSelectUnlocked = false;
    }
    updateStageSelectAvailability();
  }

  function unlockStageSelect() {
    if (stageSelectUnlocked) return false;
    stageSelectUnlocked = true;
    try {
      localStorage.setItem(STAGE_SELECT_UNLOCK_KEY, '1');
    } catch (error) {
      console.warn('stage select unlock save failed', error);
    }
    updateStageSelectAvailability();
    return true;
  }

  function updateStageSelectAvailability() {
    if (stageSelectButton) stageSelectButton.classList.toggle('hidden', !stageSelectUnlocked);
    if (resultStageSelectButton) resultStageSelectButton.classList.toggle('hidden', !stageSelectUnlocked);
  }

  function setView(view) {
    startPanel.classList.toggle('hidden', view !== 'start');
    stageSelectPanel.classList.toggle('hidden', view !== 'select');
    gamePanel.classList.toggle('hidden', view !== 'game');
    editorPanel.classList.toggle('hidden', view !== 'editor');
    resultPanel.classList.toggle('hidden', view !== 'result');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function ensureAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.9;
      masterGain.connect(audioContext.destination);

      bgmGain = audioContext.createGain();
      bgmGain.gain.value = 0.11;
      bgmGain.connect(masterGain);
    }
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }

  function playTone(frequency, start, duration, type = 'sine', volume = 0.15, destination = null, detune = 0) {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    osc.detune.setValueAtTime(detune, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(destination || masterGain || ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.04);
  }

  function playNoise(start, duration, volume = 0.12, destination = null) {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, start);
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(destination || masterGain || ctx.destination);
    source.start(start);
    source.stop(start + duration);
  }

  function getBgmAudio() {
    if (!bgmAudio) {
      bgmAudio = new Audio(BGM_SRCS[bgmTrackIndex]);
      bgmAudio.loop = false;
      bgmAudio.preload = 'auto';
      bgmAudio.volume = 0.34;
      bgmAudio.setAttribute('playsinline', '');
      bgmAudio.addEventListener('ended', () => {
        if (!bgmPlaying) return;
        bgmTrackIndex = (bgmTrackIndex + 1) % BGM_SRCS.length;
        bgmAudio.src = BGM_SRCS[bgmTrackIndex];
        bgmAudio.currentTime = 0;
        bgmAudio.volume = 0.28;
        const nextPromise = bgmAudio.play();
        if (nextPromise && typeof nextPromise.catch === 'function') {
          nextPromise.catch((error) => {
            console.warn('BGM playback was blocked while advancing to the next track.', error);
            bgmPlaying = false;
          });
        }
      });
    }
    return bgmAudio;
  }

  function startBgm() {
    if (!soundEnabled) return;
    const audio = getBgmAudio();
    if (bgmFadeTimer) {
      clearInterval(bgmFadeTimer);
      bgmFadeTimer = null;
    }
    audio.volume = 0.28;
    bgmPlaying = true;

    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((error) => {
        console.warn('BGM playback was blocked; retrying on next game tap.', error);
        bgmPlaying = false;
      });
    }
  }

  function stopBgm(fade = true) {
    bgmPlaying = false;
    if (!bgmAudio) return;
    if (bgmFadeTimer) {
      clearInterval(bgmFadeTimer);
      bgmFadeTimer = null;
    }

    const resetTrack = () => {
      bgmTrackIndex = 0;
      if (bgmAudio.src !== BGM_SRCS[0]) {
        bgmAudio.src = BGM_SRCS[0];
      }
      bgmAudio.currentTime = 0;
      bgmAudio.volume = 0.34;
    };

    if (!fade) {
      bgmAudio.pause();
      resetTrack();
      return;
    }

    const startVolume = bgmAudio.volume;
    const started = performance.now();
    bgmFadeTimer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - started) / 320);
      bgmAudio.volume = Math.max(0, startVolume * (1 - progress));
      if (progress >= 1) {
        clearInterval(bgmFadeTimer);
        bgmFadeTimer = null;
        bgmAudio.pause();
        resetTrack();
      }
    }, 32);
  }

  function updateSoundToggle() {

    if (!soundToggleButton) return;
    soundToggleButton.textContent = soundEnabled ? '🔊' : '🔇';
    soundToggleButton.setAttribute('aria-pressed', soundEnabled ? 'true' : 'false');
    soundToggleButton.setAttribute('aria-label', soundEnabled ? 'BGMと効果音をオフにする' : 'BGMと効果音をオンにする');
  }

  function toggleSound() {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      ensureAudio();
      if (!gamePanel.classList.contains('hidden') && !solved) startBgm();
    } else {
      stopBgm(false);
    }
    updateSoundToggle();
  }

  function playCorrectSound() {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const now = ctx.currentTime + 0.01;

    playNoise(now, 0.12, 0.12);
    playTone(523.25, now, 0.18, 'square', 0.10);
    playTone(659.25, now + 0.07, 0.24, 'square', 0.10);
    playTone(783.99, now + 0.14, 0.30, 'triangle', 0.13);
    playTone(1046.50, now + 0.22, 0.42, 'sine', 0.18);
    playTone(1318.51, now + 0.28, 0.46, 'sine', 0.10, null, 7);
    playTone(1567.98, now + 0.34, 0.50, 'sine', 0.07, null, -7);
  }

  function playWrongSound() {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const now = ctx.currentTime + 0.01;

    playNoise(now, 0.18, 0.08);
    playTone(150, now, 0.42, 'sawtooth', 0.15);
    playTone(103, now + 0.03, 0.46, 'square', 0.09);
    playTone(82, now + 0.18, 0.38, 'sawtooth', 0.10);
    playTone(61.74, now + 0.31, 0.44, 'triangle', 0.10);
  }

  function playGameOverSound() {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const now = ctx.currentTime + 0.01;
    [220, 174.61, 146.83, 110].forEach((freq, i) => {
      playTone(freq, now + i * 0.18, 0.34, i % 2 ? 'sawtooth' : 'square', 0.10);
    });
    playNoise(now + 0.42, 0.38, 0.07);
  }

  function playClearSound() {
    const ctx = ensureAudio();
    if (!ctx || !soundEnabled) return;
    const now = ctx.currentTime + 0.01;
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, i) => {
      playTone(freq, now + i * 0.11, 0.42, 'triangle', 0.11);
    });
    playTone(1567.98, now + 0.56, 0.75, 'sine', 0.12);
  }

  function updateHud() {
    if (stageText) {
      stageText.textContent = `${String(stageIndex + 1).padStart(2, '0')} / ${String(stages.length).padStart(2, '0')}`;
    }
  }

  function showToast(message, type = 'note') {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 1100);
  }

  function addMarker(xPercent, yPercent, correct) {
    const marker = document.createElement('img');
    marker.className = `tap-marker ${correct ? 'correct' : 'wrong'}`;
    marker.src = correct ? CORRECT_ICON_SRC : WRONG_ICON_SRC;
    marker.alt = '';
    marker.draggable = false;
    marker.style.left = `${xPercent * 100}%`;
    marker.style.top = `${yPercent * 100}%`;
    markerLayer.appendChild(marker);
  }

  function hideAnswerOverlay() {
    answerOpen = false;
    if (!answerOverlay) return;
    answerOverlay.classList.add('hidden');
    if (answerPreview && answerPreview.getContext) {
      const ctx = answerPreview.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, answerPreview.width, answerPreview.height);
    }
  }

  function loadStage() {
    solved = false;
    stageMisses = 0;
    hideAnswerOverlay();
    markerLayer.innerHTML = '';
    loading.textContent = 'LOADING...';
    loading.classList.remove('hidden');
    updateHud();

    const stage = stages[stageIndex];
    sceneImage.onload = () => loading.classList.add('hidden');
    sceneImage.onerror = () => { loading.textContent = '画像を読み込めませんでした'; };
    sceneImage.src = stage.src;
  }

  function buildStageSelect() {
    stageGrid.innerHTML = '';
    stages.forEach((stage, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'stage-card';
      button.innerHTML = `<img class="stage-thumb" src="${stage.src}" alt="ステージ${index + 1}"><strong>STAGE ${index + 1}</strong>`;
      button.addEventListener('click', () => startSingleStage(index));
      stageGrid.appendChild(button);
    });
  }

  function finishGame(clear) {
    hideAnswerOverlay();
    stopBgm(true);
    if (clear) playClearSound();
    else playGameOverSound();

    const newlyUnlockedStageSelect = clear && playMode === 'campaign' ? unlockStageSelect() : false;
    setView('result');
    updateStageSelectAvailability();
    const cleared = playMode === 'single' ? (clear ? 1 : 0) : (clear ? stages.length : stageIndex);
    const total = playMode === 'single' ? 1 : stages.length;
    clearCount.textContent = `${cleared} / ${total}`;
    missCount.textContent = `${totalMisses}`;

    if (clear) {
      resultSymbol.innerHTML = `<img src="${CORRECT_ICON_SRC}" alt="正解">`;
      resultTitle.textContent = playMode === 'single' ? 'STAGE CLEAR!' : 'GAME CLEAR!';
      if (playMode === 'single') {
        resultMessage.textContent = `ステージ ${stageIndex + 1} の違和感を見つけました。`;
      } else {
        resultMessage.textContent = totalMisses === 0
          ? 'ノーミスクリア！ すべての違和感を見抜きました。'
          : 'すべての違和感を見つけました。';
        if (newlyUnlockedStageSelect) {
          resultMessage.textContent += ' ステージ選択が解放されました。';
        }
      }
    } else {
      resultSymbol.innerHTML = `<img src="${WRONG_ICON_SRC}" alt="不正解">`;
      resultTitle.textContent = 'GAME OVER';
      resultMessage.textContent = `ステージ ${stageIndex + 1} で3回間違えました。`;
    }
  }

  function startCampaign() {
    ensureAudio();
    startBgm();
    playMode = 'campaign';
    stageIndex = 0;
    stageMisses = 0;
    totalMisses = 0;
    solved = false;
    toast.classList.add('hidden');
    hideAnswerOverlay();
    setView('game');
    loadStage();
  }

  function startSingleStage(index) {
    if (!stageSelectUnlocked && editorPanel.classList.contains('hidden')) return;
    ensureAudio();
    startBgm();
    playMode = 'single';
    stageIndex = index;
    stageMisses = 0;
    totalMisses = 0;
    solved = false;
    toast.classList.add('hidden');
    hideAnswerOverlay();
    setView('game');
    loadStage();
  }

  function drawAnswerPreview(stage) {
    const img = sceneImage;
    const naturalWidth = img.naturalWidth || 0;
    const naturalHeight = img.naturalHeight || 0;
    if (!answerPreview || !answerPreview.getContext || !naturalWidth || !naturalHeight) return;

    const t = normalizeTarget(stage.target);
    const centerX = (t.x + (t.w / 2)) * naturalWidth;
    const centerY = (t.y + (t.h / 2)) * naturalHeight;
    const targetPixelW = t.w * naturalWidth;
    const targetPixelH = t.h * naturalHeight;

    // Always crop a true 1:1 square around the correct area.
    let side = Math.max(targetPixelW * 3.0, targetPixelH * 3.0, Math.min(naturalWidth, naturalHeight) * 0.32);
    side = Math.min(side, naturalWidth, naturalHeight);

    const sx = clamp(Math.round(centerX - side / 2), 0, Math.max(0, naturalWidth - side));
    const sy = clamp(Math.round(centerY - side / 2), 0, Math.max(0, naturalHeight - side));
    const sourceSide = Math.max(1, Math.round(side));

    const outSize = 1200;
    answerPreview.width = outSize;
    answerPreview.height = outSize;
    const ctx = answerPreview.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, outSize, outSize);
    ctx.drawImage(img, sx, sy, sourceSide, sourceSide, 0, 0, outSize, outSize);
  }

  function showAnswerDetail() {
    const stage = stages[stageIndex];
    answerOpen = true;
    answerStageLabel.textContent = `STAGE ${stageIndex + 1}`;
    answerText.textContent = stage.explanation || 'ここが違和感です。';
    answerNextButton.textContent = playMode === 'single'
      ? '結果画面へ'
      : (stageIndex >= stages.length - 1 ? '結果画面へ' : '次のステージへ');

    // Show the dialog first so a preview-rendering issue can never block progression.
    answerOverlay.classList.remove('hidden');
    try {
      drawAnswerPreview(stage);
    } catch (error) {
      console.warn('answer preview drawing failed', error);
    }
    setTimeout(() => answerNextButton.focus({ preventScroll: true }), 40);
  }

  function proceedAfterCorrect() {
    if (!answerOpen) return;
    hideAnswerOverlay();

    if (playMode === 'single') {
      finishGame(true);
      return;
    }

    stageIndex += 1;
    if (stageIndex >= stages.length) {
      finishGame(true);
    } else {
      loadStage();
    }
  }

  function handleTap(event) {
    if (solved || answerOpen || !loading.classList.contains('hidden')) return;
    ensureAudio();
    if (!bgmPlaying && soundEnabled) startBgm();

    const rect = sceneImage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    if (px < 0 || px > 1 || py < 0 || py > 1) return;

    const t = stages[stageIndex].target;
    const correct = px >= t.x && px <= t.x + t.w && py >= t.y && py <= t.y + t.h;
    addMarker(px, py, correct);

    if (correct) {
      solved = true;
      playCorrectSound();
      setTimeout(showAnswerDetail, 360);
      return;
    }

    stageMisses += 1;
    totalMisses += 1;
    playWrongSound();

    if (stageMisses >= 3) {
      solved = true;
      setTimeout(() => finishGame(false), 760);
    }
  }

  function formatTarget(target) {
    const t = normalizeTarget(target);
    return `x: ${t.x.toFixed(3)} / y: ${t.y.toFixed(3)} / w: ${t.w.toFixed(3)} / h: ${t.h.toFixed(3)}`;
  }

  function updateEditorRect() {
    const t = normalizeTarget(stages[editStageIndex].target);
    stages[editStageIndex].target = t;
    editRect.style.left = `${t.x * 100}%`;
    editRect.style.top = `${t.y * 100}%`;
    editRect.style.width = `${t.w * 100}%`;
    editRect.style.height = `${t.h * 100}%`;
    editorValues.textContent = formatTarget(t);
    editorStageLabel.textContent = `STAGE ${editStageIndex + 1} / ${stages.length}`;
  }

  function loadEditorStage() {
    editorLoading.textContent = 'LOADING...';
    editorLoading.classList.remove('hidden');
    editorImage.onload = () => {
      editorLoading.classList.add('hidden');
      updateEditorRect();
    };
    editorImage.onerror = () => {
      editorLoading.textContent = '画像を読み込めませんでした';
    };
    editorImage.src = stages[editStageIndex].src;
    updateEditorRect();
    if (editorExplanation) editorExplanation.value = stages[editStageIndex].explanation || '';
  }

  function openEditor(index = 0) {
    editStageIndex = clamp(index, 0, stages.length - 1);
    setView('editor');
    loadEditorStage();
  }

  function pointToNormalized(event, element) {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return null;
    return { x, y };
  }

  function beginDraw(event) {
    if (!editorLoading.classList.contains('hidden')) return;
    const point = pointToNormalized(event, editorOverlay);
    if (!point) return;
    editorDrawing = true;
    drawStart = point;
    const target = { x: point.x, y: point.y, w: MIN_SIZE, h: MIN_SIZE };
    stages[editStageIndex].target = normalizeTarget(target);
    updateEditorRect();
    if (editorOverlay.setPointerCapture && event.pointerId != null) {
      editorOverlay.setPointerCapture(event.pointerId);
    }
  }

  function moveDraw(event) {
    if (!editorDrawing || !drawStart) return;
    const point = pointToNormalized(event, editorOverlay);
    if (!point) return;
    const x1 = Math.min(drawStart.x, point.x);
    const y1 = Math.min(drawStart.y, point.y);
    const x2 = Math.max(drawStart.x, point.x);
    const y2 = Math.max(drawStart.y, point.y);
    stages[editStageIndex].target = normalizeTarget({
      x: x1,
      y: y1,
      w: Math.max(MIN_SIZE, x2 - x1),
      h: Math.max(MIN_SIZE, y2 - y1)
    });
    updateEditorRect();
  }

  function endDraw() {
    if (!editorDrawing) return;
    editorDrawing = false;
    drawStart = null;
    saveCustomTargets();
    showToast('当たり判定を保存しました', 'note');
  }

  function tweakTarget(action) {
    const t = { ...stages[editStageIndex].target };
    switch (action) {
      case 'up': t.y -= EDIT_STEP; break;
      case 'down': t.y += EDIT_STEP; break;
      case 'left': t.x -= EDIT_STEP; break;
      case 'right': t.x += EDIT_STEP; break;
      case 'wider':
        t.x -= EDIT_STEP / 2;
        t.w += EDIT_STEP;
        break;
      case 'narrower':
        t.x += EDIT_STEP / 2;
        t.w -= EDIT_STEP;
        break;
      case 'taller':
        t.y -= EDIT_STEP / 2;
        t.h += EDIT_STEP;
        break;
      case 'shorter':
        t.y += EDIT_STEP / 2;
        t.h -= EDIT_STEP;
        break;
      default:
        return;
    }
    stages[editStageIndex].target = normalizeTarget(t);
    updateEditorRect();
    saveCustomTargets();
  }

  async function copyText(text, successMessage) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const temp = document.createElement('textarea');
        temp.value = text;
        temp.setAttribute('readonly', 'readonly');
        temp.style.position = 'absolute';
        temp.style.left = '-9999px';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
      }
      showToast(successMessage, 'note');
    } catch (error) {
      console.error(error);
      showToast('コピーに失敗しました', 'ng');
    }
  }

  function currentStageCode(index) {
    const stage = stages[index];
    const t = normalizeTarget(stage.target);
    const explanationCode = stage.explanation ? `, explanation: ${JSON.stringify(stage.explanation)}` : '';
    const answerTitleCode = stage.answerTitle ? `, answerTitle: ${JSON.stringify(stage.answerTitle)}` : '';
    return `{ src: '${stage.src}', target: { x: ${t.x.toFixed(3)}, y: ${t.y.toFixed(3)}, w: ${t.w.toFixed(3)}, h: ${t.h.toFixed(3)} }${explanationCode}${answerTitleCode} }`;
  }

  function allStagesCode() {
    return 'const stages = [\n  ' + stages.map((_, index) => currentStageCode(index)).join(',\n  ') + '\n];';
  }

  function resetCurrentTarget() {
    stages[editStageIndex].target = deepClone(defaultStages[editStageIndex].target);
    stages[editStageIndex].target = normalizeTarget(stages[editStageIndex].target);
    saveCustomTargets();
    updateEditorRect();
    showToast('この画像の当たり判定を初期値に戻しました', 'note');
  }

  function saveCurrentExplanation() {
    if (!editorExplanation) return;
    stages[editStageIndex].explanation = editorExplanation.value.trim();
    saveCustomExplanations();
    showToast(`ステージ ${editStageIndex + 1} の説明文を保存しました`, 'note');
  }

  function resetCurrentExplanation() {
    stages[editStageIndex].explanation = defaultStages[editStageIndex].explanation || '';
    if (editorExplanation) editorExplanation.value = stages[editStageIndex].explanation;
    saveCustomExplanations();
    showToast('説明文を初期値に戻しました', 'note');
  }

  function openHiddenEditor(index = 0) {
    stopBgm(true);
    openEditor(clamp(index, 0, stages.length - 1));
    showToast('編集モード', 'note');
  }

  let editorHoldTimer = null;
  let editorHoldOpened = false;

  function beginEditorHold(event) {
    if (!secretEditorTrigger) return;
    editorHoldOpened = false;
    clearTimeout(editorHoldTimer);
    editorHoldTimer = setTimeout(() => {
      editorHoldOpened = true;
      openHiddenEditor(0);
    }, 1600);
  }

  function endEditorHold() {
    clearTimeout(editorHoldTimer);
    editorHoldTimer = null;
  }

  if (secretEditorTrigger) {
    secretEditorTrigger.addEventListener('pointerdown', beginEditorHold);
    secretEditorTrigger.addEventListener('pointerup', endEditorHold);
    secretEditorTrigger.addEventListener('pointercancel', endEditorHold);
    secretEditorTrigger.addEventListener('pointerleave', endEditorHold);
    secretEditorTrigger.addEventListener('click', (event) => {
      event.stopPropagation();
      if (editorHoldOpened) {
        editorHoldOpened = false;
        return;
      }
      startCampaign();
    });
  }

  startPanel.addEventListener('click', startCampaign);
  if (stageSelectButton) {
    stageSelectButton.addEventListener('click', (event) => {
      event.stopPropagation();
      if (!stageSelectUnlocked) return;
      stopBgm(true);
      setView('select');
    });
  }
  retryButton.addEventListener('click', startCampaign);
  if (resultEditButton) resultEditButton.addEventListener('click', () => openEditor(stageIndex));
  if (resultStageSelectButton) resultStageSelectButton.addEventListener('click', () => {
    if (!stageSelectUnlocked) return;
    stopBgm(true);
    setView('select');
  });
  if (stageBackButton) stageBackButton.addEventListener('click', () => { stopBgm(true); setView('start'); });
  if (quitButton) quitButton.addEventListener('click', () => { stopBgm(true); hideAnswerOverlay(); setView('start'); });
  if (soundToggleButton) soundToggleButton.addEventListener('click', toggleSound);
  if (answerNextButton) answerNextButton.addEventListener('click', proceedAfterCorrect);
  imageShell.addEventListener('pointerup', handleTap);

  editorPrevButton.addEventListener('click', () => {
    editStageIndex = (editStageIndex - 1 + stages.length) % stages.length;
    loadEditorStage();
  });
  editorNextButton.addEventListener('click', () => {
    editStageIndex = (editStageIndex + 1) % stages.length;
    loadEditorStage();
  });
  editorBackButton.addEventListener('click', () => { stopBgm(true); setView('start'); });
  editorPlayButton.addEventListener('click', () => startSingleStage(editStageIndex));
  editorResetButton.addEventListener('click', resetCurrentTarget);
  if (editorExplanationSaveButton) editorExplanationSaveButton.addEventListener('click', saveCurrentExplanation);
  if (editorExplanationResetButton) editorExplanationResetButton.addEventListener('click', resetCurrentExplanation);
  editorCopyCurrentButton.addEventListener('click', () => copyText(currentStageCode(editStageIndex), `ステージ ${editStageIndex + 1} の座標をコピーしました`));
  editorCopyAllButton.addEventListener('click', () => copyText(allStagesCode(), '全画像の座標をコピーしました'));
  editorOverlay.addEventListener('pointerdown', beginDraw);
  editorOverlay.addEventListener('pointermove', moveDraw);
  editorOverlay.addEventListener('pointerup', endDraw);
  editorOverlay.addEventListener('pointercancel', endDraw);
  document.querySelector('.editor-controls-grid').addEventListener('click', (event) => {
    const button = event.target.closest('[data-edit]');
    if (!button) return;
    tweakTarget(button.dataset.edit);
  });

  window.addEventListener('keydown', (event) => {
    const hiddenEditShortcut =
      (event.ctrlKey || event.metaKey) &&
      event.shiftKey &&
      event.key.toLowerCase() === 'e';

    if (hiddenEditShortcut) {
      event.preventDefault();
      const currentIndex = gamePanel.classList.contains('hidden') ? 0 : stageIndex;
      openHiddenEditor(currentIndex);
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && answerOpen) {
      event.preventDefault();
      proceedAfterCorrect();
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !startPanel.classList.contains('hidden')) {
      event.preventDefault();
      startCampaign();
      return;
    }

    if (!editorPanel.classList.contains('hidden')) {
      if (event.key === 'ArrowUp') { event.preventDefault(); tweakTarget('up'); }
      if (event.key === 'ArrowDown') { event.preventDefault(); tweakTarget('down'); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); tweakTarget('left'); }
      if (event.key === 'ArrowRight') { event.preventDefault(); tweakTarget('right'); }
    }
  });

  updateSoundToggle();
  loadCustomTargets();
  loadCustomExplanations();
  loadStageSelectUnlock();
  buildStageSelect();
})();
