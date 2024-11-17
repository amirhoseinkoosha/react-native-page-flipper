import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BookSpine } from './BookPage/BookSpine';
const BookPageBackground = ({ left, right, isFirstPage, isLastPage, containerSize, getPageStyle, renderPage, renderLastPage, shouldRenderLastPage, }) => {
    const leftPageStyle = getPageStyle(false, true);
    const rightPageStyle = getPageStyle(true, true);
    return (React.createElement(View, { style: styles.container },
        React.createElement(View, { style: styles.pageContainer },
            left && renderPage && (React.createElement(View, { style: [leftPageStyle] }, renderPage(left))),
            isFirstPage && (React.createElement(BookSpine, { right: false, containerSize: containerSize }))),
        React.createElement(View, { style: styles.pageContainer },
            right && renderPage && (React.createElement(View, { style: [rightPageStyle] }, renderPage(right))),
            isLastPage && (React.createElement(BookSpine, { right: true, containerSize: containerSize })),
            shouldRenderLastPage && renderLastPage && (React.createElement(View, { style: [rightPageStyle, { zIndex: -1 }] }, renderLastPage())))));
};
export { BookPageBackground };
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        justifyContent: 'center',
        // backgroundColor: 'white',
    },
    container: {
        position: 'absolute',
        zIndex: -1,
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
});
