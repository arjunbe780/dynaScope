import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import colors from '../../config/colors';
import { wp } from '../../config/dimension';
import fonts from '../../config/fonts';

const score = +(Math.random() * 100).toFixed(0);
const distance = +(Math.random() * 10).toFixed(0);
const lead = [
  {
    id: '1',
    name: 'Lead A',
    coords: [80.24536824406734, 12.958722420678514],
    location: 'Chennai, India',
    score,
    distance,
  },
  {
    id: '2',
    name: 'Lead B',
    coords: [80.23781553451626, 12.94023609368461],
    location: 'Chennai, India',
    score,
    distance,
  },
  {
    id: '3',
    name: 'Lead C',
    coords: [80.25352240586581, 12.980302670621027],
    location: 'Chennai, India',
    score,
    distance,
  },
  {
    id: '4',
    name: 'Lead D',
    coords: [80.23566906844871, 12.964827892046554],
    location: 'Chennai, India',
    score,
    distance,
  },
  {
    id: '5',
    name: 'Lead E',
    coords: [80.24828650248364, 12.963573650106252],
    location: 'Chennai, India',
    score,
    distance,
  },
  {
    id: '6',
    name: 'Lead F',
    coords: [80.23482077567856, 12.93420412344072],
    location: 'Chennai, India',
    score,
    distance,
  },
];

function getLeadById(id: string) {
  return lead.find(lead => lead.id === id);
}

const NotificationPopUp = ({ accept, reject }: any) => {
  const id = Math.floor(Math.random() * 6) + 1;
  const [lead, setLead] = useState(getLeadById(id.toString())) as any;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Incoming Lead</Text>

        <Text style={styles.label}>Lead Name</Text>
        <Text style={styles.value}>{lead.name}</Text>

        <Text style={styles.label}>Location</Text>
        <Text style={styles.value}>{lead.location}</Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primaryButton }]}
            onPress={() => accept(lead)}
          >
            <Text style={styles.btnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.secondaryText }]}
            onPress={() => reject(lead)}
          >
            <Text style={styles.btnText}>Declined</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp(12),
    padding: wp(20),
    width: '100%',
    elevation: 5,
  },
  title: {
    fontSize: wp(20),
    fontFamily: fonts.GloryBold,
    textAlign: 'center',
    marginBottom: wp(20),
  },
  label: {
    fontSize: wp(14),
    fontFamily: fonts.GloryRegular,
    color: '#666',
  },
  value: {
    fontSize: wp(18),
    fontFamily: fonts.GloryBold,
    marginBottom: wp(10),
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: wp(20),
  },
  button: {
    flex: 1,
    marginHorizontal: wp(10),
    padding: wp(12),
    borderRadius: wp(8),
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: wp(16),
    fontFamily: fonts.GloryBold,
  },
});

export default NotificationPopUp;
