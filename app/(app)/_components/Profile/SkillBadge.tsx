import React from 'react';
import { getSkillIcon } from '@/app/(app)/_utils/skillIcons';

import styles from './SkillBadge.module.css';

type SkillBadgeProps = {
  skill: string;
};

export const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <span className={styles.skill_pill_mini}>
      {getSkillIcon(skill)}
      {skill}
    </span>
  );
};
