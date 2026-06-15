/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Github, 
  Mail, 
  ExternalLink, 
  Moon, 
  Sun, 
  Code2, 
  Database, 
  PieChart, 
  BookOpen, 
  Award, 
  Briefcase,
  ChevronRight,
  User,
  GraduationCap,
  Terminal,
  BarChart3,
  Phone,
  Copy,
  Check,
  Stethoscope,
  Cpu,
  Globe,
  MessageSquare,
  Link as LinkIcon,
  PlusCircle,
  Wrench,
  AlertCircle,
  Send,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---
interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  strategy: string;
  tags: string[];
  eda: string[];
  features: string[];
  githubUrl: string;
  imageUrl: string;
  troubleshooting?: {
    issue: string;
    trial: string;
    result: string;
  };
}

interface Skill {
  category: string;
  description: string;
  tags: string[];
  items: string[];
  icon: React.ReactNode;
}

interface Education {
  title: string;
  period: string;
  institution: string;
  description?: string;
}

interface Philosophy {
  num: string;
  title: string;
  highlight: string;
  description: string;
}

// --- Data ---
const SKILLS: Skill[] = [
  {
    category: "AI & Medical Modeling",
    description: "생체 신호 및 의료 이미지 분석을 위한 특화 머신러닝/딥러닝 모델 설계",
    tags: ["PyTorch", "TensorFlow", "Scikit-Learn", "CNN/GAN", "Vision"],
    items: [
      "의료용 컴퓨터 비전(CNN, Image Segmentation, GAN) 모델 개발 및 학습",
      "복잡한 생체 시차 신호 필터링 및 질환 위험도 실시간 추론 추상화",
      "임상 데이터의 특성을 수집 및 적응 연구하여 가벼운 경량 모델 구축"
    ],
    icon: <Stethoscope className="w-5 h-5 text-emerald-500" />,
  },
  {
    category: "Data Engineering & Analysis",
    description: "바이오 정보 및 공공 헬스케어 데이터 가공과 효율적인 탐색(EDA)",
    tags: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Crawling", "ADsP"],
    items: [
      "건강검진 원천 빅데이터 로직 설계 및 타겟 도메인 Feature Engineering",
      "정제되지 않은 의료 및 기초 바이오 자료의 유의한 결측처리 정합성 확보",
      "예측 성능 고도화를 위한 변수 로그 분석 및 EDA 기반 지향 모델링"
    ],
    icon: <Database className="w-5 h-5 text-emerald-500" />,
  },
  {
    category: "MLOps & Cloud Infrastructure",
    description: "서버 일관성을 지원하는 모델 생애주기 관리 및 컨테이너 가상화",
    tags: ["Docker", "Linux CLI", "Model Serving", "GPU Server Setup"],
    items: [
      "Docker 컨테이너화를 통해 다양한 서버 로컬 환경 호환성 완벽 수립",
      "추론 지연(Latency) 단축을 고려한 모델 가중치 및 분 단위 배치 가공 경량화",
      "프로덕션 서버 호스팅 및 모델 자원 사용량 최적화와 모니터링 수립"
    ],
    icon: <Cpu className="w-5 h-5 text-emerald-500" />,
  },
  {
    category: "Full-stack Web Serving",
    description: "학습된 모델 서빙 고성능 API 엔드포인트 설계 및 웹 서비스 배포",
    tags: ["FastAPI", "C# / .NET", "Node.js", "React SPA", "SQL / DBMS", "SQLD"],
    items: [
      "FastAPI와 Node.js 백엔드 프레임워크를 활용한 고성능 연동 포트 폴링 구축",
      "KOSTA 정규 풀스택 수료 기반의 SPA 프론트엔드 반응형 개발 협업 배포",
      "데이터 수집 및 적재 효율을 최적화하기 위한 정규 DBMS 설계와 SQL 튜닝"
    ],
    icon: <Globe className="w-5 h-5 text-emerald-500" />,
  },
];

