import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIon from 'react-native-vector-icons/Ionicons';
import Orientation from "react-native-orientation-locker";
import Slider from "@react-native-community/slider";
import { COLORS } from "../../constants/colors";
import { URL_IMAGE } from "../../api/config";
import { useNavigation } from "@react-navigation/native";

const URL_VIDEO = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
const URL_Y = 'https://www.youtube.com/embed/Q_2gwtUG9ZU'

const windownHeight = Dimensions.get('window').width * 9/12;
const windownWidth = Dimensions.get("window").width;

const width = Dimensions.get('window').height;
const height = Dimensions.get('window').width;


const VideoPlayer = ({uri = URL_VIDEO, poster = ''}) => {
  const videoRef = React.createRef();
  const [orientation, setOrientation] = useState('portrait');
  const [isShowPoster, setIsShowPoster] = useState(true);

  const navigation = useNavigation();
  
  useEffect(() => {
    console.log('Orientation', Orientation)
    const lockOrientation = () => {
      if (orientation === 'landscape') {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
    };

    lockOrientation();

    return () => {
      Orientation.unlockAllOrientations();
      // setIsShowPoster(true);
    };
  }, [orientation]);
  
  const [fullScreen, setFullScreen] = useState(false);
  const [play, setPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShowControl, setIsShowControl] = useState(true);

  const handleFullScreen = () => {
    if (fullScreen) {
      setFullScreen(false);
      setOrientation('portrait');
    } else {
      setFullScreen(true);
      setOrientation('landscape');
    }
  }

  const handlePlay = () => {
    setPlay(true);
  };

  const handlePause = () => {
    setIsShowPoster(false);
    if (play) {
      setPlay(false);
      return;
    }
    setPlay(true);
  }

  const skipBackwards = () => {
    const time = (Math.round(currentTime) - 10 > 0) ? Math.round(currentTime) - 10 : 0; 
    videoRef.current?.seek(time);
    setCurrentTime(time);
  };

  const skipForwards = () => {
    videoRef.current?.seek(Math.round(currentTime) + 10);
    setCurrentTime(Math.round(currentTime) + 10);
  };

  const onSeek = data => {
    videoRef.current.seek(data.seekTime);
    setCurrentTime(data.seekTime);
  };

  const onProgress = data => {
    setCurrentTime(data.currentTime);
  };

  const onLoadEnd = data => {
    setDuration(data.duration);
    setCurrentTime(data.currentTime)
  };

  const onEnd = () => {
    setPlay(true);
    setIsShowControl(true);
    videoRef.current.seek(0);
  }

  const handleControl = () => {
    if (isShowControl) {
      setIsShowControl(false);
      return;
    } setIsShowControl(true);
  }

  const handleBack = () => {
    if (fullScreen) {
      setFullScreen(false);
      setOrientation('portrait');
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{backgroundColor: '#000000C4'}} onPress={handleControl}>
        <View style={{position: 'relative'}}>
            <View style={fullScreen ? styles.fullscreenVideo : styles.video}>
              <Video
                ref={videoRef}
                source={{uri: `${URL_IMAGE}${uri}`}}
                muted={true}
                controls={false}
                style={[fullScreen ? styles.fullscreenVideo : styles.video, {flex: 1}]}
                paused={play}
                onProgress={onProgress}
                onLoad={onLoadEnd}
                onEnd={onEnd}
                fullscreen
                resizeMode="contain"
              />
              { isShowPoster && <Image
                style={{resizeMode: 'contain', width: '100%', height: "100%"}}
                source={{ uri: `${URL_IMAGE}${poster}` }} />
              }
            </View>

            {isShowControl && <View style={styles.controlOverlay}>
                <PlayControls
                  playing={play}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  skipBackwards={skipBackwards}
                  skipForwards={skipForwards}
                  showControl={isShowControl}
                  back={handleBack}
                />

                <ProgressBar
                  currentTime={currentTime}
                  duration={duration > 0 ? duration : 0}
                  onSlideStart={handlePause}
                  onSlideComplete={handlePause}
                  onSlideCapture={onSeek}
                  handleFullScreen={handleFullScreen}
                  showControl={isShowControl}
                />
            </View>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const PlayControls = props => {
  const {playing, onPlay, onPause, skipForwards, skipBackwards, back} = props;

  return (
    <>
      <View style={styles.wrapper}>
      <TouchableOpacity style={{position: "absolute", top: 16, left: 12}} onPress={back}>
        <IconIon name="arrow-back" size={26} color="#FFFFFF" />
      </TouchableOpacity>
        <TouchableOpacity onPress={skipBackwards}>
          <Icon name="backward" size={26} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={playing ? onPause : onPlay}
        >
          {
            playing ? (
              <Icon name="play" size={26} color="#FFFFFF" />
            ) :(
              <Icon name="pause" size={26} color="#FFFFFF" />
            )
          }
        </TouchableOpacity>

        <TouchableOpacity
          onPress={skipForwards}
        >
          <Icon name="forward" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  )
};

const ProgressBar = props => {
  const {currentTime, duration, onSlideCapture, onSlideStart, onSlideComplete, handleFullScreen} = props;

  const getMinutesFromSeconds = time => {

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    // Định dạng chuỗi giờ, phút, giây
    const formattedTime =(hours > 0 ? (`${hours.toString().padStart(2, '0')}:`) : '') +
      `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

    return formattedTime;
  }

  const position = getMinutesFromSeconds(currentTime);
  const fullDuration = getMinutesFromSeconds(duration);

  const handleOnSlide = time => {
    onSlideCapture({seekTime: time});
  }

  return (
    <View style={styles.controlBottom}>
      <View style={styles.progressBar}>
        <Slider
          height={10}
          value={currentTime}
          minimumValue={0}
          maximumValue={duration}
          step={1}
          onValueChange={handleOnSlide}
          onSlidingStart={onSlideStart}
          onSlidingComplete={onSlideComplete}
          minimumTrackTintColor={'#F44336'}
          maximumTrackTintColor={'#FFFFFF'}
          thumbTintColor={'#F44336'}
        />
        <View style={styles.time}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: "500"}}>{position}</Text>
          <Text style={{color: 'white', fontSize: 15, fontWeight: "500"}}>{fullDuration}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFullScreen}
        style={styles.fullscreenButton}

        // hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
      >
        <Icon name="expand" size={25} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    opacity: 1,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  video: {
    width: windownWidth,
    height: windownHeight,
    backgroundColor: COLORS.black,
  },
  fullscreenVideo: {
    width: width,
    height: height,
    backgroundColor: COLORS.black,
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    alignItems: 'center',
    paddingRight: 12,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000000C4',
  },
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
    height: 50,
  },
  progressBar: {
    flex: 1,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  controlBottom: {
    flexDirection: "row",
    alignItems: 'center',
    marginBottom: 12
  },
})

export default VideoPlayer
