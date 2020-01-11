import React from 'react';
import {Animated} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Content from '~/components/Content';

import {Container} from './styles';

export default function Main() {
  const translateY = new Animated.Value(0);

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  return (
    <Container>
      <Header />
      <Content translateY={translateY} animatedEvent={animatedEvent} />
      <Tabs translateY={translateY} />
    </Container>
  );
}
