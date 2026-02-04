export const normalizeSkillName = (input: string): string => {
  if (!input.trim()) return '';
  
  const trimmed = input.trim();
  const lowerInput = trimmed.toLowerCase();

  // Intelligence: Auto-correction Map for common typos or abbreviations
  const corrections: { [key: string]: string } = {
    'fhotoshop': 'Photoshop',
    'fotoshop': 'Photoshop',
    'potoshop': 'Photoshop',
    'ilustrator': 'Illustrator',
    'illustretor': 'Illustrator',
    'ilustreitor': 'Illustrator',
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'python': 'Python',
    'pyton': 'Python',
    'pithon': 'Python',
    'jav': 'Java',
    'noud': 'Node.js',
    'node': 'Node.js',
    'supabes': 'Supabase',
    'nextjs': 'Next.js',
    'reactjs': 'React',
    'vsc': 'VS Code',
    'vscode': 'VS Code',
    'gitgub': 'GitHub',
    'gitub': 'GitHub',
    'html': 'HTML',
    'css': 'CSS',
    'cpp': 'C++',
    'cplusplus': 'C++',
    'csharp': 'C#',
    'excel': 'Excel',
    'canva': 'Canva',
    'adobe': 'Adobe',
    'photoshop': 'Photoshop',
    'ps': 'Photoshop',
    'affinity': 'Affinity',
  };

  if (corrections[lowerInput]) {
    return corrections[lowerInput];
  }

  // Intelligence: Formatting - First letter Uppercase, rest Lowercase
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
