export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  link?: string;
  image: string;
}

export interface ExperienceItem {
  year: string;
  title: string;
  org: string;
  desc: string;
}

export interface Skill {
  name: string;
  level: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Mobile';
}

export interface NavLink {
  name: string;
  href: string;
}