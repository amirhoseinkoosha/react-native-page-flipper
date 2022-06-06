import useSetState from '@/hooks/useSetState';
import React from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { BookPage2 } from './BookPage2/BookPage2';
import { BookPagePortrait } from './BookPage2/BookPagePortrait';
import { BookPageBackground } from './BookPageBackground';
import Image from './Components/Image';
import { Size } from './types';

export type IPageFlipperProps = {
  landscape: boolean;
  containerSize: Size;
  data: string[];
};

const PageFlipper: React.FC<IPageFlipperProps> = ({ landscape, containerSize, data }) => {
  const getInitialPages = () => {
    if (!landscape) {
      const allPages = [];

      for (let i = 0; i < data.length * 2; i += 2) {
        allPages[i] = data[i];
        allPages[i + 1] = data[i];
      }
      return allPages;
    }

    return data;
  };

  const [state, setState] = useSetState({
    pageIndex: 0,
    pages: getInitialPages(),
    isAnimating: false,
  });
  const isAnimatingRef = useRef(false);

  const onPageFlipped = (index: number) => {
    const newIndex = pageIndex + index;
    setState({
      pageIndex: newIndex,
    });
    setIsAnimating(false);
  };

  const setIsAnimating = (val: boolean) => {
    setState({
      isAnimating: val,
    });
    isAnimatingRef.current = val;
  };

  const { pageIndex } = state;
  const pages = state.pages;
  const prev = pages[pageIndex - 1];
  const current = pages[pageIndex];
  const next = pages[pageIndex + 1];

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pages.length - 1;

  const bookPageProps = {
    containerSize: containerSize,
    isAnimating: false,
    zoomActive: false,
    setIsAnimating: setIsAnimating,
    isAnimatingRef: isAnimatingRef,
    onPageFlip: onPageFlipped,
  };

  return (
    <View
      style={[
        styles.contentContainer,
        {
          height: containerSize.height,
          width: containerSize.width,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          backgroundColor: 'white',
          // borderWidth: 2,
        },
      ]}
    >
      {landscape ? (
        <View style={{ flex: 1, flexDirection: 'row', overflow: 'hidden' }}>
          {!prev ? (
            <Empty />
          ) : (
            <BookPage2
              right={false}
              front={current}
              back={prev}
              key={`left${pageIndex}`}
              {...bookPageProps}
            />
          )}
          {!next ? (
            <Empty />
          ) : (
            <BookPage2
              right
              front={current}
              back={next}
              key={`right${pageIndex}`}
              {...bookPageProps}
            />
          )}
          <BookPageBackground
            left={!prev ? current : prev}
            right={!next ? current : next}
            containerSize={containerSize}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
          />
        </View>
      ) : (
        <View style={{ flex: 1, overflow: 'hidden' }}>
          <View style={{ ...StyleSheet.absoluteFillObject }}>
            <BookPagePortrait
              current={current}
              prev={prev}
              onPageFlip={onPageFlipped}
              key={`right${pageIndex}`}
              containerSize={containerSize}
              isAnimating={state.isAnimating}
              pageIndex={state.pageIndex}
              setIsAnimating={setIsAnimating}
              zoomActive={false}
            />
          </View>
          {next ? (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: -5,
                overflow: 'hidden',
              }}
            >
              <Image
                source={{ uri: next }}
                style={{
                  height: containerSize.height,
                  width: containerSize.width * 2,
                  right: pageIndex % 2 === 0 ? containerSize.width : 0,
                  backgroundColor: 'white',
                }}
              />
            </View>
          ) : (
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                zIndex: -5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#FFF',
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export { PageFlipper };

const Empty = () => <View style={styles.container} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
  },
});