const PROJECTS: Project[] = [
  {
    id: "smoking-analysis-1",
    title: "흡연 여부 판별 모델 v1",
    subtitle: "전국 건강검진 데이터 분석",
    period: "2026.01",
    description: "국가 건강검진 데이터를 활용하여 흡연 유무를 예측하는 분류 모델을 구축하고 주요 지표를 분석했습니다.",
    strategy: "바이오 전공지식을 활용해 건강 지표들을 가공하고 유의미한 변수들을 발굴(Feature Engineering)하여 예측 성능을 개선했습니다.",
    tags: ["Healthcare AI", "Classification", "EDA"],
    eda: [
        "헤모글로빈 농도 로그 변환",
        "비만 집단별 흡연 영향도 분석"
    ],
    features: [
        "Hemoglobin_Ratio (중요도 1위)",
        "Metabolism_Index (대사 위험도)"
    ],
    githubUrl: "https://github.com/kmh8405/mini-project_smoking-analysis",
    imageUrl: "https://picsum.photos/seed/healthcare-1/1200/600",
    troubleshooting: {
      issue: "NCAA 크롤링 중 403 Forbidden 에러 발생",
      trial: "time.sleep() 부여 및 User-Agent 무작위 변경",
      result: "차단 없이 10,000건 데이터 수집 성공 (수집 효율 200% 향상)"
    }
  },
  {
    id: "smoking-analysis-2",
    title: "심혈관 질환 예측 서비스",
    subtitle: "생체 시그널 실시간 모니터링",
    period: "2025.12",
    description: "생체 데이터를 수집하여 심혈관 질환 위험도를 실시간으로 추론하는 파이프라인입니다.",
    strategy: "실시간 연동을 위해 생체 신호 데이터의 노이즈를 정제해내고, 분 단위 임베딩 기법을 연구하여 모델의 안정성을 제고했습니다.",
    tags: ["MLOps", "Real-time AI", "Optimization"],
    eda: [
        "시계열 데이터의 노이즈 제거",
        "특이값 탐지 알고리즘 적용"
    ],
    features: [
        "HeartRate_Variability",
        "Signal_Entropy_Score"
    ],
    githubUrl: "https://github.com/kmh8405",
    imageUrl: "https://picsum.photos/seed/healthcare-2/1200/600",
    troubleshooting: {
      issue: "추론 서버의 잦은 메모리 누수 발생",
      trial: "Docker 컨테이너 리소스 제한(Limit) 설정 및 배치 단위 추론 변경",
      result: "메모리 점유율 40% 감소 및 서버 안정성 99.9% 확보"
    }
  },
  {
    id: "smoking-analysis-3",
    title: "의료 영상 판독 보조 모델",
    subtitle: "Chest X-ray 이상 징후 탐지",
    period: "2025.10",
    description: "흉부 X-ray 영상에서 주요 병변을 자동으로 감지하고 분할(Segmentation)하는 모델을 개발했습니다.",
    strategy: "의료 데이터 특유의 심각한 클래스 불균형 문제를 해소하기 위해 타겟 이미지 어그멘테이션 기법을 정적/동적으로 적용했습니다.",
    tags: ["Computer Vision", "GAN", "Medical Imaging"],
    eda: [
        "이미지 밝기/대조 정규화",
        "클래스 불균형 해소 전략"
    ],
    features: [
        "Bony_Suppression_Filter",
        "Region_Attention_Map"
    ],
    githubUrl: "https://github.com/kmh8405",
    imageUrl: "https://picsum.photos/seed/healthcare-3/1200/600",
    troubleshooting: {
      issue: "Segmentation 경계면 모호함으로 인한 낮은 IoU",
      trial: "Fine-grained Attention 모듈 추가 및 Dice Loss 함수 가중치 조정",
      result: "IoU 성능 15% 향상 및 임상의 피드백 긍정적 지표 확인"
    }
  },
  {
    id: "prescription-guide-system",
    title: "진료 기록 기반 복약·생활 가이드 자동 생성 시스템",
    subtitle: "처방전 OCR → 약물 분석 → AI 가이드 생성",
    period: "2026.04 - 진행중",
    description: "처방전·약봉투 파일을 업로드하면 Clova OCR로 텍스트를 추출하고, GPT로 약물 목록과 질병 코드를 파싱해 내부 약물 DB와 매칭합니다. DB에 없는 약물은 경고 표시로 사용자에게 확인을 유도하며, 가이드 생성 버튼 클릭 시 복약·운동·식사·생활 습관 가이드를 자동으로 생성합니다.",
    strategy: "Clova OCR → GPT 파싱 → 약물 DB 매칭으로 이어지는 처리 파이프라인을 설계하고, 사용자의 건강 정보와 약물 데이터를 조합한 개인화 가이드 생성 로직과 후속 질문을 위한 RAG 기반 챗봇을 구현했습니다.",
    tags: ["RAG Pipeline", "Clova OCR", "LLM Serving"],
    eda: [
        "처방전·약봉투 OCR 추출 정확도 분석 및 파싱 실패 케이스 분류",
        "약물 DB 매칭률 검증 및 미등록 약물 패턴 탐색"
    ],
    features: [
        "Clova OCR + GPT 파이프라인 (약물명·질병코드 자동 추출)",
        "DB 미매칭 약물 경고 알림 + 개인화 복약 가이드 생성"
    ],
    githubUrl: "https://github.com/kmh8405",
    imageUrl: "https://picsum.photos/seed/healthcare-4/1200/600",
    troubleshooting: {
      issue: "OCR 인식 오류로 인한 약물명 파싱 실패 및 DB 매칭률 저하",
      trial: "GPT 프롬프트에 약물명 정규화 지침 추가 및 유사도 기반 퍼지 매칭 알고리즘 보완",
      result: "약물 DB 매칭률 73% → 91%로 향상, 미등록 약물 경고 UX 안정화"
    }
  }
];

