import React from 'react';

export default function Terminal({children, style = {}, border, background, boxShadow, topbarColor}) {
  const containerStyle = {
    border,
    background,
    boxShadow,
    borderRadius: '1.2rem 1.2rem 2rem 2rem',
    ...style
  };
  const topbarStyle = {
    background: topbarColor,
    height: '1.2rem',
    borderBottom: border,
    borderTopLeftRadius: '1.2rem',
    borderTopRightRadius: '1.2rem'
  };
  return (
    <div style={containerStyle}>
      <div style={topbarStyle}></div>
      {children}
    </div>
  );
}
