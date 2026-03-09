export type Persona = 'chatgpt' | 'copilot' | 'gemini' | 'claude';

export interface Option {
  id: string;
  labelEn: string;
  labelTh: string;
  persona: Persona;
}

export interface Question {
  id: number;
  questionEn: string;
  questionTh: string;
  options: Option[];
}

export interface Result {
  id: string;
  name: string;
  titleEn: string;
  titleTh: string;
  descriptionEn: string;
  descriptionTh: string;
  topSkill: string;
  bestTool: string;
  persona: Persona;
  icon: string;
}
