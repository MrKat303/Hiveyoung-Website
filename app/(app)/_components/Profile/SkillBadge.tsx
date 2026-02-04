import React from 'react';
import { getSkillIcon } from '@/app/(app)/_utils/skillIcons';

type SkillBadgeProps = {
  skill: string;
};

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <span className="skill-pill-mini">
      {getSkillIcon(skill)}
      {skill}
    </span>
  );
};
