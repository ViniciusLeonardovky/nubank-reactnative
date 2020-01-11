import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {PanGestureHandler, State} from 'react-native-gesture-handler';

import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Title,
  Description,
  Annotation,
} from './styles';

import Menu from '~/components/Menu';
import {Animated} from 'react-native';

export default function Content({translateY, animatedEvent}) {
  let offset = 0;

  function onHandlerStateChange(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;

      const {translationY} = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }

      Animated.timing(translateY, {
        toValue: opened ? 380 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 380 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }
  return (
    <Container>
      <Menu translateY={translateY} />

      <PanGestureHandler
        onGestureEvent={animatedEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Card
          style={{
            transform: [
              {
                translateY: translateY.interpolate({
                  inputRange: [-350, 0, 380],
                  outputRange: [-50, 0, 380],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <CardHeader>
            <Icon name="attach-money" size={28} color="#666" />
            <Icon name="visibility-off" size={28} color="#666" />
          </CardHeader>
          <CardContent>
            <Title>Saldo disponível</Title>
            <Description>R$ 794.619,78</Description>
          </CardContent>
          <CardFooter>
            <Annotation>
              Transferência de R$ 900,00 recebida de Vinicius Leonardo hoje às
              14:31
            </Annotation>
          </CardFooter>
        </Card>
      </PanGestureHandler>
    </Container>
  );
}
