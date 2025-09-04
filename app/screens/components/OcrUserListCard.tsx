import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar } from 'react-native-paper';
import { wp } from '../../config/dimension';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
const OcrUserListCard = ({ values }: any) => {
  return (
    <Card style={styles.card}>
      <Card.Title title="Extracted OCR Details" titleStyle={styles.title} />
      <Card.Content>
        {/* Name */}
        <View style={styles.row}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>
            {values.name || '-'}{' '}
            <Text style={{ color: colors.primaryButton }}>
              ({values.nameConfidence}%)
            </Text>
          </Text>
        </View>
        <ProgressBar
          progress={values.nameConfidence / 100}
          color={colors.primaryButton}
          style={styles.progress}
        />

        {/* DOB */}
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>
            {values.dob || '-'}{' '}
            <Text style={{ color: colors.primaryButton }}>
              ({values.dobConfidence}%)
            </Text>
          </Text>
        </View>
        <ProgressBar
          progress={values.dobConfidence / 100}
          color={colors.primaryButton}
          style={styles.progress}
        />

        {/* ID Number */}
        <View style={styles.row}>
          <Text style={styles.label}>ID Number:</Text>
          <Text style={styles.value}>
            {values.idNumber || '-'}{' '}
            <Text style={{ color: colors.primaryButton }}>
              ({values.idNumberConfidence}%)
            </Text>
          </Text>
        </View>
        <ProgressBar
          progress={values.idNumberConfidence / 100}
          color={colors.primaryButton}
          style={styles.progress}
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: wp(20),
    borderRadius: wp(12),
    elevation: 3,
    backgroundColor: colors.primaryBackground,
  },
  title: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(18),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: wp(6),
  },
  label: {
    fontFamily: fonts.GloryRegular,
    fontSize: wp(14),
    color: '#555',
  },
  value: {
    fontFamily: fonts.GloryBold,
    fontSize: wp(15),
    color: colors.primaryText,
  },
  progress: {
    height: wp(6),
    borderRadius: wp(4),
    marginBottom: wp(10),
  },
});

export default OcrUserListCard;
