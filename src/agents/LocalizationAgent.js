export const LocalizationAgent = {
  // Translate UI strings
  translatePage: async (languageCode) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    const map = {
      HI: {
        greeting: "नमस्ते, नूसरथ",
        subtitle: "यहाँ आपके लिए व्यक्तिगत समाचार बुद्धिमत्ता है।",
        aiBriefings: "एआई संक्षिप्त जानकारी",
        forYou: "आपके लिए",
        quickInsights: "त्वरित अंतर्दृष्टि",
        marketAlert: "बाज़ार चेतावनी",
        opportunity: "अवसर",
        trendAlert: "प्रवृत्ति चेतावनी",
        search: "समाचार, कंपनियाँ, अर्थव्यवस्था खोजें...",
        // Insights headers
        'InternshipAlert': 'इंटर्नशिप अलर्ट',
        'ConceptTip': 'अवधारणा टिप',
        'Deadline': 'अंतिम तिथि',
        'PortfolioWarning': 'पोर्टफोलियो चेतावनी',
        'RebalanceSuggestion': 'पुनर्संतुलन सुझाव',
        'UpcomingEvent': 'आगामी कार्यक्रम',
        'CompetitorMove': 'प्रतिस्पर्धी कदम',
        'GrantOpportunity': 'अनुदान अवसर',
        'IndustryTrend': 'उद्योग प्रवृत्ति'
      },
      TA: {
        greeting: "வணக்கம், நுஸ்ரத்",
        subtitle: "இங்கே உங்கள் தனிப்பயனாக்கப்பட்ட செய்தி நுண்ணறிவு.",
        aiBriefings: "ஏஐ சுருக்கங்கள்",
        forYou: "உங்களுக்காக",
        quickInsights: "விரைவான நுண்ணறிவு",
        marketAlert: "சந்தை எச்சரிக்கை",
        opportunity: "வாய்ப்பு",
        trendAlert: "போக்கின் எச்சரிக்கை",
        search: "செய்திகள், நிறுவனங்கள் தேடுங்கள்...",
        'InternshipAlert': 'பயிற்சி எச்சரிக்கை',
        'ConceptTip': 'கருத்து குறிப்பு',
        'Deadline': 'கடைசி தேதி',
        'PortfolioWarning': 'போர்ட்ஃபோலியோ எச்சரிக்கை',
        'RebalanceSuggestion': 'மறுசீரமைப்பு பரிந்துரை',
        'UpcomingEvent': 'எதிர்வரும் நிகழ்வு',
        'CompetitorMove': 'போட்டியாளர் நகர்வு',
        'GrantOpportunity': 'மானிய வாய்ப்பு',
        'IndustryTrend': 'தொழில்துறை போக்கு'
      },
      TE: {
        greeting: "నమస్కారం, నుస్రత్",
        subtitle: "మీ వ్యక్తిగతీకరించిన వార్తా మేధస్సు ఇక్కడ ఉంది.",
        aiBriefings: "ఏఐ సంక్షిప్తాలు",
        forYou: "మీ కోసం",
        quickInsights: "త్వరిత అంతర్దృష్టులు",
        marketAlert: "మార్కెట్ హెచ్చరిక",
        opportunity: "అవకాశం",
        trendAlert: "ట్రెండ్ హెచ్చరిక",
        search: "వార్తలు, కంపెనీలు శోధించండి...",
        'InternshipAlert': 'ఇంటర్న్‌షిప్ హెచ్చరిక',
        'ConceptTip': 'కాన్సెప్ట్ చిట్కా',
        'Deadline': 'గడువు',
        'PortfolioWarning': 'పోర్ట్‌ఫోలియో హెచ్చరిక',
        'RebalanceSuggestion': 'రీబ్యాలెన్స్ సూచన',
        'UpcomingEvent': 'రాబోయే ఈవెంట్',
        'CompetitorMove': 'పోటీదారు కదలిక',
        'GrantOpportunity': 'గ్రాంట్ అవకాశం',
        'IndustryTrend': 'పరిశ్రమ ట్రెండ్'
      },
      BN: {
        greeting: "নমস্কার, নুসরাথ",
        subtitle: "এখানে আপনার ব্যক্তিগতকৃত সংবাদ বুদ্ধিমত্তা।",
        aiBriefings: "এআই ব্রিফিং",
        forYou: "আপনার জন্য",
        quickInsights: "দ্রুত অন্তর্দৃষ্টি",
        marketAlert: "বাজার সতর্কতা",
        opportunity: "সুযোগ",
        trendAlert: "ট্রেন্ড সতর্কতা",
        search: "খবর, কোম্পানি খুঁজুন...",
        'InternshipAlert': 'ইন্টার্নশিপ সতর্কতা',
        'ConceptTip': 'ধারণা টিপ',
        'Deadline': 'শেষ তারিখ',
        'PortfolioWarning': 'পোর্টফোলিও সতর্কতা',
        'RebalanceSuggestion': 'রিব্যালেন্স পরামর্শ',
        'UpcomingEvent': 'আসন্ন ইভেন্ট',
        'CompetitorMove': 'প্রতযোগী পদক্ষেপ',
        'GrantOpportunity': 'অনুদান সুযোগ',
        'IndustryTrend': 'শিল্প প্রবণতা'
      }
    };
    return map[languageCode] || null;
  },

  // Translate feed content (Mock)
  translateFeed: async (feedData, languageCode) => {
    if (languageCode === 'EN') return feedData;
    
    await new Promise(resolve => setTimeout(resolve, 500));

    // Deep clone to avoid mutating original
    const translatedFeed = JSON.parse(JSON.stringify(feedData));
    
    // Hardcoded mock dictionaries for demonstration
    const contentDict = {
      HI: {
        "What is exactly the 'Union Budget'?": "'केंद्रीय बजट' वास्तव में क्या है?",
        "AI breaks down the 120-page document into 5 simple concepts.": "AI 120-पृष्ठ के दस्तावेज़ को 5 सरल अवधारणाओं में विभाजित करता है।",
        "Data Science vs AI Engineering": "डेटा साइंस बनाम एआई इंजीनियरिंग",
        "Which path holds more job security in 2026?": "2026 में किस मार्ग में अधिक नौकरी सुरक्षा है?",
        "How does the stock market work?": "शेयर बाजार कैसे काम करता है?",
        "A visual guide to understanding NIFTY and SENSEX.": "निफ्टी और सेंसेक्स को समझने के लिए एक दृश्य मार्गदर्शिका।",
        "How a 22-year-old raised $1M": "एक 22 वर्षीय व्यक्ति ने $1M कैसे जुटाए",
        "The story of building an AI scheduling tool in college.": "कॉलेज में एआई शेड्यूलिंग टूल बनाने की कहानी।",
        "Why are things getting expensive?": "चीजें महंगी क्यों हो रही हैं?",
        "Understanding inflation with practical everyday examples.": "व्यावहारिक रोजमर्रा के उदाहरणों के साथ मुद्रास्फीति को समझना।",
        "Top interview questions for FinTech": "फिनटेक के लिए शीर्ष साक्षात्कार प्रश्न",
        "Analyzed from 500+ recent graduate interviews.": "500 से अधिक हालिया स्नातक साक्षात्कारों से विश्लेषण किया गया।",
        "RBI cuts repo rate (Explained)": "आरबीआई ने रेपो दर में कटौती की (व्याख्या)",
        "What it means for your college loan EMI.": "आपके कॉलेज ऋण ईएमआई के लिए इसका क्या अर्थ है।",
        "Google opens applications for APM cohort 2027.": "Google ने APM कोहोर्ट 2027 के लिए आवेदन खोले हैं।",
        "Bull Market = Prices go up. Bear Market = Prices go down.": "बुल मार्केट = कीमतें ऊपर जाती हैं। बियर मार्केट = कीमतें नीचे जाती हैं।",
        "CAT 2026 registration window closes in 5 days.": "CAT 2026 पंजीकरण विंडो 5 दिनों में बंद हो जाएगी।"
      },
      TA: {
        "What is exactly the 'Union Budget'?": "'பட்ஜெட்' என்பது சரியாக என்ன?",
        "AI breaks down the 120-page document into 5 simple concepts.": "120 பக்க ஆவணத்தை 5 எளிய கருத்துகளாக AI பிரிக்கிறது.",
        "Data Science vs AI Engineering": "தரவு அறிவியல் vs AI பொறியியல்",
        "How does the stock market work?": "பங்கு சந்தை எவ்வாறு செயல்படுகிறது?",
        "Google opens applications for APM cohort 2027.": "APM 2027 க்கான заяவ்களை Google திறக்கிறது."
      }
    };

    const dict = contentDict[languageCode];
    if (!dict) {
      // If language not fully mapped, just append language code as a mock
      const mapOrPrefix = (str) => dict?.[str] || `[${languageCode}] ` + str;
      
      translatedFeed.briefings.forEach(b => {
        b.title = mapOrPrefix(b.title); b.summary = mapOrPrefix(b.summary);
      });
      translatedFeed.foryou.forEach(b => {
        b.title = mapOrPrefix(b.title); b.summary = mapOrPrefix(b.summary);
      });
      translatedFeed.insights.forEach(i => {
        i.text = mapOrPrefix(i.text);
      });
      return translatedFeed;
    }

    // Replace exactly if in dictionary
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
