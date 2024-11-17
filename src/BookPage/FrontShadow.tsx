import React from 'react';
import Animated, {
   
    Extrapolation,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { Gradient } from '../Components/Gradient';
import { transformOrigin } from '../utils/utils';

type FrontShadowProps = {
    degrees: SharedValue<number>;
    viewHeight: number;
    right: boolean;
};

const FrontShadow: React.FC<FrontShadowProps> = ({
    degrees,
    viewHeight,
    right,
}) => {
    const colors = [
        'rgba(0,0,0,0.0)',
        'rgba(0,0,0,0.2)',
        'rgba(0,0,0,0.3)',
        'rgba(0,0,0,0.6)',
    ];
    const shadowWidth = 40;

    const animatedStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            degrees.value,
            [-150, 0, 150],
            [6, 1, 6],
            Extrapolation.CLAMP // Updated approach
        );

        const fix = right ? { right: -shadowWidth } : { left: -shadowWidth };

        return {
            opacity,
            width: shadowWidth,
            ...fix,

            transform: [{ rotateY: !right ? '180deg' : '0deg' }],
        };
    });

    const animatedStyle2 = useAnimatedStyle(() => {
        const scale = interpolate(
            degrees.value,
            [-150, 0, 150],
            [6, 1, 6],
            Extrapolation.CLAMP
        );

        return {
            transform: [
                ...transformOrigin({ x: -shadowWidth / 2, y: 0 }, [{ scale }]), // use scale instead of scaleX
            ],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    zIndex: 5000,
                    height: viewHeight,
                    position: 'absolute',
                },
                animatedStyle,
            ]}
        >
            <Animated.View
                style={[
                    {
                        height: viewHeight,
                        width: shadowWidth,
                    },
                    animatedStyle2,
                ]}
            >
                <Gradient
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    colors={colors}
                    style={[{ flex: 1 }]}
                />
            </Animated.View>
        </Animated.View>
    );
};
export default FrontShadow;
