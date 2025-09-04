import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import fonts from '../../config/fonts';
import { wp } from '../../config/dimension';
import colors from '../../config/colors';

type LeadProps = {
  data: {
    name: string;
    distance: number;
    score: number;
  };
};

const RejectedLeadListCard = ({ data }: LeadProps) => {
  const isBestLead = data.score >= 70;
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <IconButton icon="account-circle" style={styles.icon} />
        <Text style={[styles.name]}>{data.name}</Text>
      </View>
      <View style={styles.middleSection}>
        <IconButton icon="map-marker-outline" style={styles.icon} />
        <Text style={[styles.distance]}>{data.distance} Km</Text>
      </View>
      <View style={styles.rightSection}>
        <IconButton icon="scoreboard-outline" style={styles.icon} />
        <Text
          style={[
            styles.score,
            {
              color: isBestLead ? 'green' : 'red',
            },
          ]}
        >
          {data.score}%
        </Text>
      </View>
      {isBestLead && (
        <View style={styles.badge}>
          <Text style={styles.matchText}>Rejected</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: wp(10),
    backgroundColor: colors.primaryBackground,
    borderRadius: wp(8),
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bestCard: {
    padding: wp(10),
    backgroundColor: colors.primaryButton,
    borderRadius: wp(8),
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(130),
  },
  middleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flex: 0.5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 0,
  },
  name: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(18),
  },
  distance: {
    fontFamily: fonts.GloryRegular,
    fontSize: wp(16),
  },
  score: {
    fontFamily: fonts.GloryRegular,
    fontSize: wp(16),
    fontWeight: '500',
  },
  badge: {
    backgroundColor: colors.error,
    position: 'absolute',
    top: wp(0),
    right: 0,
    paddingHorizontal: wp(6),
    paddingVertical: wp(2),
    borderBottomLeftRadius: wp(8),
    borderTopRightRadius: wp(8),
  },
  matchText: {
    fontSize: wp(12),
    color: colors.primaryBackground,
    fontFamily: fonts.GloryRegular,
  },
});

export default RejectedLeadListCard;
