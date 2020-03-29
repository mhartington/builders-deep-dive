import React from 'react';

export function Video(props) {
  return (
    <video
      src={props.src}
      autoPlay={true}
      controls={true}
      style={{
        width: '90%',
        objectFit: 'contain',
        boxShadow: 'rgba(52, 61, 70, 0.3) -6px -6px 26px, rgba(17, 26, 32, 0.5) 6px 6px 16px',
        border: '2px solid rgba(13,21,26,0.15)',
        borderRadius: 10
      }}
    />
  );
}
