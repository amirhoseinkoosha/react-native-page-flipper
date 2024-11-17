import React from 'react';
import { View } from 'react-native';
import { Gradient } from '../Components/Gradient';
const shadowColors = [
    'rgba(0,0,0,0.3)',
    'rgba(0,0,0,0.1)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
    'rgba(0,0,0,0)',
];
const BookSpine = ({ right, containerSize }) => {
    return (React.createElement(View, { pointerEvents: "none", style: [
            {
                position: 'absolute',
                height: '100%',
                width: containerSize.width / 2,
                zIndex: 1,
                opacity: 0.6,
            },
            right ? { left: 0 } : { right: 0 },
        ] },
        React.createElement(Gradient, { start: { x: right ? 0 : 1, y: 0 }, end: { x: right ? 1 : 0, y: 0 }, colors: shadowColors, style: {
                flex: 1,
            } })));
};
export { BookSpine };
