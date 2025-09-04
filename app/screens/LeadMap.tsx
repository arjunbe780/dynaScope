import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import MapLibreGL, {
  Camera,
  CameraRef,
  CircleLayer,
  MapView,
  PointAnnotation,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from '@maplibre/maplibre-react-native';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine-distance';
import AppConfig from '../config/appConfig';
import { IconButton } from 'react-native-paper';
import colors from '../config/colors';
import { wp } from '../config/dimension';
import fonts from '../config/fonts';

// Hardcoded lead dataset
// The coords are now in the standard MapLibreGL format: [longitude, latitude]
const leads = [
  {
    id: '1',
    name: 'Lead A',
    coords: [80.24536824406734, 12.958722420678514],
  },
  {
    id: '2',
    name: 'Lead B',
    coords: [80.23781553451626, 12.94023609368461],
  },
  {
    id: '3',
    name: 'Lead C',
    coords: [80.25352240586581, 12.980302670621027],
  },
  {
    id: '4',
    name: 'Lead D',
    coords: [80.23566906844871, 12.964827892046554],
  },
  {
    id: '5',
    name: 'Lead E',
    coords: [80.24828650248364, 12.963573650106252],
  },
  {
    id: '6',
    name: 'Lead F',
    coords: [80.23482077567856, 12.93420412344072],
  },
];

// Set MapLibre access token
MapLibreGL.setAccessToken(null);

const LeadMap = () => {
  const [nearestLead, setNearestLead] = useState(null) as any;
  const cameraRef = useRef<CameraRef>(null);
  // Initialize with a default location to prevent a crash
  const [currentLocation, setCurrentLocation] = useState([77.5946, 12.9716]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to move the camera to a specific coordinate
  const moveToLocation = (coords: any) => {
    if (cameraRef.current) {
      cameraRef.current.setCamera({
        centerCoordinate: coords,
        zoomLevel: 14,
        animationDuration: 1000,
      });
    }
  };

  const assignNearestLead = (userCoords: any) => {
    const toHaversine = ([lon, lat]: any) => ({
      latitude: lat,
      longitude: lon,
    });
    const userHaversineCoords = toHaversine(userCoords);

    let nearest = leads[0];
    let minDist = haversine(userHaversineCoords, toHaversine(leads[0].coords));
    for (let i = 1; i < leads.length; i++) {
      const dist = haversine(userHaversineCoords, toHaversine(leads[i].coords));
      if (dist < minDist) {
        minDist = dist;
        nearest = leads[i];
      }
    }
    setNearestLead({ ...nearest, distance: (minDist / 1000).toFixed(2) }); // km
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app needs access to your location to show it on the map.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              position => {
                const { latitude, longitude } = position.coords;
                const coords = [longitude, latitude];
                setCurrentLocation(coords);
                setIsLoading(false);
                assignNearestLead(coords);
                moveToLocation(coords);
              },
              error => {
                console.log('Error getting location:', error);
                setIsLoading(false);
              },
              { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
            );
          } else {
            setIsLoading(false);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
        }
      }
    };
    requestLocationPermission();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primaryButton} size={'large'} />
        <Text style={{ marginTop: 10 }}>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.fabContainer]}>
        <TouchableOpacity
          style={[styles.fab]}
          onPress={() => moveToLocation(currentLocation)}
        >
          <IconButton
            icon="crosshairs-gps"
            size={wp(26)}
            style={{ margin: 0 }}
            iconColor={colors.primaryButton}
          />
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        mapStyle={AppConfig.mapStyleUrl}
        compassEnabled={false}
        logoEnabled={false}
        attributionEnabled={false}
        onDidFinishLoadingMap={() => console.log('Map loaded successfully')}
        preferredFramesPerSecond={30}
      >
        <Camera
          ref={cameraRef}
          centerCoordinate={currentLocation}
          zoomLevel={12}
          animationDuration={0}
        />

        {/* User Marker */}
        {/* Here when the user location updates Automatically*/}
        <UserLocation
          visible={true}
          showsUserHeadingIndicator={true}
          onUpdate={loc => {
            if (loc && loc.coords) {
              const coords = [loc.coords.longitude, loc.coords.latitude];
              setCurrentLocation(coords);
              assignNearestLead(coords);
            }
          }}
        />
        {leads.map((item, index) => (
          <ShapeSource
            key={`symbol-${index}`}
            id={`symbol-${index}`}
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: item.coords,
              },
              properties: {
                name: item.name
              },
            }}
          >
            <CircleLayer
              id={`circle-layer-${index}`}
              style={{
                circleRadius: wp(10),
                circleColor: colors.primaryButton,
                circleOpacity: 0.8,
                circleStrokeWidth: wp(4),
                circleStrokeColor: colors.primaryBackground,
                circleSortKey: 9999,
              }}
            />
            <SymbolLayer
              id={`symbol-layer-${index}`}
              style={{
                textField: ['get', 'name'],
                textSize: 14,
                textColor: '#000000',
                textHaloColor: '#ffffff',
                textHaloWidth: 0.5,
                textAnchor: 'bottom',
                textOffset: [0, -1.5],
                textFont: [fonts.GloryBold],
                textAllowOverlap: true,
              }}
            />
          </ShapeSource>
        ))}
        {/* Nearest Lead Marker */}
        {nearestLead && (
          <PointAnnotation id={nearestLead.id} coordinate={nearestLead.coords}>
            <View style={styles.leadMarker} />
          </PointAnnotation>
        )}
      </MapView>
      {nearestLead && (
        <View style={styles.infoBox}>
          <Text style={{ fontWeight: 'bold' }}>Nearest Lead:</Text>
          <Text>Name: {nearestLead.name}</Text>
          <Text>Distance: {nearestLead.distance} km</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  userMarker: {
    width: wp(15),
    height: wp(15),
    backgroundColor: 'blue',
    borderRadius: wp(50),
    borderWidth: wp(2),
    borderColor: 'white',
  },
  leadMarker: {
    width: wp(15),
    height: wp(15),
    backgroundColor: 'red',
    borderRadius: wp(50),
    borderWidth:wp(2),
    borderColor: 'white',
  },
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    top: 30,
    zIndex: 2,
  },
  fab: {
    backgroundColor: colors.primaryBackground,
    borderRadius: wp(30),
    width: wp(50),
    height: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LeadMap;
