import { MouseEventHandler, ReactNode } from 'react';

import Button from '@/components/Button';

type SideBarButtonProps = {
  isActive: boolean;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function SideBarButton({ isActive, icon, onClick }: SideBarButtonProps) {
  return (
    <Button
      variant="ghost"
      className="px-5 py-7 justify-normal w-full flex border-transparent border-2 gap-2 rounded-l-none "
      style={{
        borderLeftColor: isActive ? 'whitesmoke' : 'transparent',
        color: isActive ? 'whitesmoke' : 'gray',
      }}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
