import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Divider } from 'react-native-paper';
import colors from '../config/colors';
import { wp } from '../config/dimension';
import fonts from '../config/fonts';
import { useRoute } from '@react-navigation/native';
import RejectedLeadListCard from './components/RejectedLeadListCard';
import { useDispatch, useSelector } from 'react-redux';

export default function RejectedLeads() {
  const [isLoading, setIsLoading] = useState(true);
  const { rejectLeadList } = useSelector((state: any) => state.ocrUser);

  useEffect(() => {
    setIsLoading(false);
  }, []);
  const renderLead = ({ item }: any) => (
    <View style={{ margin: wp(10) }}>
      <RejectedLeadListCard key={item.id} data={item} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.primaryButton} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Declined Lead List</Text>
      </View>
      <Divider />
      <View style={styles.header}>
        <Text style={styles.title}>Name</Text>
        <Text style={styles.title}>Distance</Text>
        <Text style={styles.title}>Score</Text>
      </View>

      <Divider />

      {/* Lead List */}
      <FlatList
        data={rejectLeadList}
        renderItem={renderLead}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.noData}>
            <Text>No Rejected Leads Found</Text>
          </View>
        }
        contentContainerStyle={{ flex: rejectLeadList?.length > 0 ? 0 : 1 }}
      />
    </View>
  );
}

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
    paddingVertical: wp(15),
  },
  title: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(16),
  },
  headerText: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(22),
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noData: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
