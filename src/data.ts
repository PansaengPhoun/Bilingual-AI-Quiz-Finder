import { Question, Result, Persona } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    questionEn: "What best describes your work style?",
    questionTh: "สไตล์การทำงานของคุณเป็นแบบไหน?",
    options: [
      { id: 'A', labelEn: "Creative thinker", labelTh: "ชอบคิดไอเดีย", persona: 'chatgpt' },
      { id: 'B', labelEn: "Productivity focused", labelTh: "เน้นทำงานให้เร็ว", persona: 'copilot' },
      { id: 'C', labelEn: "Research explorer", labelTh: "ชอบค้นคว้าข้อมูล", persona: 'gemini' },
      { id: 'D', labelEn: "Analytical thinker", labelTh: "ชอบวิเคราะห์ลึก", persona: 'claude' },
    ]
  },
  {
    id: 2,
    questionEn: "If AI could help you with one thing, what would it be?",
    questionTh: "ถ้า AI ช่วยงานคุณได้หนึ่งอย่าง คุณอยากให้ช่วยอะไร?",
    options: [
      { id: 'A', labelEn: "Writing ideas", labelTh: "ช่วยคิดและเขียน", persona: 'chatgpt' },
      { id: 'B', labelEn: "Automating tasks", labelTh: "ทำงานให้เร็วขึ้น", persona: 'copilot' },
      { id: 'C', labelEn: "Searching information", labelTh: "ค้นหาข้อมูล", persona: 'gemini' },
      { id: 'D', labelEn: "Analyzing complex topics", labelTh: "วิเคราะห์ข้อมูล", persona: 'claude' },
    ]
  },
  {
    id: 3,
    questionEn: "What do you usually use AI for?",
    questionTh: "คุณใช้ AI กับอะไรบ่อยที่สุด?",
    options: [
      { id: 'A', labelEn: "Brainstorming", labelTh: "ระดมความคิด", persona: 'chatgpt' },
      { id: 'B', labelEn: "Productivity", labelTh: "เพิ่มประสิทธิภาพงาน", persona: 'copilot' },
      { id: 'C', labelEn: "Learning", labelTh: "เรียนรู้สิ่งใหม่", persona: 'gemini' },
      { id: 'D', labelEn: "Analysis", labelTh: "วิเคราะห์ข้อมูล", persona: 'claude' },
    ]
  },
  {
    id: 4,
    questionEn: "When solving problems, what do you do first?",
    questionTh: "เมื่อเจอปัญหา คุณทำอย่างไรเป็นอันดับแรก?",
    options: [
      { id: 'A', labelEn: "Generate ideas", labelTh: "คิดไอเดีย", persona: 'chatgpt' },
      { id: 'B', labelEn: "Find a quick solution", labelTh: "หา solution เร็ว", persona: 'copilot' },
      { id: 'C', labelEn: "Research information", labelTh: "หาข้อมูลเพิ่ม", persona: 'gemini' },
      { id: 'D', labelEn: "Analyze root causes", labelTh: "วิเคราะห์สาเหตุ", persona: 'claude' },
    ]
  },
  {
    id: 5,
    questionEn: "Your ideal AI assistant would be:",
    questionTh: "AI แบบไหนที่คุณอยากได้?",
    options: [
      { id: 'A', labelEn: "Creative partner", labelTh: "เพื่อนคิดไอเดีย", persona: 'chatgpt' },
      { id: 'B', labelEn: "Work assistant", labelTh: "ผู้ช่วยทำงาน", persona: 'copilot' },
      { id: 'C', labelEn: "Research helper", labelTh: "ผู้ช่วยค้นคว้า", persona: 'gemini' },
      { id: 'D', labelEn: "Thinking partner", labelTh: "ผู้ช่วยคิดวิเคราะห์", persona: 'claude' },
    ]
  },
  {
    id: 6,
    questionEn: "Which task do you do most often?",
    questionTh: "งานที่คุณทำบ่อยที่สุดคืออะไร?",
    options: [
      { id: 'A', labelEn: "Writing", labelTh: "เขียนเนื้อหา", persona: 'chatgpt' },
      { id: 'B', labelEn: "Task management", labelTh: "จัดการงาน", persona: 'copilot' },
      { id: 'C', labelEn: "Research", labelTh: "ค้นคว้า", persona: 'gemini' },
      { id: 'D', labelEn: "Strategy", labelTh: "วางกลยุทธ์", persona: 'claude' },
    ]
  },
  {
    id: 7,
    questionEn: "What matters most in your workflow?",
    questionTh: "อะไรสำคัญที่สุดในการทำงานของคุณ?",
    options: [
      { id: 'A', labelEn: "Creativity", labelTh: "ความคิดสร้างสรรค์", persona: 'chatgpt' },
      { id: 'B', labelEn: "Efficiency", labelTh: "ประสิทธิภาพ", persona: 'copilot' },
      { id: 'C', labelEn: "Knowledge", labelTh: "ความรู้", persona: 'gemini' },
      { id: 'D', labelEn: "Insight", labelTh: "การวิเคราะห์", persona: 'claude' },
    ]
  },
  {
    id: 8,
    questionEn: "If AI were a colleague, its role would be:",
    questionTh: "ถ้า AI เป็นเพื่อนร่วมงาน จะเป็นแบบไหน?",
    options: [
      { id: 'A', labelEn: "Creative designer", labelTh: "นักคิดสร้างสรรค์", persona: 'chatgpt' },
      { id: 'B', labelEn: "Productivity assistant", labelTh: "ผู้ช่วยทำงาน", persona: 'copilot' },
      { id: 'C', labelEn: "Research specialist", labelTh: "นักค้นคว้า", persona: 'gemini' },
      { id: 'D', labelEn: "Strategic analyst", labelTh: "นักวิเคราะห์", persona: 'claude' },
    ]
  },
  {
    id: 9,
    questionEn: "How do you prefer learning new things?",
    questionTh: "คุณชอบเรียนรู้สิ่งใหม่แบบไหน?",
    options: [
      { id: 'A', labelEn: "Discuss ideas", labelTh: "คุยแลกเปลี่ยน", persona: 'chatgpt' },
      { id: 'B', labelEn: "Try tools immediately", labelTh: "ทดลองใช้เลย", persona: 'copilot' },
      { id: 'C', labelEn: "Research online", labelTh: "หาข้อมูลออนไลน์", persona: 'gemini' },
      { id: 'D', labelEn: "Study deeply", labelTh: "ศึกษาเชิงลึก", persona: 'claude' },
    ]
  },
  {
    id: 10,
    questionEn: "What do you expect most from AI?",
    questionTh: "คุณคาดหวังอะไรจาก AI มากที่สุด?",
    options: [
      { id: 'A', labelEn: "Inspiration", labelTh: "แรงบันดาลใจ", persona: 'chatgpt' },
      { id: 'B', labelEn: "Speed", labelTh: "ความเร็ว", persona: 'copilot' },
      { id: 'C', labelEn: "Information", labelTh: "ข้อมูล", persona: 'gemini' },
      { id: 'D', labelEn: "Understanding", labelTh: "ความเข้าใจเชิงลึก", persona: 'claude' },
    ]
  }
];

