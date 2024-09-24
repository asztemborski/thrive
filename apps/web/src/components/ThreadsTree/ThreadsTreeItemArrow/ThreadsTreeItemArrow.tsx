import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { HTMLProps } from 'react';

type ThreadsTreeItemArrowProps = HTMLProps<any> & {
  isExpanded: boolean | undefined;
};

export default function ThreadsTreeItemArrow({ isExpanded, ...rest }: ThreadsTreeItemArrowProps) {
  return (
    <span {...rest}>
      {isExpanded ? <IconCaretDownFilled size={15} /> : <IconCaretRightFilled size={15} />}
    </span>
  );
}
