import { StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import { Divider, IconButton } from 'react-native-paper';
import fonts from '../config/fonts';
import { wp } from '../config/dimension';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import OcrUserListCard from './components/OcrUserListCard';

const OcrUserList = () => {
  const navigation = useNavigation() as any;
  const { userList } = useSelector((state: any) => state.ocrUser);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>OCR User List</Text>
        <IconButton
          icon="playlist-plus"
          size={wp(26)}
          style={{ margin: 0 }}
          iconColor={colors.primaryText}
          onPress={() => navigation.navigate('ocrAddUser')}
        />
      </View>
      <Divider />
      <FlatList
        data={userList}
        keyExtractor={(item, index) => index + ' '.toString()}
        renderItem={({ item }) => <OcrUserListCard values={item} />}
        ListEmptyComponent={
          <View style={styles.noData}>
            <Text>No Users Found</Text>
          </View>
        }
        contentContainerStyle={{ flex: userList?.length > 0 ? 0 : 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(20),
    paddingVertical: wp(10),
  },
  title: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(16),
  },
  headerText: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(22),
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OcrUserList;
