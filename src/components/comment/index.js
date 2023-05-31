import { Image, Text, View } from "react-native";
import { RatingStar } from "../rating-star";
import { AppInputText } from "../app-inut-text";
import { COLORS } from "../../constants/colors";
import { BtnDetails } from "../../screens/MovieDatailScreen";
import styles from "./styles";
import { useEffect, useState } from "react";

export const Comment = ({data = []}) => {
    const [currentRating, setCurrentRating] = useState(0);
    const [formValue, setFormValue] = useState({
      comment: '',
      rating: 0,
    });
    console.log('Comment-data', data);
  
    const totalStar = () => {
      const newArr = data.map(item => item?.rating || 0);
      console.log('newArr', newArr);
      const totalStart = newArr.reduce((accumulator, currentPoint) => accumulator + currentPoint, 0);
      console.log('totalStart', totalStart);
      return totalStart/data.length;
    }
  
    useEffect(() => {
      const start = totalStar();
      setCurrentRating(start);
    }, [data]);
  
    return (
      <View style={{marginTop: 12, padding: 10}}>
        <Text style={styles.titleRating}>Đánh giá tổng quan</Text>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.totalStart}>{currentRating}</Text>
          <View style={{width: 150, justifyContent: "center"}}>
            <RatingStar
              disabled={true}
              rating={currentRating}
            />
          </View>
        </View>
  
        <Text style={[styles.titleRating, {marginTop: 12}]}>Bình luận</Text>
  
        {/* filed commet */}
        <View style={styles.formRating}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: COLORS.white, marginRight: 4}}>{`Đánh giá: `}</Text>
            <View style={{width: 100, marginBottom: 4, marginTop: 4}}>
              <RatingStar
                disabled={false}
                starStyle={{marginRight: 2}}
                rating={formValue.rating}
                starSize={16}
                selectedStar={(rating) => setFormValue({...formValue, rating: rating})}
              />
            </View>
          </View>
  
          <View style={{marginTop: 12}}>
            <AppInputText
              value={formValue.comment}
              onChange={(value) => setFormValue({...formValue, comment: value})}
              bgColorInput={COLORS.black}
              maxLength={500}
            />
          </View>
  
          <View style={{marginTop: 12, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <BtnDetails
              style={styles.btnSendComment}
              renderView={() => <Text
                style={{color: COLORS.white, fontSize: 16, fontWeight: '600'}}
                >Gửi</Text>
              }
              onClickBtn={() => {console.log('send-comment')}}
            />
          </View>
        </View>
  
        {/* commet */}
        {
          data.map((item, idx) => <View key={idx} style={styles.commnet}>
            <Image source={{uri: item.user.imageUser}} style={styles.imageUser} />
  
            <View style={{marginLeft: 12}}>
              <Text style={styles.commentUserName}>{item.user.userName}</Text>
  
              <View style={{width: 80, marginBottom: 4, marginTop: 4}}>
                <RatingStar
                  disabled={true}
                  starStyle={{marginRight: 2}}
                  rating={item.rating}
                  starSize={12}
                />
              </View>
  
              <Text style={styles.contentChat}>{item.comment}</Text>
            </View>
          </View>)
        }
      </View>
    );
  };