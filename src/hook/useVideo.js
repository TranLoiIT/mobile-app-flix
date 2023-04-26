// import {useMemo, useRef, useState} from 'react';
// import {LayoutChangeEvent, ViewStyle} from 'react-native';

// import {Gesture} from 'react-native-gesture-handler';
// import {
//   interpolate,
//   runOnJS,
//   useAnimatedReaction,
//   useAnimatedStyle,
//   useDerivedValue,
//   useSharedValue,
// } from 'react-native-reanimated';
// import {
//   useSafeAreaFrame,
//   useSafeAreaInsets,
// } from 'react-native-safe-area-context';
// import Video from 'react-native-video';

// // import { sharedClamp, useInterpolate, useSharedTransition } from '@animated';
// // import { sizeScale } from '@common';
// // import { useTheme } from '@theme';

// // import { HEADER_HEIGHT, THUMB_SIZE } from './styles';

// export const useVideoHandle = () => {
//   //state
//   //   const { colors } = useTheme();
//   const insets = useSafeAreaInsets();
//   const {height, width} = useSafeAreaFrame();
//   const videoPlayer = useRef<Video>(null);
//   const [landscape, setLandScape] = useState(false);
//   const [zoom, setZoom] = useState(false);
//   const [videoWidth, setWidth] = useState<number>(0);
//   const [visible, setVisible] = useState(false);
//   const [isEnd, setIsEnd] = useState<boolean>(false);
//   const [muted, setMuted] = useState<boolean>(false);
//   const [duration, setDuration] = useState<number>(0);
//   const [paused, setPaused] = useState<boolean>(false);
//   const [currentTime, setCurrentTime] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   //reanimated
//   //   const hold = useSharedValue(false);
//   const translationX = useSharedValue(0);
//   //   const progress = useSharedTransition(zoom);
//   //   const running = useSharedTransition(isLoading);

//   //   const widthProgressBar = useInterpolate(
//   //     running,
//   //     [0, videoWidth],
//   //     [(currentTime / duration) * 100, 100],
//   //   );
//   //   const progressValue = useInterpolate(
//   //     running,
//   //     [-THUMB_SIZE, videoWidth - THUMB_SIZE],
//   //     [(currentTime / duration) * 100, 100],
//   //   );

//   //   const translateX = useDerivedValue(() =>
//   //     sharedClamp(translationX.value, -THUMB_SIZE, videoWidth - THUMB_SIZE),
//   //   );

//   const onEnded = () => {
//     runOnJS(() => {
//       videoPlayer?.current?.seek((translationX.value / videoWidth) * duration);
//     })();
//   };

//   //   const gestureHandler = Gesture.Pan()
//   //     .onBegin(() => {
//   //       hold.value = true;
//   //     })
//   //     .onChange(e => {
//   //       'worklet';
//   //       translationX.value += e.changeX;
//   //     })
//   //     .onFinalize(() => {
//   //       hold.value = false;
//   //       runOnJS(onEnded)();
//   //     });

//   const onLayout = ({
//     nativeEvent: {
//       layout: {width: widthWrap},
//     },
//   }: LayoutChangeEvent) => {
//     setWidth(widthWrap);
//   };

//   //   useAnimatedReaction(
//   //     () => {
//   //       return { progress: progressValue.value, hold: hold.value };
//   //     },
//   //     result => {
//   //       if (!result.hold) {
//   //         const value1 = parseFloat(result.progress.toFixed(0));
//   //         translationX.value = ((value1 - 3.5) / 100) * videoWidth;
//   //       }
//   //     },
//   //   );

//   //reStyle
//   //   const topVideoStyle = useMemo(() => {
//   //     if (zoom) {
//   //       return 0;
//   //     }
//   //     return insets.top + sizeScale(HEADER_HEIGHT);
//   //   }, [insets.top, zoom]);

//   const heightVideoStyle = useMemo(() => {
//     if (zoom) {
//       return height;
//     }
//     return 230;
//   }, [height, zoom]);

//   const widthVideoStyle = useMemo(() => {
//     if (zoom) {
//       return width - insets.top - insets.bottom;
//     }
//     return width;
//   }, [insets.bottom, insets.top, width, zoom]);

//   //   const videoReStyle = useMemo<ViewStyle>(() => {
//   //     return {
//   //       top: topVideoStyle,
//   //       zIndex: progress.value <= 0 ? 2 : 5,
//   //       height: heightVideoStyle,
//   //       width: widthVideoStyle,
//   //     };
//   //   }, [heightVideoStyle, progress.value, topVideoStyle, widthVideoStyle]);

//   //   const backdropReStyle = useAnimatedStyle(() => ({
//   //     backgroundColor: 'rgb(0,0,0)',
//   //     zIndex: 4,
//   //     opacity: interpolate(progress.value, [0, 1], [0, 1]),
//   //   }));

//   //   const currentProgressReStyle = useAnimatedStyle(() => ({
//   //     width: `${widthProgressBar.value}%`,
//   //     backgroundColor: '#FC0D1C',
//   //   }));

//   //   const thumbStyle = useAnimatedStyle(() => ({
//   //     transform: [{ translateX: translateX.value }],
//   //   }));

//   return {
//     insets,
//     landscape,
//     // colors,
//     videoPlayer,
//     paused,
//     isLoading,
//     duration,
//     currentTime,
//     isEnd,
//     muted,
//     zoom,
//     visible,
//     // gestureHandler,
//     // currentProgressReStyle,
//     // thumbStyle,
//     // videoReStyle,
//     // backdropReStyle,
//     setPaused,
//     setIsLoading,
//     setDuration,
//     setCurrentTime,
//     setIsEnd,
//     setZoom,
//     setVisible,
//     setMuted,
//     setLandScape,
//     onLayout,
//     useAnimatedReaction,
//   };
// };
