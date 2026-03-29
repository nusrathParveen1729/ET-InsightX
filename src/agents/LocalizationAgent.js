export const LocalizationAgent = {
  // Translate UI strings
  translatePage: async (languageCode) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const map = {
      HI: {
        greeting: "नमस्ते, {name}",
        subtitle: "आपका इंटेलिजेंस हब आज के इकोनॉमिक टाइम्स के पल्स के साथ सिंक्रोनाइज्ड है।",
        realtimeAgents: "रियल-टाइम एजेंट सक्रिय",
        aiBriefings: "एआई ब्रीफिंग्स",
        forYou: "आपके लिए",
        quickInsights: "निष्पादन अंतर्दृष्टि",
        marketAlert: "बाज़ार अलर्ट",
        opportunity: "अवसर",
        trendAlert: "ट्रेंड अलर्ट",
        search: "खबरें, कंपनियां खोजें...",
        home: "होम",
        adminMonitor: "एडमिन मॉनिटर",
        initializeIntelligence: "इंटेलिजेंस शुरू करें",
        selectPersona: "एजेंट तैनात करने के लिए व्यक्तित्व चुनें",
        investor: "निवेशक",
        founder: "संस्थापक",
        student: "छात्र",
        default: "डिफ़ॉल्ट",
        enterYourName: "अपना नाम दर्ज करें",
        personaIdentity: "एजेंट पहचान स्थापित करें"
      },
      TE: {
        greeting: "నమస్కారం, {name}",
        subtitle: "మీ ఇంటెలిజెన్స్ హబ్ నేటి ఎకనామిక్ టైమ్స్ పల్స్‌తో సమకాలీకరించబడింది.",
        realtimeAgents: "రియల్ టైమ్ ఏజెంట్లు యాక్టివ్",
        aiBriefings: "ఏఐ సంక్షిప్తాలు",
        forYou: "మీ కోసం",
        quickInsights: "త్వరిత అంతర్దృష్టులు",
        marketAlert: "మార్కెట్ హెచ్చరిక",
        opportunity: "అవకాశం",
        trendAlert: "ట్రెండ్ హెచ్చరిక",
        search: "వార్తలు, కంపెనీలు శోధించండి...",
        home: "హోమ్",
        adminMonitor: "అడ్మిన్ మానిటర్",
        initializeIntelligence: "ఇంటెలిజెన్స్ ప్రారంభించండి",
        selectPersona: "వ్యక్తిత్వాన్ని ఎంచుకోండి",
        investor: "పెట్టుబడిదారుడు",
        founder: "వ్యవస్థాపకుడు",
        student: "విద్యార్థి",
        default: "సాధారణ",
        aiExecutiveSummary: "AI ఎగ్జిక్యూటివ్ సమ్మరీ",
        coreStrategicInsights: "కోర్ స్ట్రాటజిక్ అంతర్దృష్టులు",
        watchVideoBriefing: "AI వీడియో బ్రీఫింగ్ చూడండి",
        portfolioDriftAnalysis: "పోర్ట్‌ఫోలియో డ్రిఫ్ట్ విశ్లేషణ",
        marketSectorDNA: "మార్కెట్ సెక్టార్ DNA",
        operationalActions: "కార్యాచరణ చర్యలు",
        budgetTitle: "యూనియన్ బడ్జెట్ 2026: డిజిటల్ R&D మరియు మౌలిక సదుపాయాల విస్తరణపై దృష్టి",
        enterYourName: "మీ పేరు నమోదు చేయండి",
        personaIdentity: "ఏజెంట్ గుర్తింపును స్థాపించండి"
      },
      TA: {
        greeting: "வணக்கம், {name}",
        subtitle: "உங்கள் நுண்ணறிவு மையம் இன்றைய எகனாமிக் டைம்ஸ் துடிப்புடன் ஒத்திசைக்கப்பட்டுள்ளது.",
        realtimeAgents: "நிகழ்நேர முகவர்கள் செயலில் உள்ளனர்",
        aiBriefings: "ஏஐ சுருக்கங்கள்",
        forYou: "உங்களுக்காக",
        quickInsights: "நிர்வாக நுண்ணறிவு",
        search: "செய்திகள், நிறுவனங்களைத் தேடுங்கள்...",
        home: "முகப்பு",
        adminMonitor: "நிர்வாக கண்காணிப்பு",
        enterYourName: "உங்கள் பெயரை உள்ளிடவும்",
        personaIdentity: "முகவர் அடையாளத்தை நிறுவுங்கள்"
      }
    };
    return map[languageCode] || null;
  },

  // Translate feed content
  translateFeed: async (feedData, languageCode) => {
    if (languageCode === 'EN') return feedData;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    const translatedFeed = JSON.parse(JSON.stringify(feedData));
    
    const contentDict = {
      HI: {
        "What is exactly the 'Union Budget'?": "'केंद्रीय बजट' वास्तव में क्या है?",
        "AI breaks down the 120-page document into 5 simple concepts.": "AI 120-पृष्ठ के दस्तावेज़ को 5 सरल अवधारणाओं में विभाजित करता है।",
        "Deep Dive: Your Economy focus": "गहन विश्लेषण: आपका अर्थव्यवस्था फोकस",
        "Based on your recent reading, here is an AI-curated deep dive into this sector.": "आपकी हालिया रीडिंग के आधार पर, इस क्षेत्र में एआई-क्यूरेटेड गहन विश्लेषण यहां दिया गया है।",
        "AI Breakthrough in 2026": "2026 में एआई की बड़ी सफलता",
        "This content is pulled for you from Supabase....": "यह सामग्री आपके लिए सुपाबेस से ली गई है....",
        "VC Funding Trends": "वीसी फंडिंग रुझान",
        "Startups are booming based on your previous history....": "आपके पिछले इतिहास के आधार पर स्टार्टअप फल-फूल रहे हैं....",
        "Google opens applications for APM cohort 2027.": "गूगल ने APM बैच 2027 के लिए आवेदन खोले हैं।",
        "CAT 2026 registration window closes in 5 days.": "CAT 2026 पंजीकरण विंडो 5 दिनों में बंद हो जाएगी।",
        "Data Science vs AI Engineering": "डेटा साइंस बनाम एआई इंजीनियरिंग",
        "Which path holds more job security in 2026?": "2026 में किस मार्ग में अधिक नौकरी सुरक्षा है?",
        "How does the stock market work?": "शेयर बाजार कैसे काम करता है?",
        "A visual guide to understanding NIFTY and SENSEX.": "निफ्टी और सेंसेक्स को समझने के लिए एक दृश्य मार्गदर्शिका।"
      },
      TE: {
        "What is exactly the 'Union Budget'?": "'కేంద్ర బడ్జెట్' అంటే ఏమిటి?",
        "AI breaks down the 120-page document into 5 simple concepts.": "AI 120-పేజీల పత్రాన్ని 5 సాధారణ అంశాలుగా విభజించింది.",
        "Deep Dive: Your Economy focus": "లోతైన పరిశీలన: మీ ఆర్థిక దృష్టి",
        "Based on your recent reading, here is an AI-curated deep dive into this sector.": "మీ ఇటీవలి పఠనం ఆధారంగా, ఈ రంగంపై ఎంపిక చేసిన ఎఐ సమాచారం ఇక్కడ ఉంది.",
        "AI Breakthrough in 2026": "2026లో AI పురోగతి",
        "This content is pulled for you from Supabase....": "ఈ సమాచారం మీ కోసం సుపాబేస్ నుండి తీసుకోబడింది....",
        "VC Funding Trends": "VC నిధుల పోకడలు",
        "Startups are booming based on your previous history....": "మీ మునుపటి చరిత్ర ఆధారంగా స్టార్టప్‌లు అభివృద్ధి చెందుతున్నాయి....",
        "Google opens applications for APM cohort 2027.": "APM 2027 కోసం Google దరఖాస్తులను తెరిచింది.",
        "Data Science vs AI Engineering": "డేటా సైన్స్ vs AI ఇంజనీరింగ్"
      }
    };

    const dict = contentDict[languageCode];
    if (!dict) return translatedFeed;

    const translateText = (text) => dict[text] || text;

    translatedFeed.briefings.forEach(b => {
      b.title = translateText(b.title);
      b.summary = translateText(b.summary);
    });
    translatedFeed.foryou.forEach(b => {
      b.title = translateText(b.title);
      b.summary = translateText(b.summary);
    });
    translatedFeed.insights.forEach(i => {
      i.text = translateText(i.text);
    });

    return translatedFeed;
  }
};
