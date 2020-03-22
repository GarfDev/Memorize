import React from 'react';
import styled from 'styled-components';
import { useTrail, animated, config } from 'react-spring';

interface Props {
  title: string | undefined;
  price: string | undefined;
  previewImage: string | undefined;
  visible: boolean;
  content?: string | undefined;
}

export default function Info(props: Props) {
  const trail = useTrail(1, {
    ...config.gentle,
    opacity: props.visible ? 1 : 0,
    x: 0,
    height: props.visible ? 360 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });

  return (
    <>
      {trail.map(({ x, height, ...rest }, index) => (
        <animated.main
          key={index}
          style={{ ...rest, transform: x.interpolate((x: number) => `translate3d(0,${x}px,0)`) }}
        >
          <InfoContainer style={{ height }} previewimage={props.previewImage}>
            <StyledTitle>{props.title}</StyledTitle>
            <StyledPrice>{props.price && 'PRICE: ' + props.price}</StyledPrice>
          </InfoContainer>
        </animated.main>
      ))}
    </>
  );
}

const StyledTitle = styled(animated.div)`
  font-family: sans-serif;
  font-size: 2em;
  font-weight: bold;
`;

const StyledPrice = styled(animated.div)`
  font-family: sans-serif;
  font-size: 1.9em;
  font-weight: bold;
`;

interface InfoContainerProps {
  previewimage: string | undefined;
}

const InfoContainer = styled(animated.div)`
  margin-top: 40px;
  color: white;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-end;
  background-image: url(${(props: InfoContainerProps) => props.previewimage});
  background-color: pink;
  background-blend-mode: multiply;
  background-size: cover;
  background-repeat: no-repeat;
  width: 55vw;
  padding: 40px;
  border-radius: 30px;
`;