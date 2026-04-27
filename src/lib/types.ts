export type Social = { label: string; href: string };

export type Experience = {
  company: string;
  title: string;
  period: string;
  bullets: string[];
};

export type Project = {
  title: string;
  summary: string;
  tags: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type PortfolioItem = {
  title: string;
  image: string;
  description: string;
};

export type PortfolioData = {
  site: {
    name: string;
    role: string;
    tagline: string;
    email: string;
    telegram: string;
    focus: string;
    yearsOfExp: string;
    socials: Social[];
  };
  experience: Experience[];
  projects: Project[];
  education: Education[];
  skills: SkillCategory[];
  portfolio: PortfolioItem[];
};
