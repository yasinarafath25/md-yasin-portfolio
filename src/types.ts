export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  year: string;
  image: string;
  iconName?: string;
  videoUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Mobile' | 'Backend & DB' | 'DevOps & Cloud' | 'AI & Special' | 'Cloud & Special';
  featured?: boolean;
}

export interface Idea {
  id: string;
  title: string;
  category: string;
  status: 'Concept' | 'In Development' | 'Prototype' | 'MVP Ready' | 'Planned';
  description: string;
  tags: string[];
  targetYear?: string;
  demoUrl?: string;
  notes?: string;
  featured?: boolean;
}

export interface Booking {
  id?: string;
  name: string;
  email: string;
  topic?: string;
  selectedTime?: string;
  message?: string;
  createdAt?: any;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Apps & ZIPs' | 'Source Code' | 'Videos & Demos' | 'Media & Assets' | 'Guides & Docs';
  fileType: 'zip' | 'apk' | 'code' | 'video' | 'image' | 'pdf' | 'other';
  fileSize?: string;
  downloadUrl: string;
  previewUrl?: string;
  description: string;
  tags: string[];
  downloadsCount?: number;
  featured?: boolean;
  version?: string;
  updatedAt?: string;
}

export type ModalType = 'showreel' | 'schedule' | 'project' | 'services' | 'skills' | 'contact' | 'admin' | null;

