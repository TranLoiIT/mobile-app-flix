import React from 'react'
import StarRating from 'react-native-star-rating'
import { COLORS } from '../../constants/colors'

export const RatingStar = ({
    disabled = false,
    maxStars = 5,
    rating = 0,
    starSize = 18,
    fullStarColor = COLORS.red,
    emptyStarColor = COLORS.grey,
    starStyle = {marginRight: 10},
    selectedStar = (rating) => {},
}) => {

    return (
        <StarRating
            disabled={disabled}
            maxStars={maxStars}
            rating={rating} // Giá trị mặc định cho đánh giá sao
            starSize={starSize}
            fullStarColor={fullStarColor} // Đổi màu của sao khi đánh giá đầy đủ
            emptyStarColor={emptyStarColor} // Đổi màu của sao khi chưa đánh giá
            starStyle={starStyle}
            selectedStar={selectedStar}
        />
    )
}
