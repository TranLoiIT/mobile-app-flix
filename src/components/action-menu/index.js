import { Text } from "react-native";
import { FlatList, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

const ActionMenu = (props) => {
    const {indexActive = 0, onPress = () => {}, data = []} = props

    return (
      <View style={{ flex: 1, justifyContent: 'center', marginTop: 12 }}>
        <FlatList
          style={{ flexGrow: 0 }}
          data={data}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ paddingLeft: 10 }}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => onPress(item)}>
                <View
                  style={{
                    marginRight: 10,
                    padding: 10,
                    borderTopWidth: 3,
                    borderTopColor: `${indexActive === index ? COLORS.red : 'transparent'}`,
                  }}>
                  <Text style={{ color: `${indexActive !== index ? '#757575': COLORS.white }`, fontWeight: '700' }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    )
};

export default ActionMenu;