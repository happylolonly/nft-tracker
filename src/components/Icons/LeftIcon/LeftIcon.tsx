import React from 'react';
import leftIcon from '../../../assets/left.svg';
import classes from './LeftIcon.module.scss';

type Props = {
  onClick?: () => void;
  mirrorX?: boolean;
};

const LeftIcon: React.FC<Props> = ({ onClick, mirrorX }: Props) => {
  return (
    <button
      className={[classes.imageWrapper, mirrorX ? classes.mirrorX : ''].join(' ')}
      onClick={onClick}
    >
      <img src={leftIcon} alt="" />
    </button>
  );
};

export default LeftIcon;
