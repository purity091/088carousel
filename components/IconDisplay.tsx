import React from 'react';
import * as Icons from 'lucide-react';

interface IconDisplayProps {
  name: string;
  className?: string;
  color?: string;
}

export const IconDisplay: React.FC<IconDisplayProps> = ({ name, className, color }) => {
  // @ts-ignore - Dynamic access to Lucide icons
  const IconComponent = Icons[name as keyof typeof Icons] || Icons.HelpCircle;

  return <IconComponent className={className} color={color} />;
};