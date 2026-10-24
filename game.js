(() => {
  'use strict';

  const STORAGE_KEY = 'iwakan_targets_v67_by_src';
  const LEGACY_TARGET_STORAGE_KEYS = []; // v58 uses the supplied reviewed defaults.
  const EXPLANATION_STORAGE_KEY = 'iwakan_explanations_v67_by_src';
  const LEGACY_EXPLANATION_STORAGE_KEYS = [];
  const STAGE_SELECT_UNLOCK_KEY = 'iwakan_stage_select_unlocked_v46_75stages_sorted';
  const CLEARED_PROGRESS_KEY = 'iwakan_progress_v47_by_src';
  const PREVIOUS_STAGE_SELECT_UNLOCK_KEYS = ['iwakan_stage_select_unlocked_v44_74stages', 'iwakan_stage_select_unlocked_v43_72stages', 'iwakan_stage_select_unlocked_v41_72stages', 'iwakan_stage_select_unlocked_v40_72stages'];
  const EDIT_STEP = 0.005;
  const MIN_SIZE = 0.01;
  const CORRECT_ICON_SRC = 'assets/correct.png?v=20261024-v67';
  const WRONG_ICON_SRC = 'assets/wrong.png?v=20261024-v67';
  const BGM_SRCS = ['assets/bgm_track1.mp3', 'assets/bgm_track2.mp3', 'assets/bgm_track3.mp3', 'assets/bgm_track4.mp3', 'assets/bgm_track5.mp3'];

  // Preload result icons so the feedback appears immediately on the first tap.
  const correctIconPreload = new Image();
  correctIconPreload.src = CORRECT_ICON_SRC;
  const wrongIconPreload = new Image();
  wrongIconPreload.src = WRONG_ICON_SRC;

  const defaultStages =[
  {
    "src": "assets/scene134.jpg",
    "explanation": "レーンに不気味な顔が浮かび上がっている……",
    "targets": [
      {
        "x": 0.446,
        "y": 0.609,
        "w": 0.149,
        "h": 0.131,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene135.jpg",
    "explanation": "歯医者さんに何故フォークがあるのか……？",
    "targets": [
      {
        "x": 0.109,
        "y": 0.907,
        "w": 0.091,
        "h": 0.093,
        "angle": 55,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene136.jpg",
    "explanation": "ボールか違うのでイエローカード……！？",
    "targets": [
      {
        "x": 0.801,
        "y": 0.82,
        "w": 0.199,
        "h": 0.135,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene137.jpg",
    "explanation": "呑気に弁当を食べている場合ではない\n地球が狙われている！！",
    "targets": [
      {
        "x": 0.855,
        "y": 0.247,
        "w": 0.055,
        "h": 0.025,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene138.jpg",
    "explanation": "熊は木登りが得意らしいが……\n流石にここまでは来られまい",
    "targets": [
      {
        "x": 0.034,
        "y": 0.57,
        "w": 0.395,
        "h": 0.3,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene139.jpg",
    "explanation": "そのボールで演技は出来ないだろう……",
    "targets": [
      {
        "x": 0.575,
        "y": 0.005,
        "w": 0.18,
        "h": 0.1,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene140.jpg",
    "explanation": "そのチョコレート、何が入っているの……？",
    "targets": [
      {
        "x": 0.555,
        "y": 0.859,
        "w": 0.19,
        "h": 0.05,
        "angle": -30,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene141.jpg",
    "explanation": "サーフボードの影……ではないようだ",
    "targets": [
      {
        "x": 0.536,
        "y": 0.118,
        "w": 0.33,
        "h": 0.46,
        "shape": "ellipse",
        "angle": -17
      }
    ]
  },
  {
    "src": "assets/scene124.jpg",
    "explanation": "洗濯物に血が付いている……",
    "targets": [
      {
        "x": 0.346,
        "y": 0.925,
        "w": 0.13,
        "h": 0.075,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene125.jpg",
    "explanation": "状況がよく分からないが……\nとりあえず不気味である",
    "targets": [
      {
        "x": 0.33,
        "y": 0.06,
        "w": 0.3,
        "h": 0.17,
        "shape": "ellipse",
        "angle": 0
      },
      {
        "x": 0.169,
        "y": 0.717,
        "w": 0.173,
        "h": 0.093,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene126.jpg",
    "explanation": "鍵の数が合わない……\nどれかが偽物なのだろうか",
    "targets": [
      {
        "x": 0.136,
        "y": 0.253,
        "w": 0.074,
        "h": 0.072,
        "shape": "ellipse",
        "angle": 0
      },
      {
        "x": 0.439,
        "y": 0.37,
        "w": 0.111,
        "h": 0.096,
        "shape": "ellipse",
        "angle": -15
      }
    ]
  },
  {
    "src": "assets/scene127.jpg",
    "explanation": "どうやって釣ったの……！？",
    "targets": [
      {
        "x": 0.481,
        "y": 0.269,
        "w": 0.331,
        "h": 0.672,
        "shape": "ellipse",
        "angle": 15
      }
    ]
  },
  {
    "src": "assets/scene128.jpg",
    "explanation": "現代の海に中世風の帆船が浮かんでいる……",
    "targets": [
      {
        "x": 0.119,
        "y": 0.089,
        "w": 0.114,
        "h": 0.055,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene129.jpg",
    "explanation": "一人だけ悟り開いちゃってる……？",
    "targets": [
      {
        "x": 0.386,
        "y": 0.262,
        "w": 0.226,
        "h": 0.285,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene130.jpg",
    "explanation": "ちゃんとお会計してから食べようね……",
    "targets": [
      {
        "x": 0.338,
        "y": 0.308,
        "w": 0.184,
        "h": 0.089,
        "shape": "ellipse",
        "angle": 0
      },
      {
        "x": 0.414,
        "y": 0.52,
        "w": 0.214,
        "h": 0.134,
        "angle": 20,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene131.jpg",
    "explanation": "何かに取り憑かれている……",
    "targets": [
      {
        "x": 0.32,
        "y": 0.083,
        "w": 0.26,
        "h": 0.335,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene132.jpg",
    "explanation": "このパターン多いな……",
    "targets": [
      {
        "x": 0.394,
        "y": 0.117,
        "w": 0.219,
        "h": 0.065,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene133.jpg",
    "explanation": "よく見ると木にドラゴンのような生き物が止まっている……",
    "targets": [
      {
        "x": 0.832,
        "y": 0.707,
        "w": 0.168,
        "h": 0.075,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene1.jpg",
    "explanation": "お巡りさんこっちです！\n変な制服を着たお巡りさんが……！！",
    "targets": [
      {
        "x": 0.685,
        "y": 0.411,
        "w": 0.309,
        "h": 0.381,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene2.jpg",
    "explanation": "壁に移る影がおかしい\n影ではない何かだろうか……",
    "targets": [
      {
        "x": 0.1,
        "y": 0.301,
        "w": 0.342,
        "h": 0.406,
        "shape": "ellipse",
        "angle": -5
      }
    ]
  },
  {
    "src": "assets/scene3.jpg",
    "explanation": "彼女、汗をかき過ぎなのでは……？",
    "targets": [
      {
        "x": 0.286,
        "y": 0.567,
        "w": 0.404,
        "h": 0.318,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene120.jpg",
    "explanation": "盗撮(？)されてるよ！！",
    "targets": [
      {
        "x": 0.7,
        "y": 0.031,
        "w": 0.3,
        "h": 0.31,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene4.jpg",
    "explanation": "この公園には、古代の巨大生物が生息しているようだ……",
    "targets": [
      {
        "x": 0.279,
        "y": 0.755,
        "w": 0.496,
        "h": 0.184,
        "angle": 15,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene5.jpg",
    "explanation": "この二人はこんな場所で何をしていたのだろうか……",
    "targets": [
      {
        "x": 0.763,
        "y": 0.241,
        "w": 0.197,
        "h": 0.449,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene104.png",
    "explanation": "真ん中のポールだけ棘だらけ！\nこれでは使い物にならない……",
    "targets": [
      {
        "x": 0.45,
        "y": 0.081,
        "w": 0.097,
        "h": 0.89,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene93.png",
    "explanation": "階段に妙な物質が付着している……",
    "targets": [
      {
        "x": 0.285,
        "y": 0.688,
        "w": 0.715,
        "h": 0.106,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene6.jpg",
    "explanation": "普通の歯科医院にこんな道具が置いてあるのだろうか……？",
    "targets": [
      {
        "x": 0.671,
        "y": 0.055,
        "w": 0.327,
        "h": 0.212,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene95.png",
    "explanation": "息ピッタリ！！",
    "targets": [
      {
        "x": 0.716,
        "y": 0.287,
        "w": 0.282,
        "h": 0.294,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene7.jpg",
    "explanation": "「お腹減ったな……」\n彼女にはグローブが食べ物に見えているようだ",
    "targets": [
      {
        "x": 0.131,
        "y": 0.684,
        "w": 0.22,
        "h": 0.108,
        "shape": "ellipse",
        "angle": 0
      },
      {
        "x": 0.43,
        "y": 0.74,
        "w": 0.271,
        "h": 0.204,
        "shape": "ellipse",
        "angle": 55
      }
    ]
  },
  {
    "src": "assets/scene9.jpg",
    "explanation": "このスーパーは品揃えがいいと評判だ",
    "targets": [
      {
        "x": 0.542,
        "y": 0.732,
        "w": 0.307,
        "h": 0.254,
        "shape": "ellipse",
        "angle": 45
      }
    ]
  },
  {
    "src": "assets/scene116.jpg",
    "explanation": "未成年の飲酒は犯罪だよ！\nそれはそうと畳の上では靴を脱ごうな",
    "targets": [
      {
        "x": 0.705,
        "y": 0.679,
        "w": 0.295,
        "h": 0.205,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene8.jpg",
    "explanation": "奇麗な星空をよく観察すると、人知を超えた何かが現れているかもしれない……",
    "targets": [
      {
        "x": 0.385,
        "y": 0.071,
        "w": 0.259,
        "h": 0.276,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene117.jpg",
    "explanation": "カーテンの陰に誰かが隠れているようだが……\nズボラな彼女は気付いていないようだ",
    "targets": [
      {
        "x": 0.1,
        "y": 0.145,
        "w": 0.15,
        "h": 0.37,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene103.png",
    "explanation": "やけにガタイの良いメイドがいるな……",
    "targets": [
      {
        "x": 0.61,
        "y": 0.172,
        "w": 0.207,
        "h": 0.341,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene118.jpg",
    "explanation": "とんでもない瞬間を捉えてしまった……",
    "targets": [
      {
        "x": 0.335,
        "y": 0.136,
        "w": 0.111,
        "h": 0.103,
        "shape": "ellipse",
        "angle": -35
      }
    ]
  },
  {
    "src": "assets/scene11.jpg",
    "explanation": "その人はそんな巨大なナイフで何を食べるつもりだろうか……？",
    "targets": [
      {
        "x": 0.625,
        "y": 0.149,
        "w": 0.312,
        "h": 0.16,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene89.png",
    "explanation": "そこには何が埋められているのだろうか……",
    "targets": [
      {
        "x": 0.67,
        "y": 0.469,
        "w": 0.186,
        "h": 0.224,
        "angle": -50,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene10.jpg",
    "explanation": "クラーケン襲来！\n総員戦闘配置につけ！！",
    "targets": [
      {
        "x": 0.522,
        "y": 0.158,
        "w": 0.328,
        "h": 0.158,
        "shape": "ellipse",
        "angle": 20
      }
    ]
  },
  {
    "src": "assets/scene12.jpg",
    "explanation": "鏡の中の私……\n鏡写しになっていないけれど……？",
    "targets": [
      {
        "x": 0.825,
        "y": 0.191,
        "w": 0.17,
        "h": 0.273,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene121.jpg",
    "explanation": "窓の外を巨大な黒い影が横切っている……",
    "targets": [
      {
        "x": 0.815,
        "y": 0.055,
        "w": 0.185,
        "h": 0.19,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene76.png",
    "explanation": "可愛くないぬいぐるみだ",
    "targets": [
      {
        "x": 0.075,
        "y": 0.589,
        "w": 0.265,
        "h": 0.164,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene99.png",
    "explanation": "奥にいる女性は人間ではないようだ……",
    "targets": [
      {
        "x": 0.281,
        "y": 0.067,
        "w": 0.242,
        "h": 0.179,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene16.jpg",
    "explanation": "小人は7人のはずだが……\n1人多いようだ",
    "targets": [
      {
        "x": 0.23,
        "y": 0.472,
        "w": 0.246,
        "h": 0.167,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene83.png",
    "explanation": "羊の群れにパンダが紛れ込んでいる",
    "targets": [
      {
        "x": 0.706,
        "y": 0.196,
        "w": 0.286,
        "h": 0.142,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene39.jpg",
    "explanation": "ネギの勇者",
    "targets": [
      {
        "x": 0.572,
        "y": 0.149,
        "w": 0.126,
        "h": 0.319,
        "shape": "ellipse",
        "angle": 25
      }
    ]
  },
  {
    "src": "assets/scene36.png",
    "explanation": "泥棒だ！！",
    "targets": [
      {
        "x": 0.023,
        "y": 0.27,
        "w": 0.182,
        "h": 0.226,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene14.jpg",
    "explanation": "トレーナーの首に異形の手が伸びているが……\n二人とも集中して気付いていないようだ",
    "targets": [
      {
        "x": 0.488,
        "y": 0.137,
        "w": 0.344,
        "h": 0.114,
        "shape": "ellipse",
        "angle": -25
      }
    ]
  },
  {
    "src": "assets/scene17.jpg",
    "explanation": "その鶏肉、洗剤で洗ったの……？",
    "targets": [
      {
        "x": 0.634,
        "y": 0.679,
        "w": 0.366,
        "h": 0.106,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene19.jpg",
    "explanation": "背中、背中……！！",
    "targets": [
      {
        "x": 0.652,
        "y": 0.135,
        "w": 0.195,
        "h": 0.193,
        "shape": "ellipse",
        "angle": 15
      }
    ]
  },
  {
    "src": "assets/scene13.jpg",
    "explanation": "この女性は何者だろうか……？",
    "targets": [
      {
        "x": 0.181,
        "y": 0.566,
        "w": 0.208,
        "h": 0.176,
        "shape": "ellipse",
        "angle": -45
      }
    ]
  },
  {
    "src": "assets/scene24.jpg",
    "explanation": "現像中の写真に現像中の写真が……",
    "targets": [
      {
        "x": 0.432,
        "y": 0.701,
        "w": 0.265,
        "h": 0.107,
        "angle": -20,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene20.jpg",
    "explanation": "その猫は尻尾だけのように見えるが……",
    "targets": [
      {
        "x": 0.005,
        "y": 0.776,
        "w": 0.295,
        "h": 0.12,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene21.jpg",
    "explanation": "不審な人影が見える……",
    "targets": [
      {
        "x": 0.096,
        "y": 0.128,
        "w": 0.098,
        "h": 0.283,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene87.png",
    "explanation": "早く助けを呼ばなければ……！！",
    "targets": [
      {
        "x": 0.37,
        "y": 0.008,
        "w": 0.205,
        "h": 0.172,
        "shape": "ellipse",
        "angle": 5
      }
    ]
  },
  {
    "src": "assets/scene15.jpg",
    "explanation": "その湖には古代生物の生き残りが潜んでいるという噂がある",
    "targets": [
      {
        "x": 0.318,
        "y": 0.185,
        "w": 0.557,
        "h": 0.049,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene23.jpg",
    "explanation": "リンゴの中にリンゴではない物が混じっている……",
    "targets": [
      {
        "x": 0.163,
        "y": 0.614,
        "w": 0.252,
        "h": 0.135,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene80.png",
    "explanation": "車窓に映る人影は誰……？",
    "targets": [
      {
        "x": 0.837,
        "y": 0.09,
        "w": 0.16,
        "h": 0.209,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene25.jpg",
    "explanation": "浦島太郎……？",
    "targets": [
      {
        "x": 0.382,
        "y": 0.567,
        "w": 0.243,
        "h": 0.132,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene18.jpg",
    "explanation": "あのおばあちゃん、箸はいらないの……？",
    "targets": [
      {
        "x": 0.709,
        "y": 0.257,
        "w": 0.21,
        "h": 0.152,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene100.png",
    "explanation": "ん……？\nまたこのパターン……？",
    "targets": [
      {
        "x": 0.877,
        "y": 0.685,
        "w": 0.122,
        "h": 0.205,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene33.jpg",
    "explanation": "環境問題",
    "targets": [
      {
        "x": 0.704,
        "y": 0.218,
        "w": 0.179,
        "h": 0.137,
        "angle": 20,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene92.png",
    "explanation": "部屋の奥に人影が……",
    "targets": [
      {
        "x": 0.727,
        "y": 0.003,
        "w": 0.155,
        "h": 0.197,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene115.png",
    "explanation": "清掃カートの袋に、血の付いたゴミが……",
    "targets": [
      {
        "x": 0,
        "y": 0.65,
        "w": 0.202,
        "h": 0.116,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene27.jpg",
    "explanation": "カーテンの下から誰かの足が……",
    "targets": [
      {
        "x": 0.772,
        "y": 0.821,
        "w": 0.17,
        "h": 0.128,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene29.jpg",
    "explanation": "それはパンじゃないよ！",
    "targets": [
      {
        "x": 0.068,
        "y": 0.137,
        "w": 0.179,
        "h": 0.151,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene30.jpg",
    "explanation": "一緒に食べる……？",
    "targets": [
      {
        "x": 0.728,
        "y": 0.104,
        "w": 0.153,
        "h": 0.138,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene114.jpg",
    "explanation": "ベッドの下に……",
    "targets": [
      {
        "x": 0.212,
        "y": 0.655,
        "w": 0.156,
        "h": 0.17,
        "shape": "ellipse",
        "angle": 45
      }
    ]
  },
  {
    "src": "assets/scene31.jpg",
    "explanation": "最近はゴリラにも職業選択の自由が……？",
    "targets": [
      {
        "x": 0.687,
        "y": 0.258,
        "w": 0.224,
        "h": 0.118,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene34.jpg",
    "explanation": "窓から誰かが覗いている……",
    "targets": [
      {
        "x": 0.004,
        "y": 0.082,
        "w": 0.124,
        "h": 0.164,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene38.jpg",
    "explanation": "置き配は便利だが、荷物が届いた直後には取りに行かない方が良さそうだ",
    "targets": [
      {
        "x": 0,
        "y": 0.733,
        "w": 0.149,
        "h": 0.125,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene37.jpg",
    "explanation": "蠅の王がいる",
    "targets": [
      {
        "x": 0.67,
        "y": 0.623,
        "w": 0.221,
        "h": 0.106,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene111.png",
    "explanation": "ガリバー殿の危機を救うため、桃太郎一行見参！！",
    "targets": [
      {
        "x": 0.136,
        "y": 0.812,
        "w": 0.217,
        "h": 0.071,
        "angle": 15,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene84.png",
    "explanation": "それは別の意味で涼しくなるかも……",
    "targets": [
      {
        "x": 0.673,
        "y": 0.327,
        "w": 0.11,
        "h": 0.166,
        "angle": -20,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene90.png",
    "explanation": "「今日はやけにお客様の視線を感じるわ……」\nまあ、そんな恰好をしていればねぇ……",
    "targets": [
      {
        "x": 0.418,
        "y": 0.794,
        "w": 0.137,
        "h": 0.133,
        "angle": 10,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene94.png",
    "explanation": "それ、ズルくない……？",
    "targets": [
      {
        "x": 0.643,
        "y": 0.529,
        "w": 0.15,
        "h": 0.12,
        "angle": 5,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene28.jpg",
    "explanation": "ドーナツショップのショーケースだが……\nそれはドーナツではないようだ",
    "targets": [
      {
        "x": 0.052,
        "y": 0.523,
        "w": 0.262,
        "h": 0.084,
        "shape": "ellipse",
        "angle": 20
      }
    ]
  },
  {
    "src": "assets/scene22.jpg",
    "explanation": "何者かが覗いている……",
    "targets": [
      {
        "x": 0.679,
        "y": 0.32,
        "w": 0.144,
        "h": 0.152,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene26.jpg",
    "explanation": "ホットドッグにおかしなものが挟まっている\n彼女が誤って食べないことを祈ろう",
    "targets": [
      {
        "x": 0.421,
        "y": 0.853,
        "w": 0.361,
        "h": 0.046,
        "angle": -40,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene40.jpg",
    "explanation": "「変な味のコーラだな……」\nそのボトルの中身は一体……？",
    "targets": [
      {
        "x": 0.754,
        "y": 0.69,
        "w": 0.128,
        "h": 0.129,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene35.jpg",
    "explanation": "その男性はこの世の者ではなさそうだ……",
    "targets": [
      {
        "x": 0.825,
        "y": 0.658,
        "w": 0.172,
        "h": 0.096,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene41.jpg",
    "explanation": "この食肉加工場では様々な動物の肉を扱っている\nそれは新種の鶏だろうか……",
    "targets": [
      {
        "x": 0.798,
        "y": 0.218,
        "w": 0.132,
        "h": 0.151,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene42.jpg",
    "explanation": "公園には何が埋まっているか分からない",
    "targets": [
      {
        "x": 0.784,
        "y": 0.649,
        "w": 0.142,
        "h": 0.127,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene43.jpg",
    "explanation": "この食肉加工場では様々な動物の肉を扱っている\n時々この世のものではない獣の肉も入荷するようだ",
    "targets": [
      {
        "x": 0.791,
        "y": 0.218,
        "w": 0.151,
        "h": 0.119,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene79.png",
    "explanation": "元気に走ってくる少女\n随分顔色が悪いようだが……",
    "targets": [
      {
        "x": 0.772,
        "y": 0.294,
        "w": 0.117,
        "h": 0.145,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene101.png",
    "explanation": "釣れますか……？",
    "targets": [
      {
        "x": 0.767,
        "y": 0.305,
        "w": 0.19,
        "h": 0.095,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene44.jpg",
    "explanation": "4人でファミレスに来たのだが……\n店員には3人しか見えていないようだ",
    "targets": [
      {
        "x": 0.306,
        "y": 0.416,
        "w": 0.203,
        "h": 0.078,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene45.jpg",
    "explanation": "冷蔵庫の陰から、誰かの手が伸びている……",
    "targets": [
      {
        "x": 0.792,
        "y": 0.382,
        "w": 0.177,
        "h": 0.089,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene46.jpg",
    "explanation": "お盆の上に本物のウサギが一匹紛れ込んでいる……",
    "targets": [
      {
        "x": 0.643,
        "y": 0.371,
        "w": 0.156,
        "h": 0.1,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene47.jpg",
    "explanation": "隣の人の絵に落書きをしてはいけません！",
    "targets": [
      {
        "x": 0.269,
        "y": 0.387,
        "w": 0.187,
        "h": 0.08,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene48.jpg",
    "explanation": "それは誰の足なのか……",
    "targets": [
      {
        "x": 0.298,
        "y": 0.208,
        "w": 0.131,
        "h": 0.113,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene119.jpg",
    "explanation": "試着室に監視カメラ……！？",
    "targets": [
      {
        "x": 0.095,
        "y": 0.025,
        "w": 0.15,
        "h": 0.075,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene49.jpg",
    "explanation": "車の下に何かがしがみついている",
    "targets": [
      {
        "x": 0.663,
        "y": 0.427,
        "w": 0.188,
        "h": 0.072,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene73.jpg",
    "explanation": "この傘はどうやってさすのだろうか……？",
    "targets": [
      {
        "x": 0,
        "y": 0.421,
        "w": 0.089,
        "h": 0.116,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene88.png",
    "explanation": "その水は海の味がしそうだ",
    "targets": [
      {
        "x": 0.26,
        "y": 0.568,
        "w": 0.151,
        "h": 0.086,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene50.jpg",
    "explanation": "この公園には芸術的な街灯がある",
    "targets": [
      {
        "x": 0.797,
        "y": 0.01,
        "w": 0.166,
        "h": 0.076,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene51.jpg",
    "explanation": "何者かが螺旋階段の上から見下ろしている……",
    "targets": [
      {
        "x": 0.482,
        "y": 0.174,
        "w": 0.13,
        "h": 0.09,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene52.jpg",
    "explanation": "変わった形のハサミだ\nどうやって使うのだろうか……？",
    "targets": [
      {
        "x": 0.46,
        "y": 0.619,
        "w": 0.204,
        "h": 0.056,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene53.jpg",
    "explanation": "誰かが見ている……",
    "targets": [
      {
        "x": 0.813,
        "y": 0.258,
        "w": 0.103,
        "h": 0.086,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene54.jpg",
    "explanation": "電源プラグが抜けているが、画面に写っている映像は一体……",
    "targets": [
      {
        "x": 0.727,
        "y": 0.775,
        "w": 0.159,
        "h": 0.07,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene55.jpg",
    "explanation": "そのメイド、何を入れている……？",
    "targets": [
      {
        "x": 0.092,
        "y": 0.444,
        "w": 0.118,
        "h": 0.094,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene56.jpg",
    "explanation": "書棚の陰に……",
    "targets": [
      {
        "x": 0.763,
        "y": 0.169,
        "w": 0.099,
        "h": 0.112,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene97.png",
    "explanation": "窓の外にいる者は……",
    "targets": [
      {
        "x": 0.856,
        "y": 0.193,
        "w": 0.144,
        "h": 0.202,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene109.png",
    "explanation": "「時間を忘れそう……」\n……完全に忘れてます",
    "targets": [
      {
        "x": 0.772,
        "y": 0.055,
        "w": 0.13,
        "h": 0.079,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene57.jpg",
    "explanation": "布団の陰から何者かの手が……",
    "targets": [
      {
        "x": 0.745,
        "y": 0.441,
        "w": 0.161,
        "h": 0.061,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene98.png",
    "explanation": "この回廊自体違和感しかないが、その栓を開けると何が起こるのだろうか……？",
    "targets": [
      {
        "x": 0.06,
        "y": 0.665,
        "w": 0.125,
        "h": 0.074,
        "shape": "ellipse",
        "angle": -10
      }
    ]
  },
  {
    "src": "assets/scene58.jpg",
    "explanation": "おい！\nちゃんと彫ってるんだろうな！？",
    "targets": [
      {
        "x": 0.45,
        "y": 0.546,
        "w": 0.119,
        "h": 0.056,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene86.png",
    "explanation": "その入れ歯は誰の物なのだろうか……",
    "targets": [
      {
        "x": 0.521,
        "y": 0.868,
        "w": 0.127,
        "h": 0.065,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene81.png",
    "explanation": "最新型のロボットアームはとてもリアルに出来ている",
    "targets": [
      {
        "x": 0.514,
        "y": 0.099,
        "w": 0.092,
        "h": 0.089,
        "shape": "ellipse",
        "angle": 10
      }
    ]
  },
  {
    "src": "assets/scene59.jpg",
    "explanation": "サンドバッグに人の顔が浮かび上がっている……",
    "targets": [
      {
        "x": 0.824,
        "y": 0.236,
        "w": 0.074,
        "h": 0.11,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene108.png",
    "explanation": "月からの迎えは、宇宙服を着た人……？",
    "targets": [
      {
        "x": 0.83,
        "y": 0.36,
        "w": 0.092,
        "h": 0.088,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene64.jpg",
    "explanation": "その注射器、何に使うつもりなのだろうか……",
    "targets": [
      {
        "x": 0.812,
        "y": 0.229,
        "w": 0.059,
        "h": 0.107,
        "angle": 25,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene61.jpg",
    "explanation": "「あのリンゴ、やけに大きくない……？」\nそれはリンゴではないようだ",
    "targets": [
      {
        "x": 0.52,
        "y": 0.354,
        "w": 0.134,
        "h": 0.059,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene62.jpg",
    "explanation": "最近この辺りに下着泥棒が出没しているらしい",
    "targets": [
      {
        "x": 0.686,
        "y": 0.52,
        "w": 0.144,
        "h": 0.043,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene91.png",
    "explanation": "まるで生き物のように動くリボン\n……本物の生き物だった",
    "targets": [
      {
        "x": 0.779,
        "y": 0.231,
        "w": 0.139,
        "h": 0.056,
        "shape": "ellipse",
        "angle": 10
      }
    ]
  },
  {
    "src": "assets/scene63.jpg",
    "explanation": "その魚だけ本物ではないようだ",
    "targets": [
      {
        "x": 0.286,
        "y": 0.47,
        "w": 0.133,
        "h": 0.058,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene77.png",
    "explanation": "ここを何階だと思っているのか……",
    "targets": [
      {
        "x": 0.817,
        "y": 0.06,
        "w": 0.08,
        "h": 0.093,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene102.png",
    "explanation": "一体どんな競技をしているのか不明だが……\n水槽に落ちたら大変なことになりそうだ",
    "targets": [
      {
        "x": 0.677,
        "y": 0.538,
        "w": 0.055,
        "h": 0.104,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene65.jpg",
    "explanation": "的の後に誰かが立っているようだが……",
    "targets": [
      {
        "x": 0.732,
        "y": 0.409,
        "w": 0.108,
        "h": 0.05,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene74.jpg",
    "explanation": "椅子の下から、不気味な顔が覗いている……",
    "targets": [
      {
        "x": 0.77,
        "y": 0.795,
        "w": 0.105,
        "h": 0.065,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene66.jpg",
    "explanation": "トイレには誰かが潜んでいる",
    "targets": [
      {
        "x": 0.705,
        "y": 0.288,
        "w": 0.081,
        "h": 0.076,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene67.jpg",
    "explanation": "ファンタジー世界に何故デジタル時計……？",
    "targets": [
      {
        "x": 0.156,
        "y": 0.678,
        "w": 0.12,
        "h": 0.039,
        "angle": -15,
        "shape": "rect"
      }
    ]
  },
  {
    "src": "assets/scene110.png",
    "explanation": "確か、お菓子の家に子豚は住んでいないはずだが……",
    "targets": [
      {
        "x": 0.71,
        "y": 0.158,
        "w": 0.086,
        "h": 0.066,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene68.jpg",
    "explanation": "サメが咥えている物は……？",
    "targets": [
      {
        "x": 0.333,
        "y": 0.205,
        "w": 0.108,
        "h": 0.046,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene75.png",
    "explanation": "ちゃんとゴーグルを着けた方がいいと思うよ……",
    "targets": [
      {
        "x": 0.327,
        "y": 0.331,
        "w": 0.137,
        "h": 0.035,
        "shape": "ellipse",
        "angle": -10
      }
    ]
  },
  {
    "src": "assets/scene123.jpg",
    "explanation": "何か盗られてるよ！！",
    "targets": [
      {
        "x": 0.25,
        "y": 0.379,
        "w": 0.1,
        "h": 0.06,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene69.jpg",
    "explanation": "それは人間の手のようだが……",
    "targets": [
      {
        "x": 0.791,
        "y": 0.138,
        "w": 0.095,
        "h": 0.045,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene82.png",
    "explanation": "郵便受けから誰かが覗いている……",
    "targets": [
      {
        "x": 0.663,
        "y": 0.246,
        "w": 0.136,
        "h": 0.024,
        "shape": "rect",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene96.png",
    "explanation": "パスタに奇妙な具が入っている……",
    "targets": [
      {
        "x": 0.69,
        "y": 0.687,
        "w": 0.077,
        "h": 0.052,
        "shape": "ellipse",
        "angle": 30
      }
    ]
  },
  {
    "src": "assets/scene60.jpg",
    "explanation": "花火の中に目のようなものが……",
    "targets": [
      {
        "x": 0.47,
        "y": 0.096,
        "w": 0.096,
        "h": 0.039,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene70.jpg",
    "explanation": "車を搬入した際に轢かれた者がいるようだ……",
    "targets": [
      {
        "x": 0.005,
        "y": 0.63,
        "w": 0.086,
        "h": 0.042,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene112.png",
    "explanation": "斧の持ち主は河童……？",
    "targets": [
      {
        "x": 0.156,
        "y": 0.143,
        "w": 0.078,
        "h": 0.046,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene71.jpg",
    "explanation": "お洒落な鳩だ",
    "targets": [
      {
        "x": 0.123,
        "y": 0.317,
        "w": 0.083,
        "h": 0.042,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene72.jpg",
    "explanation": "こんにちは！！",
    "targets": [
      {
        "x": 0.734,
        "y": 0.237,
        "w": 0.073,
        "h": 0.035,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene85.png",
    "explanation": "それはボトルではなくキャップなのでは……？",
    "targets": [
      {
        "x": 0.761,
        "y": 0.263,
        "w": 0.074,
        "h": 0.033,
        "shape": "ellipse",
        "angle": -15
      }
    ]
  },
  {
    "src": "assets/scene107.png",
    "explanation": "別の次元から誰かやって来たようだ",
    "targets": [
      {
        "x": 0.906,
        "y": 0.207,
        "w": 0.065,
        "h": 0.039,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene78.png",
    "explanation": "扉の隙間から覗く目は……？",
    "targets": [
      {
        "x": 0.945,
        "y": 0.276,
        "w": 0.047,
        "h": 0.027,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene105.png",
    "explanation": "鞄の隙間から視線を感じる……",
    "targets": [
      {
        "x": 0.529,
        "y": 0.727,
        "w": 0.055,
        "h": 0.025,
        "shape": "ellipse",
        "angle": 0
      }
    ]
  },
  {
    "src": "assets/scene106.png",
    "explanation": "崖の先端に、靴だけが揃えて置かれている……\n持ち主はどこへ行ったのだろうか？",
    "targets": [
      {
        "x": 0.882,
        "y": 0.145,
        "w": 0.044,
        "h": 0.019,
        "shape": "rect",
        "angle": 0
      }
    ]
  }
];
  const legacyStageSources = ["assets/scene1.jpg","assets/scene2.jpg","assets/scene3.jpg","assets/scene4.jpg","assets/scene5.jpg","assets/scene6.jpg","assets/scene7.jpg","assets/scene9.jpg","assets/scene8.jpg","assets/scene11.jpg","assets/scene10.jpg","assets/scene12.jpg","assets/scene15.jpg","assets/scene16.jpg","assets/scene39.jpg","assets/scene14.jpg","assets/scene17.jpg","assets/scene19.jpg","assets/scene13.jpg","assets/scene24.jpg","assets/scene20.jpg","assets/scene21.jpg","assets/scene23.jpg","assets/scene25.jpg","assets/scene18.jpg","assets/scene33.jpg","assets/scene27.jpg","assets/scene28.jpg","assets/scene29.jpg","assets/scene30.jpg","assets/scene31.jpg","assets/scene32.jpg","assets/scene34.jpg","assets/scene35.jpg","assets/scene36.png","assets/scene37.jpg","assets/scene38.jpg","assets/scene22.jpg","assets/scene26.jpg","assets/scene40.jpg","assets/scene41.jpg","assets/scene42.jpg","assets/scene43.jpg","assets/scene44.jpg","assets/scene45.jpg","assets/scene46.jpg","assets/scene47.jpg","assets/scene48.jpg","assets/scene49.jpg","assets/scene73.jpg","assets/scene50.jpg","assets/scene51.jpg","assets/scene52.jpg","assets/scene53.jpg","assets/scene54.jpg","assets/scene55.jpg","assets/scene56.jpg","assets/scene57.jpg","assets/scene58.jpg","assets/scene59.jpg","assets/scene60.jpg","assets/scene64.jpg","assets/scene61.jpg","assets/scene62.jpg","assets/scene63.jpg","assets/scene65.jpg","assets/scene74.jpg","assets/scene66.jpg","assets/scene67.jpg","assets/scene68.jpg","assets/scene75.png","assets/scene69.jpg","assets/scene70.jpg","assets/scene71.jpg","assets/scene72.jpg"];
  // Keep stable save-data IDs while loading the optimized JPEG assets.
  const stageImageSrc = (src) => src.replace(/\.png$/i, ".jpg") + "?v=20261024-v67";
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
  const editShape1 = $('editShape1');
  const editShape2 = $('editShape2');
  const hitboxSlot1Button = $('hitboxSlot1Button');
  const hitboxSlot2Button = $('hitboxSlot2Button');
  const addSecondHitboxButton = $('addSecondHitboxButton');
  const removeHitboxButton = $('removeHitboxButton');
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
  let stageSelectUnlocked = true;
  const clearedStageIds = new Set();
  const reachedStageIds = new Set();
  let pendingResultTimer = null;
  let matchedHitboxIndex = 0;

  let editStageIndex = 0;
  let editHitboxIndex = 0;
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

  function normalizeTarget(target = {}) {
    const legacyShape = String(target.shape || '').toLowerCase();
    let shape = 'rect';
    if (legacyShape === 'ellipse' || legacyShape === 'circle') shape = 'ellipse';
    const t = {
      x: clamp(Number(target.x) || 0, 0, 1),
      y: clamp(Number(target.y) || 0, 0, 1),
      w: clamp(Number(target.w) || MIN_SIZE, MIN_SIZE, 1),
      h: clamp(Number(target.h) || MIN_SIZE, MIN_SIZE, 1),
      shape,
      angle: Number.isFinite(Number(target.angle)) ? Number(target.angle) : 0
    };
    if (t.x + t.w > 1) t.x = 1 - t.w;
    if (t.y + t.h > 1) t.y = 1 - t.h;
    t.x = clamp(t.x, 0, 1 - MIN_SIZE);
    t.y = clamp(t.y, 0, 1 - MIN_SIZE);
    t.w = clamp(t.w, MIN_SIZE, 1 - t.x);
    t.h = clamp(t.h, MIN_SIZE, 1 - t.y);
    while (t.angle > 180) t.angle -= 360;
    while (t.angle < -180) t.angle += 360;
    return {
      x: round3(t.x),
      y: round3(t.y),
      w: round3(t.w),
      h: round3(t.h),
      shape: t.shape,
      angle: round3(t.angle)
    };
  }

  function getStageTargets(stage) {
    const source = Array.isArray(stage.targets) && stage.targets.length
      ? stage.targets
      : (stage.target ? [stage.target] : []);
    const targets = source.slice(0, 2).map((target) => normalizeTarget(target));
    if (!targets.length) targets.push(normalizeTarget({ x: 0.4, y: 0.4, w: 0.2, h: 0.2, shape: 'rect', angle: 0 }));
    stage.targets = targets;
    stage.target = targets[0];
    return targets;
  }

  function setStageTargets(stage, targets) {
    const normalized = (Array.isArray(targets) ? targets : [targets])
      .filter(Boolean)
      .slice(0, 2)
      .map((target) => normalizeTarget(target));
    stage.targets = normalized.length ? normalized : [normalizeTarget({ x: 0.4, y: 0.4, w: 0.2, h: 0.2, shape: 'rect', angle: 0 })];
    stage.target = stage.targets[0];
    return stage.targets;
  }

  function shapeLabel(shape) {
    if (shape === 'ellipse' || shape === 'circle') return '楕円形';
    return '四角形';
  }

  function rotatePoint(px, py, cx, cy, angleDeg) {
    const rad = (angleDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const dx = px - cx;
    const dy = py - cy;
    return {
      x: (dx * cos) + (dy * sin),
      y: (-dx * sin) + (dy * cos)
    };
  }

  function targetContainsPoint(target, px, py) {
    const t = normalizeTarget(target);
    const cx = t.x + (t.w / 2);
    const cy = t.y + (t.h / 2);
    // CSS rotates in physical pixels, not in the non-square normalized plane.
    const rect = sceneImage.getBoundingClientRect();
    const aspect = rect.height > 0 ? rect.width / rect.height : 1;
    const local = rotatePoint(px * aspect, py, cx * aspect, cy, t.angle || 0);
    const halfW = t.w * aspect / 2;
    const halfH = t.h / 2;
    if (Math.abs(local.x) > halfW || Math.abs(local.y) > halfH) return false;
    if (t.shape === 'ellipse') {
      const dx = local.x / halfW;
      const dy = local.y / halfH;
      return (dx * dx) + (dy * dy) <= 1;
    }
    return true;
  }

  defaultStages.forEach((stage) => setStageTargets(stage, stage.targets || stage.target));
  stages.forEach((stage) => setStageTargets(stage, stage.targets || stage.target));

  function getStoredValue(primaryKey, legacyKeys = []) {
    const direct = localStorage.getItem(primaryKey);
    if (direct) return direct;
    for (const key of legacyKeys) {
      const value = localStorage.getItem(key);
      if (value) return value;
    }
    return null;
  }

  function saveValue(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (error) { showToast('保存できませんでした。ブラウザの保存設定をご確認ください', 'ng'); }
  }

  function loadStageOverrides(key, legacyKeys, apply) {
    try {
      const raw = getStoredValue(key, legacyKeys);
      if (!raw) return;
      const saved = JSON.parse(raw);
      const entries = Array.isArray(saved)
        ? saved.map((value, index) => [legacyStageSources[index], value])
        : Object.entries(saved || {});
      for (const [src, value] of entries) {
        const stage = stages.find(stage => stage.src === src);
        if (stage && value != null) apply(stage, value);
      }
    } catch (error) { console.warn('stage overrides load failed', error); }
  }

  function loadCustomTargets() {
    loadStageOverrides(STORAGE_KEY, LEGACY_TARGET_STORAGE_KEYS, (stage, value) =>
      setStageTargets(stage, Array.isArray(value) ? value : [value]));
  }

  function saveCustomTargets() {
    saveValue(STORAGE_KEY, Object.fromEntries(stages.map(stage => [stage.src, getStageTargets(stage)])));
  }

  function loadCustomExplanations() {
    loadStageOverrides(EXPLANATION_STORAGE_KEY, LEGACY_EXPLANATION_STORAGE_KEYS, (stage, value) => {
      if (typeof value === 'string') stage.explanation = value;
    });
  }

  function saveCustomExplanations() {
    saveValue(EXPLANATION_STORAGE_KEY, Object.fromEntries(stages.map(stage => [stage.src, stage.explanation || ''])));
  }

  function stageArea(stage) {
    return getStageTargets(stage).reduce((sum, t) =>
      sum + t.w * t.h * (t.shape === 'ellipse' ? Math.PI / 4 : 1), 0);
  }

  function restoreStageOrder() {
    const playingSrc = stages[stageIndex]?.src;
    const editingSrc = stages[editStageIndex]?.src;
    // Keep the eight new stages first and preserve the reviewed stage sequence.
    stages.sort((a, b) => defaultStages.findIndex(s => s.src === a.src) - defaultStages.findIndex(s => s.src === b.src));
    stageIndex = Math.max(0, stages.findIndex(stage => stage.src === playingSrc));
    editStageIndex = Math.max(0, stages.findIndex(stage => stage.src === editingSrc));
    reachedStageIds.add(stages[0].src);
  }

  function loadStageSelectUnlock() {
    stageSelectUnlocked = true;
    updateStageSelectAvailability();
  }

  function unlockStageSelect() {
    stageSelectUnlocked = true;
    updateStageSelectAvailability();
    return false;
  }

  function loadStageProgress() {
    try {
      const raw = localStorage.getItem(CLEARED_PROGRESS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        for (const src of saved.cleared || []) if (stages.some(s => s.src === src)) clearedStageIds.add(src);
        for (const src of saved.reached || []) if (stages.some(s => s.src === src)) reachedStageIds.add(src);
      } else {
        const legacyRaw = localStorage.getItem('iwakan_cleared_progress_v46_75stages_sorted');
        const last = Number.parseInt(legacyRaw ?? '-1', 10);
        legacyStageSources.forEach((src, index) => {
          if (index <= last) clearedStageIds.add(src);
          if (legacyRaw !== null && index <= last + 1) reachedStageIds.add(src);
        });
      }
    } catch (error) { console.warn('progress load failed', error); }
    reachedStageIds.add(stages[0].src);
    for (const src of clearedStageIds) reachedStageIds.add(src);
    saveStageProgress();
  }

  function saveStageProgress() {
    saveValue(CLEARED_PROGRESS_KEY, { cleared: [...clearedStageIds], reached: [...reachedStageIds] });
  }

  function markStageCleared(index) {
    const src = stages[index].src;
    const isNew = !clearedStageIds.has(src);
    clearedStageIds.add(src);
    reachedStageIds.add(src);
    if (stages[index + 1]) reachedStageIds.add(stages[index + 1].src);
    saveStageProgress();
    buildStageSelect();
    return isNew;
  }

  function updateStageSelectAvailability() {
    if (stageSelectButton) stageSelectButton.classList.remove('hidden');
    if (resultStageSelectButton) resultStageSelectButton.classList.remove('hidden');
  }

  function setView(view) {
    clearTimeout(pendingResultTimer);
    if (view !== 'game') hideAnswerOverlay();
    if (view === 'start' || view === 'select') {
      restoreStageOrder();
      saveStageProgress();
      buildStageSelect();
    }
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
    if (!correct) {
      setTimeout(() => marker.remove(), 1000);
    }
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
    matchedHitboxIndex = 0;
    hideAnswerOverlay();
    markerLayer.innerHTML = '';
    loading.textContent = 'LOADING...';
    loading.classList.remove('hidden');
    updateHud();

    const stage = stages[stageIndex];
    if (playMode !== 'test') { reachedStageIds.add(stage.src); saveStageProgress(); }
    sceneImage.onload = () => loading.classList.add('hidden');
    sceneImage.onerror = () => { loading.textContent = '画像を読み込めませんでした'; };
    sceneImage.src = stageImageSrc(stage.src);
  }

  function buildStageSelect() {
    stageGrid.innerHTML = '';
    stages.forEach((stage, index) => {
      const button = document.createElement('button');
      const cleared = clearedStageIds.has(stage.src);
      const available = cleared || reachedStageIds.has(stage.src);
      button.type = 'button';
      button.className = `stage-card${cleared ? ' cleared' : (available ? '' : ' locked')}`;
      button.disabled = !available;
      button.setAttribute('aria-disabled', available ? 'false' : 'true');
      button.innerHTML = `<img class="stage-thumb" src="${stageImageSrc(stage.src)}" alt="ステージ${index + 1}"><strong>STAGE ${index + 1}${cleared ? ' ✓' : (available ? '' : ' 🔒')}</strong>`;
      if (available) button.addEventListener('click', () => startSelectedStage(index));
      stageGrid.appendChild(button);
    });
  }

  function finishGame(clear) {
    hideAnswerOverlay();
    stopBgm(true);
    if (clear) playClearSound();
    else playGameOverSound();

    unlockStageSelect();
    setView('result');
    updateStageSelectAvailability();
    const cleared = clearedStageIds.size;
    const total = stages.length;
    clearCount.textContent = `${cleared} / ${total}`;
    missCount.textContent = `${totalMisses}`;

    if (clear) {
      resultSymbol.innerHTML = `<img src="${CORRECT_ICON_SRC}" alt="正解">`;
      resultTitle.textContent = playMode === 'test' ? 'STAGE CLEAR!' : 'GAME CLEAR!';
      if (playMode === 'test') {
        resultMessage.textContent = `ステージ ${stageIndex + 1} の違和感を見つけました。`;
      } else {
        resultMessage.textContent = totalMisses === 0
          ? 'ノーミスクリア！ すべての違和感を見抜きました。'
          : 'すべての違和感を見つけました。';
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

  function startSelectedStage(index) {
    if (!stages[index] || !(reachedStageIds.has(stages[index].src) || clearedStageIds.has(stages[index].src))) return;
    ensureAudio();
    startBgm();
    playMode = 'selection';
    stageIndex = index;
    stageMisses = 0;
    totalMisses = 0;
    solved = false;
    toast.classList.add('hidden');
    hideAnswerOverlay();
    setView('game');
    loadStage();
  }

  function startTestStage(index) {
    ensureAudio();
    startBgm();
    playMode = 'test';
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

    const targets = getStageTargets(stage);
    const t = normalizeTarget(targets[clamp(matchedHitboxIndex, 0, targets.length - 1)] || targets[0]);
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
    answerNextButton.textContent = playMode === 'test'
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

    if (playMode === 'test') {
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

    const targets = getStageTargets(stages[stageIndex]);
    const hitIndex = targets.findIndex((target) => targetContainsPoint(target, px, py));
    const correct = hitIndex >= 0;
    addMarker(px, py, correct);

    if (correct) {
      matchedHitboxIndex = hitIndex;
      solved = true;
      if (playMode !== 'test') markStageCleared(stageIndex);
      playCorrectSound();
      pendingResultTimer = setTimeout(showAnswerDetail, 360);
      return;
    }

    stageMisses += 1;
    totalMisses += 1;
    playWrongSound();

    if (stageMisses >= 3) {
      solved = true;
      pendingResultTimer = setTimeout(() => finishGame(false), 760);
    }
  }

  function formatTarget(target, index = 0) {
    const t = normalizeTarget(target);
    const angleText = ` / 角度: ${t.angle.toFixed(1)}°`;
    return `判定${index + 1}・${shapeLabel(t.shape)} / x: ${t.x.toFixed(3)} / y: ${t.y.toFixed(3)} / w: ${t.w.toFixed(3)} / h: ${t.h.toFixed(3)}${angleText}`;
  }

  function rotationCss(angle) {
    return `rotate(${(Number(angle) || 0).toFixed(3)}deg)`;
  }

  function styleEditorShape(element, target, selected) {
    if (!element) return;
    if (!target) {
      element.classList.add('hidden');
      return;
    }
    const t = normalizeTarget(target);
    element.classList.remove('hidden', 'shape-rect', 'shape-ellipse', 'shape-circle', 'selected');
    element.classList.add(`shape-${t.shape}`);
    if (selected) element.classList.add('selected');
    element.style.left = `${t.x * 100}%`;
    element.style.top = `${t.y * 100}%`;
    element.style.width = `${t.w * 100}%`;
    element.style.height = `${t.h * 100}%`;
    element.style.clipPath = 'none';
    element.style.transform = rotationCss(t.angle);
  }

  function updateEditorShapeButtons(targets) {
    const count = targets.length;
    if (editHitboxIndex >= count) editHitboxIndex = count - 1;
    if (editHitboxIndex < 0) editHitboxIndex = 0;
    if (hitboxSlot1Button) hitboxSlot1Button.classList.toggle('active', editHitboxIndex === 0);
    if (hitboxSlot2Button) {
      hitboxSlot2Button.classList.toggle('active', editHitboxIndex === 1);
      hitboxSlot2Button.disabled = count < 2;
    }
    if (addSecondHitboxButton) addSecondHitboxButton.disabled = count >= 2;
    if (removeHitboxButton) removeHitboxButton.disabled = count <= 1;

    const activeTarget = targets[editHitboxIndex];
    document.querySelectorAll('[data-shape]').forEach((button) => {
      const currentShape = activeTarget.shape === 'circle' ? 'ellipse' : activeTarget.shape;
      button.classList.toggle('active', button.dataset.shape === currentShape);
    });
  }

  function updateEditorRect() {
    const stage = stages[editStageIndex];
    const targets = getStageTargets(stage);
    setStageTargets(stage, targets);
    styleEditorShape(editShape1, targets[0], editHitboxIndex === 0);
    styleEditorShape(editShape2, targets[1], editHitboxIndex === 1);
    updateEditorShapeButtons(targets);
    editorValues.textContent = formatTarget(targets[editHitboxIndex], editHitboxIndex);
    document.querySelectorAll('[data-target-field]').forEach(input => {
      input.value = targets[editHitboxIndex][input.dataset.targetField];
    });
    editorStageLabel.textContent = `STAGE ${editStageIndex + 1} / ${stages.length}`;
  }

  function loadEditorStage() {
    editHitboxIndex = 0;
    editorLoading.textContent = 'LOADING...';
    editorLoading.classList.remove('hidden');
    editorImage.onload = () => {
      editorLoading.classList.add('hidden');
      updateEditorRect();
    };
    editorImage.onerror = () => {
      editorLoading.textContent = '画像を読み込めませんでした';
    };
    editorImage.src = stageImageSrc(stages[editStageIndex].src);
    updateEditorRect();
    if (editorExplanation) editorExplanation.value = stages[editStageIndex].explanation || '';
  }

  function openEditor(index = 0) {
    editStageIndex = clamp(index, 0, stages.length - 1);
    editHitboxIndex = 0;
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

  function activeEditorTarget() {
    const targets = getStageTargets(stages[editStageIndex]);
    editHitboxIndex = clamp(editHitboxIndex, 0, targets.length - 1);
    return targets[editHitboxIndex];
  }

  function setActiveEditorTarget(target) {
    const stage = stages[editStageIndex];
    const targets = getStageTargets(stage).slice();
    targets[editHitboxIndex] = normalizeTarget(target);
    setStageTargets(stage, targets);
  }

  function beginDraw(event) {
    if (!editorLoading.classList.contains('hidden')) return;
    const point = pointToNormalized(event, editorOverlay);
    if (!point) return;
    editorDrawing = true;
    drawStart = point;
    const current = activeEditorTarget();
    setActiveEditorTarget({ x: point.x, y: point.y, w: MIN_SIZE, h: MIN_SIZE, shape: current.shape, angle: current.angle });
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
    const current = activeEditorTarget();
    setActiveEditorTarget({
      x: x1,
      y: y1,
      w: Math.max(MIN_SIZE, x2 - x1),
      h: Math.max(MIN_SIZE, y2 - y1),
      shape: current.shape,
      angle: current.angle
    });
    updateEditorRect();
  }

  function endDraw() {
    if (!editorDrawing) return;
    editorDrawing = false;
    drawStart = null;
    saveCustomTargets();
    showToast(`判定${editHitboxIndex + 1}を保存しました`, 'note');
  }

  function selectHitbox(index) {
    const targets = getStageTargets(stages[editStageIndex]);
    if (!targets[index]) return;
    editHitboxIndex = index;
    updateEditorRect();
  }

  function addSecondHitbox() {
    const stage = stages[editStageIndex];
    const targets = getStageTargets(stage).slice();
    if (targets.length >= 2) return;
    targets.push(normalizeTarget({ x: 0.4, y: 0.4, w: 0.2, h: 0.2, shape: 'rect', angle: 0 }));
    setStageTargets(stage, targets);
    editHitboxIndex = 1;
    saveCustomTargets();
    updateEditorRect();
    showToast('判定2を追加しました', 'note');
  }

  function removeSelectedHitbox() {
    const stage = stages[editStageIndex];
    const targets = getStageTargets(stage).slice();
    if (targets.length <= 1) {
      showToast('当たり判定は1つ以上必要です', 'ng');
      return;
    }
    targets.splice(editHitboxIndex, 1);
    setStageTargets(stage, targets);
    editHitboxIndex = 0;
    saveCustomTargets();
    updateEditorRect();
    showToast('選択中の判定を削除しました', 'note');
  }

  function setActiveShape(shape) {
    const normalizedShape = shape === 'circle' ? 'ellipse' : shape;
    if (!['rect', 'ellipse'].includes(normalizedShape)) return;
    const t = { ...activeEditorTarget(), shape: normalizedShape };
    setActiveEditorTarget(t);
    saveCustomTargets();
    updateEditorRect();
  }

  function tweakTarget(action) {
    const t = { ...activeEditorTarget() };
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
      case 'rotateLeft':
        t.angle = (Number(t.angle) || 0) - 5;
        break;
      case 'rotateRight':
        t.angle = (Number(t.angle) || 0) + 5;
        break;
      default:
        return;
    }
    setActiveEditorTarget(t);
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

  function targetCode(target) {
    const t = normalizeTarget(target);
    const normalizedShape = t.shape === 'circle' ? 'ellipse' : t.shape;
    const shapeCode = normalizedShape === 'rect' ? '' : `, shape: '${normalizedShape}'`;
    const angleCode = Math.abs(t.angle || 0) < 0.001 ? '' : `, angle: ${t.angle.toFixed(3)}`;
    return `{ x: ${t.x.toFixed(3)}, y: ${t.y.toFixed(3)}, w: ${t.w.toFixed(3)}, h: ${t.h.toFixed(3)}${shapeCode}${angleCode} }`;
  }

  function currentStageCode(index) {
    const stage = stages[index];
    const targets = getStageTargets(stage);
    const targetShape = (targets[0].shape === 'circle') ? 'ellipse' : targets[0].shape;
    const targetsCode = targets.length === 1 && targetShape === 'rect' && Math.abs(targets[0].angle || 0) < 0.001
      ? `target: ${targetCode(targets[0])}`
      : `targets: [${targets.map((target) => targetCode(target)).join(', ')}]`;
    const explanationCode = stage.explanation ? `, explanation: ${JSON.stringify(stage.explanation)}` : '';
    const answerTitleCode = stage.answerTitle ? `, answerTitle: ${JSON.stringify(stage.answerTitle)}` : '';
    return `{ src: '${stage.src}', ${targetsCode}${explanationCode}${answerTitleCode} }`;
  }

  function allStagesCode() {
    return 'const stages = [\n  ' + stages.map((_, index) => currentStageCode(index)).join(',\n  ') + '\n];';
  }

  function resetCurrentTarget() {
    setStageTargets(stages[editStageIndex], deepClone(getStageTargets(defaultStages.find(stage => stage.src === stages[editStageIndex].src))));
    editHitboxIndex = 0;
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
    stages[editStageIndex].explanation = defaultStages.find(stage => stage.src === stages[editStageIndex].src).explanation || '';
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

  function resetSecretTapCounter() {
    secretTapCount = 0;
    if (secretTapTimer) {
      clearTimeout(secretTapTimer);
      secretTapTimer = null;
    }
  }

  function registerSecretTap() {
    secretTapCount += 1;
    if (secretTapTimer) clearTimeout(secretTapTimer);
    secretTapTimer = setTimeout(resetSecretTapCounter, 2800);

    if (secretTapCount >= 7) {
      resetSecretTapCounter();
      openHiddenEditor(0);
      return true;
    }
    return false;
  }

  function beginEditorHold(event) {
    if (!secretEditorTrigger) return;
    event.stopPropagation();
    editorHoldOpened = false;
    clearTimeout(editorHoldTimer);
    editorHoldTimer = setTimeout(() => {
      editorHoldOpened = true;
      resetSecretTapCounter();
      openHiddenEditor(0);
    }, 1600);
  }

  function endEditorHold(event) {
    if (event) event.stopPropagation();
    clearTimeout(editorHoldTimer);
    editorHoldTimer = null;
  }

  if (secretEditorTrigger) {
    secretEditorTrigger.addEventListener('pointerdown', beginEditorHold);
    secretEditorTrigger.addEventListener('pointerup', (event) => {
      event.preventDefault();
      event.stopPropagation();
      endEditorHold(event);
      if (editorHoldOpened) {
        editorHoldOpened = false;
        return;
      }
      startCampaign();
    });
    secretEditorTrigger.addEventListener('pointercancel', endEditorHold);
    secretEditorTrigger.addEventListener('pointerleave', endEditorHold);
    // A short tap starts play; a 1.6 second hold opens only the editor.
    secretEditorTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }

  startPanel.addEventListener('click', startCampaign);
  if (stageSelectButton) {
    stageSelectButton.addEventListener('click', (event) => {
      event.stopPropagation();
      stopBgm(true);
      setView('select');
    });
  }
  retryButton.addEventListener('click', startCampaign);
  if (resultEditButton) resultEditButton.addEventListener('click', () => openEditor(stageIndex));
  if (resultStageSelectButton) resultStageSelectButton.addEventListener('click', () => {
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
  editorPlayButton.addEventListener('click', () => startTestStage(editStageIndex));
  editorResetButton.addEventListener('click', resetCurrentTarget);
  if (hitboxSlot1Button) hitboxSlot1Button.addEventListener('click', () => selectHitbox(0));
  if (hitboxSlot2Button) hitboxSlot2Button.addEventListener('click', () => selectHitbox(1));
  if (addSecondHitboxButton) addSecondHitboxButton.addEventListener('click', addSecondHitbox);
  if (removeHitboxButton) removeHitboxButton.addEventListener('click', removeSelectedHitbox);
  document.querySelectorAll('[data-shape]').forEach((button) => {
    button.addEventListener('click', () => setActiveShape(button.dataset.shape));
  });
  if (editorExplanationSaveButton) editorExplanationSaveButton.addEventListener('click', saveCurrentExplanation);
  if (editorExplanationResetButton) editorExplanationResetButton.addEventListener('click', resetCurrentExplanation);
  editorCopyCurrentButton.addEventListener('click', () => copyText(currentStageCode(editStageIndex), `ステージ ${editStageIndex + 1} の座標をコピーしました`));
  editorCopyAllButton.addEventListener('click', () => copyText(allStagesCode(), '全画像の座標をコピーしました'));
  document.querySelectorAll('[data-target-field]').forEach(input => {
    input.addEventListener('change', () => {
      const value = Number(input.value);
      if (!Number.isFinite(value)) { updateEditorRect(); return; }
      setActiveEditorTarget({ ...activeEditorTarget(), [input.dataset.targetField]: value });
      saveCustomTargets();
      updateEditorRect();
    });
  });
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

    if (!editorPanel.classList.contains('hidden') && !event.target.matches('input, textarea, select, [contenteditable]')) {
      if (event.key === 'ArrowUp') { event.preventDefault(); tweakTarget('up'); }
      if (event.key === 'ArrowDown') { event.preventDefault(); tweakTarget('down'); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); tweakTarget('left'); }
      if (event.key === 'ArrowRight') { event.preventDefault(); tweakTarget('right'); }
    }
  });

  try {
    const previous = 'assets/scene36.jpg', current = 'assets/scene36.png';
    const progress = JSON.parse(localStorage.getItem(CLEARED_PROGRESS_KEY) || 'null');
    if (progress) {
      for (const key of ['reached', 'cleared']) if (Array.isArray(progress[key])) progress[key] = [...new Set(progress[key].map(src => src === previous ? current : src))];
      localStorage.setItem(CLEARED_PROGRESS_KEY, JSON.stringify(progress));
    }
    for (const key of [STORAGE_KEY, EXPLANATION_STORAGE_KEY]) {
      const saved = JSON.parse(localStorage.getItem(key) || 'null');
      if (saved && Object.hasOwn(saved, previous)) { delete saved[previous]; localStorage.setItem(key, JSON.stringify(saved)); }
    }
  } catch (error) { console.warn('stage36 migration failed', error); }
  updateSoundToggle();
  try {
    if (localStorage.getItem('iwakan_scene105_revision') !== 'v53') {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete saved['assets/scene105.png'];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      localStorage.setItem('iwakan_scene105_revision', 'v53');
    }
  } catch (error) { console.warn('scene105 update could not be saved', error); }
  loadCustomTargets();
  loadCustomExplanations();
  loadStageSelectUnlock();
  restoreStageOrder();
  loadStageProgress();
  buildStageSelect();
})();
