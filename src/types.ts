/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = 'home' | 'about' | 'services' | 'archive' | 'contact' | 'terminal';

export interface Repository {
  name: string;
  year: number;
  description: string;
  technologies: string[];
  category: string;
  categoryColor: string; // 'error' | 'primary' | 'outline' | 'secondary'
  url: string;
  isRestricted?: boolean;
  stars?: string;
  forks?: string;
  updatedAt?: string;
  screenshot?: string;
}

export interface Credential {
  type: string;
  title: string;
  url: string;
  iconName?: string;
}

export interface Capability {
  name: string;
  percentage: number;
}

export interface Collaborator {
  initials: string;
  name: string;
  role: string;
}

export interface AcademicTimelineItem {
  year: string;
  institution: string;
  description: string;
  link?: string;
  url?: string;
}

export interface TerminalLogLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'warn';
}
