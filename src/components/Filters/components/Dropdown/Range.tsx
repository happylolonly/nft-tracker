import React, { FC } from 'react';
import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';

type PropsType = {
  onChange: (start: number, end: number) => void;
};

const Range: FC<PropsType> = ({ onChange }: PropsType) => {
  const onSlide = (render, handle, value) => {
    onChange(value[0], value[1]);
  };

  return (
    <Nouislider
      range={{ min: 0, max: 10 }}
      start={[0.01, 2]}
      step={0.01}
      connect
      onSlide={onSlide}
    />
  );
};

export default Range;
