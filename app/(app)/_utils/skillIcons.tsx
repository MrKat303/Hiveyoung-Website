import React from 'react';
import { Zap } from 'lucide-react';

export const getSkillIcon = (skill: string) => {
  const s = skill.toLowerCase().trim();
  
  // Direct CDN URLs for Office & Design tools (these are more reliable)
  const directIconUrls: { [key: string]: string } = {
    'excel': 'https://img.icons8.com/color/48/microsoft-excel-2019--v1.png',
    'word': 'https://img.icons8.com/color/48/microsoft-word-2019--v2.png',
    'powerpoint': 'https://img.icons8.com/color/48/microsoft-powerpoint-2019--v1.png',
    'photoshop': 'https://img.icons8.com/color/48/adobe-photoshop--v1.png',
    'illustrator': 'https://img.icons8.com/color/48/adobe-illustrator--v1.png',
    'canva': 'https://img.icons8.com/fluency/48/canva.png',
    'notion': 'https://img.icons8.com/fluency/48/notion.png',
    'slack': 'https://img.icons8.com/color/48/slack-new.png',
    'affinity': 'https://img.icons8.com/color/48/affinity-designer.png',
    'adobe': 'https://img.icons8.com/color/48/adobe-creative-cloud--v1.png',
    'blender': 'https://img.icons8.com/color/48/blender-3d.png',
  };

  // Check for direct icon URLs first
  if (directIconUrls[s]) {
    return (
      <img 
        src={directIconUrls[s]}
        alt={skill}
        className="w-3.5 h-3.5 object-contain"
      />
    );
  }
  
  // Simple Icons mapping with hex colors for programming languages & frameworks
  const simpleIconsMap: { [key: string]: { slug: string; color: string } } = {
    // Languages
    'javascript': { slug: 'javascript', color: 'F7DF1E' },
    'typescript': { slug: 'typescript', color: '3178C6' },
    'python': { slug: 'python', color: '3776AB' },
    'java': { slug: 'openjdk', color: '437291' },
    'c++': { slug: 'cplusplus', color: '00599C' },
    'c#': { slug: 'csharp', color: '239120' },
    'dart': { slug: 'dart', color: '0175C2' },
    'rust': { slug: 'rust', color: '000000' },
    'go': { slug: 'go', color: '00ADD8' },
    'php': { slug: 'php', color: '777BB4' },
    'ruby': { slug: 'ruby', color: 'CC342D' },
    'swift': { slug: 'swift', color: 'F05138' },
    'kotlin': { slug: 'kotlin', color: '7F52FF' },
    'lua': { slug: 'lua', color: '2C2D72' },
    'perl': { slug: 'perl', color: '39457E' },
    'solidity': { slug: 'solidity', color: '363636' },
    
    // Frameworks
    'react': { slug: 'react', color: '61DAFB' },
    'next.js': { slug: 'nextdotjs', color: '000000' },
    'node.js': { slug: 'nodedotjs', color: '339933' },
    'vue': { slug: 'vuedotjs', color: '4FC08D' },
    'angular': { slug: 'angular', color: 'DD0031' },
    'flutter': { slug: 'flutter', color: '02569B' },
    'django': { slug: 'django', color: '092E20' },
    'laravel': { slug: 'laravel', color: 'FF2D20' },
    'spring': { slug: 'spring', color: '6DB33F' },
    'unity': { slug: 'unity', color: '000000' },
    
    // Databases
    'mongodb': { slug: 'mongodb', color: '47A248' },
    'mysql': { slug: 'mysql', color: '4479A1' },
    'postgresql': { slug: 'postgresql', color: '4169E1' },
    'supabase': { slug: 'supabase', color: '3ECF8E' },
    'firebase': { slug: 'firebase', color: 'FFCA28' },
    'redis': { slug: 'redis', color: 'DC382D' },
    
    // Design Tools
    'figma': { slug: 'figma', color: 'F24E1E' },
    
    // Dev Tools & Cloud
    'github': { slug: 'github', color: '181717' },
    'docker': { slug: 'docker', color: '2496ED' },
    'arduino': { slug: 'arduino', color: '00979D' },
    'git': { slug: 'git', color: 'F05032' },
    'vscode': { slug: 'visualstudiocode', color: '007ACC' },
    'vercel': { slug: 'vercel', color: '000000' },
    'aws': { slug: 'amazonaws', color: 'FF9900' },
    'azure': { slug: 'microsoftazure', color: '0078D4' },
    
    // Web
    'html': { slug: 'html5', color: 'E34F26' },
    'css': { slug: 'css3', color: '1572B6' },
    'tailwind': { slug: 'tailwindcss', color: '06B6D4' },
    'sass': { slug: 'sass', color: 'CC6699' },
    'bootstrap': { slug: 'bootstrap', color: '7952B3' },
  };

  // Check for exact match first
  let iconData = simpleIconsMap[s];
  
  // Only do partial matching for multi-character keywords (avoid matching single letters)
  if (!iconData) {
    const keywords = Object.keys(simpleIconsMap)
      .filter(k => k.length > 2) // Skip single/double letter keywords like 'r', 'c', 'go'
      .sort((a,b) => b.length - a.length);
    const match = keywords.find(k => s.includes(k));
    if (match) iconData = simpleIconsMap[match];
  }
  
  if (iconData) {
    return (
      <img 
        src={`https://cdn.simpleicons.org/${iconData.slug}/${iconData.color}`}
        alt={skill}
        className="w-3.5 h-3.5 object-contain"
        style={{ filter: 'none' }}
      />
    );
  }
  
  // Default: Generic lightning bolt
  return <Zap size={14} className="text-amber-400" />;
};
