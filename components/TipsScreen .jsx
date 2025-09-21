import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { db } from './firebase'; // Adjust path if your firebase.js is elsewhere
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import TipsCard from './TipsCard'; // Import your TipsCard component

const AllTipsScreen = () => { // Renamed from TipsScreen to AllTipsScreen for clarity
  const [tips, setTips] = useState([]); // State to hold multiple tips
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tipsCollectionRef = collection(db, 'tips');
    const tipsQuery = query(
      tipsCollectionRef,
      where('status', '==', 'active'),
      orderBy('date', 'desc')
    );
    const unsubscribe = onSnapshot(
      tipsQuery,
      (snapshot) => {
        const fetchedTips = [];
        snapshot.forEach((doc) => {
          fetchedTips.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setTips(fetchedTips);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching real-time tips:", err);
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []); // Runs once on mount

  if (loading) {
    return (
      <View style={screenStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading tips...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={screenStyles.centered}>
        <Text style={screenStyles.errorText}>Error: {error.message}</Text>
        <Text>Could not load tip data.</Text>
      </View>
    );
  }

  if (tips.length === 0) {
    return (
      <View style={screenStyles.centered}>
        <Text>No active tips available yet.</Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      {/* Use FlatList to efficiently render a list of your TipsCard components */}
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id} // Each item needs a unique key
        renderItem={({ item }) => <TipsCard tip={item} />} // Pass each tip to TipsCard
        contentContainerStyle={screenStyles.listContent}
      />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f0f0',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20, // Add some padding at the bottom of the list
  }
});

export default AllTipsScreen;