export const RESULTS: Record<Persona, Result> = {
  chatgpt: {
    id: 'chatgpt',
    name: 'ChatGPT',
    titleEn: 'Idea Generator',
    titleTh: 'ผู้ช่วยคิดไอเดีย',
    descriptionEn: 'Best for brainstorming, writing, and creativity.',
    descriptionTh: 'เหมาะสำหรับการคิดไอเดีย การเขียน และความคิดสร้างสรรค์',
    topSkill: 'Creativity',
    bestTool: 'GPT-4o',
    persona: 'chatgpt',
    icon: 'sparkles'
  },
  copilot: {
    id: 'copilot',
    name: 'Copilot',
    titleEn: 'Productivity Hacker',
    titleTh: 'ผู้ช่วยเพิ่มประสิทธิภาพการทำงาน',
    descriptionEn: 'Best for automating tasks and working efficiently with Microsoft tools.',
    descriptionTh: 'เหมาะสำหรับการทำงานให้เร็วขึ้นและใช้เครื่องมือ Microsoft อย่างมีประสิทธิภาพ',
    topSkill: 'Efficiency',
    bestTool: 'Microsoft 365',
    persona: 'copilot',
    icon: 'zap'
  },
  gemini: {
    id: 'gemini',
    name: 'Gemini',
    titleEn: 'Research Explorer',
    titleTh: 'ผู้ช่วยค้นคว้าข้อมูล',
    descriptionEn: 'Best for searching information and discovering knowledge.',
    descriptionTh: 'เหมาะสำหรับการค้นคว้าข้อมูลและเรียนรู้สิ่งใหม่',
    topSkill: 'Research',
    bestTool: 'Google Search Integration',
    persona: 'gemini',
    icon: 'search'
  },
  claude: {
    id: 'claude',
    name: 'Claude',
    titleEn: 'Deep Thinker',
    titleTh: 'ผู้ช่วยวิเคราะห์เชิงลึก',
    descriptionEn: 'Best for analysis, reasoning, and structured thinking.',
    descriptionTh: 'เหมาะสำหรับการวิเคราะห์เชิงลึกและการคิดอย่างเป็นระบบ',
    topSkill: 'Reasoning',
    bestTool: 'Claude 3.5 Sonnet',
    persona: 'claude',
    icon: 'brain'
  }
};