const EDUCATION: Education[] = [
  {
    title: "AI 헬스케어 초격차 캠프 (수료 예정)",
    period: "2025.12 - 2026.06",
    institution: "오즈코딩스쿨",
    description: "생체 신호 및 의료 이미지를 처리하기 위한 특화 딥러닝 모델링 및 실무용 MLOps 파이프라인 구축 과정을 이수하고 있습니다.",
  },
  {
    title: "Javascript 기반 풀스택 양성 과정 (모범상 수상)",
    period: "2025.02 - 2025.07",
    institution: "KOSTA (한국소프트웨어산업협회)",
    description: "데이터의 흐름을 효율적으로 다룰 수 있도록 백엔드 아키텍처와 웹 서버 지식을 습득하고 우수한 주도성으로 모범상을 수상했습니다.",
  },
  {
    title: "Molecular & Cell Biology 학사",
    period: "2017.08 - 2024.08",
    institution: "University of California, Merced",
    description: "분자생물학 및 기초 통계를 체계적으로 이수하며, 복잡한 생명 과학 데이터를 과학적 논리로 접근하는 법을 배웠습니다.",
  }
];

const CERTIFICATIONS = {
  current: [
    { title: "ADsP (데이터분석 준전문가)", date: "2023.11", issuer: "한국데이터산업진흥원" },
    { title: "SQLD (SQL 개발자)", date: "2023.09", issuer: "한국데이터산업진흥원" },
  ],
  expected: [
    { title: "AICE Associate", date: "2026.08 (예정)", issuer: "KT/한국경제" },
    { title: "빅데이터분석기사", date: "필기 2026.09.05 · 실기 2026.11.28 (예정)", issuer: "한국데이터산업진흥원" },
  ]
};

