const locales_Lx92 = {
    en: {
      header: "Live Website IP",
      lang: "Interface Language",
      bg: "Background",
      text: "Text",
      size: "Font Size",
      corners: "Corner Style",
      square: "Square",
      oval: "Oval",
      preview: "Live Preview"
    },
  
    tr: {
      header: "Canlı Web Sitesi IP Adresi",
      lang: "Arayüz Dili",
      bg: "Arkaplan",
      text: "Yazı",
      size: "Yazı Boyutu",
      corners: "Köşe Stili",
      square: "Kare",
      oval: "Oval",
      preview: "Canlı Önizleme"
    },
  
    de: {
      header: "Live-Website-IP",
      lang: "Schnittstellensprache",
      bg: "Hintergrund",
      text: "Text",
      size: "Schriftgröße",
      corners: "Eckenstil",
      square: "Quadrat",
      oval: "Oval",
      preview: "Live-Vorschau"
    },
  
    fr: {
      header: "IP du site en temps réel",
      lang: "Langue de l'interface",
      bg: "Arrière-plan",
      text: "Texte",
      size: "Taille de police",
      corners: "Style des coins",
      square: "Carré",
      oval: "Ovale",
      preview: "Aperçu en direct"
    },
  
    es: {
      header: "IP del sitio en tiempo real",
      lang: "Idioma de la interfaz",
      bg: "Fondo",
      text: "Texto",
      size: "Tamaño de fuente",
      corners: "Estilo de esquina",
      square: "Cuadrado",
      oval: "Ovalado",
      preview: "Vista previa en vivo"
    },
  
    it: {
      header: "IP del sito in tempo reale",
      lang: "Lingua dell'interfaccia",
      bg: "Sfondo",
      text: "Testo",
      size: "Dimensione carattere",
      corners: "Stile angoli",
      square: "Quadrato",
      oval: "Ovale",
      preview: "Anteprima live"
    },
  
    ru: {
      header: "IP сайта в реальном времени",
      lang: "Язык интерфейса",
      bg: "Фон",
      text: "Текст",
      size: "Размер шрифта",
      corners: "Стиль углов",
      square: "Квадрат",
      oval: "Овал",
      preview: "Просмотр в реальном времени"
    },
  
    ja: {
      header: "リアルタイムのサイトIP",
      lang: "インターフェース言語",
      bg: "背景",
      text: "テキスト",
      size: "フォントサイズ",
      corners: "角のスタイル",
      square: "正方形",
      oval: "楕円形",
      preview: "ライブプレビュー"
    },
  
    zh_CN: {
      header: "网站实时 IP",
      lang: "界面语言",
      bg: "背景",
      text: "文本",
      size: "字体大小",
      corners: "圆角样式",
      square: "方形",
      oval: "椭圆",
      preview: "实时预览"
    },
  
    ko: {
      header: "실시간 웹사이트 IP",
      lang: "인터페이스 언어",
      bg: "배경",
      text: "텍스트",
      size: "글꼴 크기",
      corners: "모서리 스타일",
      square: "사각형",
      oval: "타원형",
      preview: "실시간 미리보기"
    }
  };
  
  const el_Lx92 = {
    active: document.getElementById('toggleActive_Lx92'),
    lang: document.getElementById('languageSelect_Lx92'),
    bgColor: document.getElementById('bgColor_Lx92'),
    bgHex: document.getElementById('bgHex_Lx92'),
    textColor: document.getElementById('textColor_Lx92'),
    textHex: document.getElementById('textHex_Lx92'),
    fontSize: document.getElementById('fontSize_Lx92'),
    sizeVal: document.getElementById('sizeValue_Lx92'),
    radSquare: document.getElementById('radSquare_Lx92'),
    radOval: document.getElementById('radOval_Lx92'),
    preview: document.getElementById('previewBox_Lx92'),
    labels: {
      header: document.getElementById('lblHeader_Lx92'),
      lang: document.getElementById('lblLanguage_Lx92'),
      bg: document.getElementById('lblBgColor_Lx92'),
      text: document.getElementById('lblTextColor_Lx92'),
      size: document.getElementById('lblSize_Lx92'),
      corners: document.getElementById('lblCorners_Lx92'),
      sq: document.getElementById('optSquare_Lx92'),
      ov: document.getElementById('optOval_Lx92'),
      prev: document.getElementById('lblPreview_Lx92')
    }
  };
  
  function loadSettings_Lx92() {
    chrome.storage.local.get(['settings_Lx92'], (result) => {
      const s = result.settings_Lx92 || { isActive: true, bgColor: '#1e1e2e', textColor: '#ffffff', fontSize: 13, cornerStyle: 'oval', language: 'en' };
      
      el_Lx92.active.checked = s.isActive;
      el_Lx92.lang.value = s.language;
      el_Lx92.bgColor.value = s.bgColor;
      el_Lx92.bgHex.textContent = s.bgColor;
      el_Lx92.textColor.value = s.textColor;
      el_Lx92.textHex.textContent = s.textColor;
      el_Lx92.fontSize.value = s.fontSize;
      el_Lx92.sizeVal.textContent = s.fontSize + 'px';
      
      if (s.cornerStyle === 'square') el_Lx92.radSquare.checked = true;
      else el_Lx92.radOval.checked = true;
      
      setLanguage_Lx92(s.language);
      updatePreview_Lx92(s);
    });
  }
  
  function saveSettings_Lx92() {
    const settings = {
      isActive: el_Lx92.active.checked,
      language: el_Lx92.lang.value,
      bgColor: el_Lx92.bgColor.value,
      textColor: el_Lx92.textColor.value,
      fontSize: parseInt(el_Lx92.fontSize.value),
      cornerStyle: el_Lx92.radSquare.checked ? 'square' : 'oval'
    };
  
    chrome.storage.local.set({ settings_Lx92: settings }, () => {
      updatePreview_Lx92(settings);
      setLanguage_Lx92(settings.language);
      
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          chrome.tabs.sendMessage(tab.id, { type: 'SETTINGS_UPDATE_Lx92', settings }).catch(() => {});
        });
      });
    });
  }
  
  function updatePreview_Lx92(s) {
    el_Lx92.preview.style.backgroundColor = s.bgColor;
    el_Lx92.preview.style.color = s.textColor;
    el_Lx92.preview.style.fontSize = s.fontSize + 'px';
    el_Lx92.preview.style.borderRadius = s.cornerStyle === 'oval' ? '24px' : '4px';
    el_Lx92.preview.style.opacity = s.isActive ? '1' : '0.4';
    
    el_Lx92.bgHex.textContent = s.bgColor;
    el_Lx92.textHex.textContent = s.textColor;
  }
  
  function setLanguage_Lx92(langCode) {
    const t = locales_Lx92[langCode] || locales_Lx92['en'];
    el_Lx92.labels.header.textContent = t.header;
    el_Lx92.labels.lang.textContent = t.lang;
    el_Lx92.labels.bg.textContent = t.bg;
    el_Lx92.labels.text.textContent = t.text;
    el_Lx92.labels.size.textContent = t.size;
    el_Lx92.labels.corners.textContent = t.corners;
    el_Lx92.labels.sq.textContent = t.square;
    el_Lx92.labels.ov.textContent = t.oval;
    el_Lx92.labels.prev.textContent = t.preview;
  }
  
  el_Lx92.active.addEventListener('change', saveSettings_Lx92);
  el_Lx92.lang.addEventListener('change', saveSettings_Lx92);
  el_Lx92.bgColor.addEventListener('input', saveSettings_Lx92);
  el_Lx92.textColor.addEventListener('input', saveSettings_Lx92);
  el_Lx92.fontSize.addEventListener('input', () => {
    el_Lx92.sizeVal.textContent = el_Lx92.fontSize.value + 'px';
    saveSettings_Lx92();
  });
  el_Lx92.radSquare.addEventListener('change', saveSettings_Lx92);
  el_Lx92.radOval.addEventListener('change', saveSettings_Lx92);
  
  document.addEventListener('DOMContentLoaded', loadSettings_Lx92);