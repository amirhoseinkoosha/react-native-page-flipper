import { runOnJS } from 'react-native-reanimated';
export const createPages = ({ portrait, singleImageMode, data, }) => {
    const allPages = [];
    if (portrait) {
        if (!singleImageMode) {
            data.forEach((page) => {
                allPages.push({
                    left: page,
                    right: page,
                });
                allPages.push({
                    left: page,
                    right: page,
                });
            });
        }
        else {
            for (let i = 0; i < data.length; i++) {
                allPages[i] = {
                    left: data[i],
                    right: data[i],
                };
            }
        }
    }
    else {
        for (let i = 0; i < data.length; i++) {
            if (singleImageMode) {
                allPages.push({
                    left: data[i],
                    right: data[i + 1],
                });
                i++;
            }
            else {
                allPages.push({
                    left: data[i],
                    right: data[i],
                });
            }
        }
    }
    return allPages;
};
export const transformOrigin = ({ x, y }, transformations) => {
    'worklet';
    const validTransformations = Array.isArray(transformations)
        ? transformations.filter((t) => typeof t === 'object')
        : [];
    return [
        { translateX: x },
        { translateY: y },
        ...validTransformations,
        { translateX: -x },
        { translateY: -y },
    ];
};
const debug = (msg, val) => {
    console.log(msg, val);
};
export const debugValue = (msg, val) => {
    'worklet';
    runOnJS(debug)(msg, val);
};
export const snapPoint = (value, velocity, points) => {
    'worklet';
    const point = value + 0.25 * velocity;
    const deltas = points.map((p) => Math.abs(point - p));
    const minDelta = Math.min.apply(null, deltas);
    return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};
export function clamp(number, min, max) {
    'worklet';
    return Math.max(min, Math.min(number, max));
}