const PHILOSOPHIES: Philosophy[] = [
  {
    num: "01",
    title: "다양한 프레임워크와 언어 간 연동 및 통합 능력",
    highlight: "Multi-Stack Synergy",
    description: "AI 모델, 백엔드 서버, 데이터 파이프라인 등 서로 다른 기술 스택과 언어를 하나의 안정적이고 조화로운 흐름으로 연결하고 배포하는 종합적이고 입체적인 설계 감각을 지향합니다."
  },
  {
    num: "02",
    title: "명확한 컨텍스트 세팅으로 AI 출력을 제어하는 능력",
    highlight: "AI Alignment & Prompting",
    description: "작업을 시작하기 전, 정확한 참고 문서와 엄격한 제약 조건을 미리 규합하고 설정하여 AI 에이전트의 출력을 정밀 교정합니다. 초반에 방향을 견고히 조정해 후반부 재작업 손실을 극소화합니다."
  },
  {
    num: "03",
    title: "요구사항·산출물 전반에서 예리하게 예외를 짚어내는 검토 능력",
    highlight: "Meticulous Requirements Check",
    description: "명시적인 규정이나 한계 조건이 세워지지 않은 모호한 프로젝트 흐름 속에서도 흐름상의 빈틈, 예외적인 에러, 누락된 입력값 명세를 미리 포착해내어 안정성을 크게 증대시킵니다."
  },
  {
    num: "04",
    title: "구현 후 기능 동작을 끝까지 책임지고 문서화하는 꼼꼼함",
    highlight: "Validation & Complete Manuals",
    description: "컨트롤러와 데이터의 수동적인 송수신 성공에 머무르지 않고, 엔드투엔드로 실제 연동 모델과 프론트 UI의 상호작용이 완결성을 지녔는지 끝까지 검증합니다. 팀 전체가 오차 없는 context에서 교류하게 매뉴얼을 수립합니다."
  },
  {
    num: "05",
    title: "자기 주관을 논리적 근거와 함께 명확히 표현하는 능력",
    highlight: "Logic-Based Collaboration",
    description: "회의나 설계, 여러 기술적 대안 조율 과정에서 다차원적이고 합리적인 근거를 명료하게 서술해 협의를 견인합니다. 오해 비용을 축소하고 협업의 단계를 논리적으로 정돈합니다."
  }
];

// --- Components ---

