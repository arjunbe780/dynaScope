import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from 'react-native';
import LeadListCard from './components/LeadListCard';
import { IconButton, Divider } from 'react-native-paper';
import colors from '../config/colors';
import { wp } from '../config/dimension';
import fonts from '../config/fonts';
import Geolocation from '@react-native-community/geolocation';
import NotificationPopUp from './components/NotificationPopUp';
import { useNavigation } from '@react-navigation/native';

// Generate mock leads
const generateLeadList = () => {
  return Array.from({ length: 50 }, (_, i) => {
    const distance = +(Math.random() * 10).toFixed(0);
    const score = +(Math.random() * 100).toFixed(0);
    return {
      id: (i + 1).toString(),
      name: `Lead ${i + 1}`,
      distance,
      score,
    };
  });
};

export default function Dashboard() {
  const navigation = useNavigation() as any;
  const [sortBy, setSortBy] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(true);

  useEffect(() => {
    setLeadsData(generateLeadList());
    getCurrentPosition();
    setIsLoading(false);
  }, []);

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      async pos => {
        const coords: [number, number] = [
          pos.coords.longitude,
          pos.coords.latitude,
        ];
        console.log('Current Position: ', coords);
        // setCurrentLocation(coords);
      },
      () => {},
      { enableHighAccuracy: false, maximumAge: 0, timeout: 10000 },
    );
  };

  // Sorting + filtering
  const processedLeads = useMemo(() => {
    let leads = [...leadsData];
    if (filterOn) leads = leads.filter(l => l.score > 70);
    if (sortBy) {
      leads.sort((a, b) => a.distance - b.distance);
    }
    return leads;
  }, [sortBy, filterOn, leadsData]);

  const renderLead = ({ item }: any) => (
    <View style={{ margin: wp(10) }}>
      <LeadListCard key={item.id} data={item} />
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
        <Text style={styles.headerText}>Lead List</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="sort"
            size={wp(26)}
            style={{ margin: 0 }}
            iconColor={sortBy ? colors.primaryButton : colors.primaryText}
            onPress={() => setSortBy(!sortBy)}
          />
          <IconButton
            icon="filter"
            size={wp(26)}
            style={{ margin: 0 }}
            iconColor={filterOn ? colors.primaryButton : colors.primaryText}
            onPress={() => setFilterOn(!filterOn)}
          />
        </View>
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
        data={processedLeads}
        renderItem={renderLead}
        keyExtractor={item => item.id}
      />
      {
        <Modal
          visible={notification}
          statusBarTranslucent
          transparent
          onRequestClose={() => setNotification(false)}
        >
          <View style={styles.modalContainer}>
            <NotificationPopUp
              accept={(leads: any) => {
                setNotification(false);
                navigation.navigate('leadDetails', { leads });
              }}
              reject={(leads: any) => {
                setNotification(false);
                navigation.navigate('rejectedLeadsTab', { leads });
              }}
            />
          </View>
        </Modal>
      }
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
    paddingVertical: wp(10),
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontFamily: fonts.GloryBold,
    fontSize: wp(16),
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: fonts.GloryBold,
    fontSize: wp(22),
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: wp(10),
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    justifyContent: 'center',
  },
});