const Reveal = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const TypewriterHero = () => {
  const mainText = "Solving Bio-Problems with Code and Data";
  const keywords = [
    "Fast-Learning Full-stack Junior",
    "Persistent Problem Solver",
    "Bio-AI Synergy Catalyst"
  ];
  
  const [displayText, setDisplayText] = useState("");
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [isMainDone, setIsMainDone] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Main Slogan Typewriter
  useEffect(() => {
    if (displayText.length < mainText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(mainText.slice(0, displayText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setIsMainDone(true);
    }
  }, [displayText]);

  // Keyword Rotating Typewriter
  useEffect(() => {
    if (!isMainDone) return;

    const fullText = keywords[keywordIndex];
    const delay = isDeleting ? 30 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentKeyword === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentKeyword === "") {
        setIsDeleting(false);
        setKeywordIndex((prev) => (prev + 1) % keywords.length);
      } else {
        const nextChar = isDeleting 
          ? fullText.slice(0, currentKeyword.length - 1)
          : fullText.slice(0, currentKeyword.length + 1);
        setCurrentKeyword(nextChar);
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [currentKeyword, isDeleting, keywordIndex, isMainDone]);

  return (
    <div className="space-y-6">
      <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white leading-[1] tracking-tighter min-h-[4.5rem] md:min-h-[12rem]">
        {displayText}
        {!isMainDone && <span className="animate-pulse">|</span>}
      </h1>
      
      {isMainDone && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-4xl font-bold text-slate-400 dark:text-slate-500 font-serif"
        >
          I am a{" "}
          <span className="text-emerald-500 underline decoration-emerald-500/30 decoration-4 underline-offset-8">
            [{currentKeyword}]
          </span>
          <span className="animate-pulse ml-1 text-emerald-500">|</span>
        </motion.div>
      )}
    </div>
  );
};

const SectionTitle = ({ children, icon: Icon }: { children: React.ReactNode, icon: any }) => (
  <div className="flex items-center gap-4 mb-12">
    <div className="p-3 bg-emerald-500 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white italic font-serif">
      {children}
    </h2>
  </div>
);

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-emerald-500 transition-all group"
    >
      <div className="flex flex-col items-start whitespace-nowrap">
        <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-tighter">{label}</span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{text}</span>
      </div>
      <div className="ml-2 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
      </div>
    </button>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  const [showTroubles, setShowTroubles] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 flex flex-col"
    >
      {/* Project Image */}
      <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-slate-900/80 to-transparent"></div>
        <div className="absolute top-6 right-6">
          <div className="text-emerald-600 dark:text-emerald-400 font-mono text-[10px] bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20 font-black tracking-widest uppercase">
             {project.period}
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 flex-grow flex flex-col">
        <div className="space-y-4">
          <div className="space-y-1">
             <span className="text-emerald-600 dark:text-emerald-400 font-black text-[10px] tracking-[0.2em] uppercase">{project.subtitle}</span>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
               {project.title}
             </h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                {tag}
              </span>
            ))}
          </div>

          <div className="p-5 bg-white/50 dark:bg-slate-800/30 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 text-sm italic font-serif relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 rounded-full" />
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed px-2">
                "{project.strategy}"
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="space-y-4">
             <h4 className="flex items-center gap-2 font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">
               <Database className="w-3 h-3 text-emerald-500" /> EDA & Analytics
             </h4>
             <ul className="space-y-3">
               {project.eda.map((item, i) => (
                 <li key={i} className="flex gap-3 text-xs text-slate-600 dark:text-slate-400 font-bold items-start leading-tight">
                    <Check className="w-3 h-3 text-emerald-500 mt-0.5 shrink-0" />
                    {item}
                 </li>
               ))}
             </ul>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-8 mt-auto flex flex-col gap-4">
          {project.troubleshooting && (
            <div className="space-y-3">
              <button
                onClick={() => setShowTroubles(!showTroubles)}
                aria-expanded={showTroubles}
                className="w-full flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                <Wrench className="w-3 h-3" />
                {showTroubles ? "Hide Solving Log" : "Problem-Solving Log"}
              </button>

              <AnimatePresence>
                {showTroubles && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl border border-emerald-500/20 space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block underline">Issue</span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{project.troubleshooting.issue}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block underline">Trial</span>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{project.troubleshooting.trial}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block underline font-serif">Result</span>
                        <p className="text-xs font-bold text-slate-800 dark:text-emerald-400">{project.troubleshooting.result}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-4 rounded-2xl font-black transition-all hover:bg-emerald-500 dark:hover:bg-emerald-500 hover:text-white dark:hover:text-white shadow-xl hover:-translate-y-1 text-[11px] uppercase tracking-[0.2em]"
          >
            <Github className="w-4 h-4" />
            Repository
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [emailCopied, setEmailCopied] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Fix: Sync dark mode with body class and local component state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) {
             setActiveSection(entry.target.id);
           }
         });
       },
       { threshold: 0.3 }
     );

     document.querySelectorAll("section[id]").forEach((section) => {
       observer.observe(section);
     });

     return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navLinks = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "philosophy", label: "Philosophy" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certs" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-emerald-500/30`}>
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => scrollTo("hero")}
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl italic font-serif">M</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic font-serif group-hover:text-emerald-500 transition-colors">
              Minhyuk
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-tight ${
                  activeSection === link.id
                    ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-110 transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label={isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-24 space-y-32">
        {/* Section: Hero (Main Header) */}
        <section id="hero" className="pt-48 min-h-[60vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Full-stack AI Engineer
            </div>
            
            <TypewriterHero />
            
            <div className="space-y-4 pt-12 border-t border-slate-200/50 dark:border-slate-800/50">
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed font-medium">
                대학에서 배운 바이오 전공 지식을 바탕으로 데이터를 해석하며, <br />
                분석부터 인프라 배포까지 완벽하게 소화해내는 AI 엔지니어 김민혁입니다.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                {["Bio-Domain Knowledge", "Machine Learning", "MLOps & Serving"].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Section: About Me */}
        <Reveal>
          <section id="about" className="scroll-mt-24">
            <SectionTitle icon={User}>About Me</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <div className="relative group perspective-1000">
                <div className="relative aspect-square md:aspect-[4/5] transform -rotate-3 group-hover:rotate-0 transition-transform duration-500 ease-out">
                  <div className="absolute inset-0 bg-emerald-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-800 rounded-[3rem] overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-2xl relative z-10">
                    <img 
                      src="/profile.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <a 
                  href="https://github.com/kmh8405"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-12 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-4 flex items-center justify-center gap-3 shadow-md transform rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                    <Github className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 transition-colors">GitHub 방문하기</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </a>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="p-10 h-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[3rem] border border-white/20 dark:border-slate-800/30 shadow-2xl leading-relaxed text-slate-700 dark:text-slate-400 space-y-8 flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500/20" />
                  <p className="text-3xl text-slate-900 dark:text-slate-100 font-black font-serif italic leading-tight">
                    "바이오 도메인 지식과 데이터 분석 능력을 결합하여, <br className="hidden md:block" /> 실질적인 비즈니스 문제를 해결합니다."
                  </p>
                  <div className="space-y-4">
                    <p>
                      University of California, Merced에서 분자생물학을 공부하며 바이오 분야의 기초 도메인 연구 논리와 지식을 탄탄히 다졌습니다. 이후 KOSTA 풀스택 개발자 과정을 통해 실제 데이터를 서버 환경에 유통하고 주도적으로 다룰 수 있는 엔지니어링 능력을 키웠습니다.
                    </p>
                    <p>
                      현재는 AI 헬스케어 부트캠프에서 임상/생체 데이터를 과학적으로 이해하고 분석함과 동시에, 실제 연동 가능한 머신러닝/딥러닝 연구 모델들을 설계하며 업무 역량을 극대화하고 있습니다.
                    </p>
                  </div>
                  <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-200 dark:border-slate-800">
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">Focused Domain</span>
                        <span className="text-md font-bold text-emerald-600 dark:text-emerald-400">AI Medical Solutions</span>
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">Technical Strength</span>
                        <span className="text-md font-bold text-emerald-600 dark:text-emerald-400">Engineering & Deployment</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Section: Philosophy */}
        <Reveal>
          <section id="philosophy" className="scroll-mt-24">
            <SectionTitle icon={MessageSquare}>Core Work Strengths & Meta-Skills</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {PHILOSOPHIES.map((p) => (
                <div
                  key={p.num}
                  className="p-8 md:p-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-6 text-slate-100 dark:text-slate-900 text-5xl font-black font-serif italic select-none group-hover:text-emerald-500/10 transition-colors duration-300">
                    {p.num}
                  </div>
                  <div className="space-y-6 relative z-10">
                    <div>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-black uppercase tracking-widest bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/10">
                        {p.highlight}
                      </span>
                    </div>
                    <h3 className="font-serif italic font-black text-lg text-slate-900 dark:text-white tracking-tight leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-[13px] font-medium leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Section: Skills */}
        <Reveal>
          <section id="skills" className="scroll-mt-24">
            <SectionTitle icon={BarChart3}>Technical Capability</SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 relative">
              {SKILLS.map((skill) => (
                <div
                  key={skill.category}
                  className="p-8 md:p-10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-300 group shadow-glass flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200/40 dark:border-slate-800 shadow-sm text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                        {skill.icon}
                      </div>
                      <div>
                        <h3 className="font-serif italic font-black text-xl text-slate-900 dark:text-white tracking-tight">{skill.category}</h3>
                        <p className="text-xs text-slate-500 font-bold tracking-tight mt-0.5">{skill.description}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {skill.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-black tracking-wider uppercase px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/10 dark:border-emerald-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-4">
                      {skill.items.map((item, i) => (
                        <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300 text-[13px] font-bold leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] shrink-0 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Section: Education */}
        <Reveal>
          <section id="education" className="scroll-mt-24">
            <SectionTitle icon={GraduationCap}>Education & Journey</SectionTitle>
            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-1/2 -translate-x-1/2 h-full w-[2px] bg-slate-200 dark:bg-slate-800 hidden md:block" />
              
              <div className="space-y-16">
                {EDUCATION.map((edu, idx) => (
                  <motion.div
                    key={edu.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`md:w-1/2 flex ${idx % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      <div className={`max-w-md p-8 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-slate-800/30 shadow-2xl relative ${idx % 2 === 0 ? 'md:mr-4' : 'md:ml-4'}`}>
                        <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-slate-950 rounded-full hidden md:block z-10 ${idx % 2 === 0 ? '-right-[26px]' : '-left-[26px]'}`} />
                        
                        <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full inline-block mb-4">
                          {edu.period}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
                          {edu.title}
                          {edu.title.includes("모범상") && <Award className="w-5 h-5 text-amber-500" />}
                        </h3>
                        <div className="text-slate-500 dark:text-slate-400 font-bold tracking-tight text-xs uppercase mb-4">
                          {edu.institution}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Section: Projects */}
        <Reveal>
          <section id="projects" className="scroll-mt-24">
            <SectionTitle icon={Briefcase}>Core Projects</SectionTitle>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {PROJECTS.map((project) => (
                <div key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Section: Certifications */}
        <Reveal>
          <section id="certifications" className="scroll-mt-24">
            <SectionTitle icon={Award}>Certifications</SectionTitle>
            <div className="space-y-12">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-600 mb-6">Current Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CERTIFICATIONS.current.map((cert) => (
                    <div key={cert.title} className="p-6 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-800/30 flex items-center gap-6 shadow-xl">
                      <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                        <Award className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                        <p className="text-xs text-slate-500 font-bold">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 mb-6 font-bold">Planned & Expected</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {CERTIFICATIONS.expected.map((cert) => (
                    <div key={cert.title} className="p-6 bg-emerald-500/10 dark:bg-emerald-500/20 backdrop-blur-xl rounded-2xl border border-emerald-500/30 flex items-center gap-6 shadow-xl text-emerald-100">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 animate-pulse">
                        <Cpu className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-emerald-700 dark:text-emerald-400">{cert.title}</h4>
                        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 font-black">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Section: Contact */}
        <Reveal>
          <section id="contact" className="scroll-mt-24 pb-12">
            <div className="bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)] rounded-[4rem] p-12 md:p-24 text-center border border-slate-200 dark:border-slate-800 relative overflow-hidden shadow-glass">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.05),transparent)] pointer-events-none"></div>
               
               <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 className="space-y-6 relative z-10"
               >
                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight tracking-tighter italic font-serif">
                    바이오 도메인과 AI 사이의 <br />
                    <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8 decoration-8 whitespace-nowrap">공백을 메우고</span> 싶습니다.
                  </h2>
                  <p className="text-slate-600 dark:text-emerald-100/60 max-w-xl mx-auto md:text-lg font-medium leading-relaxed">
                    도메인 지식과 엔지니어링 역량을 결합하여 실질적인 문제를 풀어나가고자 합니다. <br />
                    저의 가능성에 대해 더 자세히 알고 싶으시다면 언제든 연락 부탁드립니다.
                  </p>
               </motion.div>

               <div className="mt-12 relative z-10">
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="group relative inline-flex items-center gap-4 px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-3xl font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="relative z-10 flex items-center gap-3">
                      Get in Touch
                      <Send className="w-4 h-4" />
                    </span>
                  </button>
               </div>
            </div>
          </section>
        </Reveal>
      </main>

      {/* Global Modals */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactModalOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-3xl overflow-hidden"
            >
              <div className="p-10 md:p-12 space-y-10 md:space-y-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white font-serif">Contact Info</h3>
                  <button
                    onClick={() => setIsContactModalOpen(false)}
                    aria-label="모달 닫기"
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Email Section */}
                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-700/50 group transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                      <div className="text-center md:text-left">
                        <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-1">Email Address</span>
                        <span className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight">kmh.ssem8405@gmail.com</span>
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText("kmh.ssem8405@gmail.com");
                          setEmailCopied(true);
                          setTimeout(() => setEmailCopied(false), 2000);
                        }}
                        className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-500 transition-all relative"
                      >
                        {emailCopied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        <AnimatePresence>
                          {emailCopied && (
                            <motion.span 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50 transition-colors"
                            >
                              이메일 복사됨!
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-6 pt-8 border-t border-slate-100 dark:border-slate-800 font-sans">
                  <a href="https://github.com/kmh8405" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-emerald-500 transition-colors uppercase tracking-widest">
                    <Github className="w-5 h-5" />
                    GITHUB
                  </a>
                  <a href="https://kmh1212.tistory.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-emerald-500 transition-colors uppercase tracking-widest">
                    <BookOpen className="w-5 h-5" />
                    BLOG
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">
            © 2026 Min-Hyuk Kim • AI Healthcare Solutions
          </div>
          <div className="flex gap-4">
             <a href="https://github.com/kmh8405" className="text-slate-400 hover:text-emerald-500 transition-colors">
               <Github className="w-5 h-5" />
             </a>
             <a href="mailto:kmh.ssem8405@gmail.com" className="text-slate-400 hover:text-emerald-500 transition-colors">
               <Mail className="w-5 h-5" />
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
