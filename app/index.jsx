import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import TipsCard from '../components/TipsCard'; // Correct path to your TipsCard
import { db } from '../firebase'; // Correct path to your firebase.js
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const Free_Tips = () => {
  const [freeTips, setFreeTips] = useState([]); // State to hold free tips
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const tipsCollectionRef = collection(db, 'tips');
    const tipsQuery = query(
      tipsCollectionRef,
      where('isPremium', '==', false),
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
        setFreeTips(fetchedTips);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching free tips:", err);
        setError(err);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading free tips...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
        <Text>Could not load free tip data.</Text>
      </View>
    );
  }

  if (freeTips.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No free tips available at the moment.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={freeTips}
      keyExtractor={(item) => item.id} // Each tip needs a unique 'id' as a key
      renderItem={({ item }) => <TipsCard tip={item} />} // Pass each 'item' (tip) as a prop to TipsCard
      contentContainerStyle={styles.listContent}
    />
  );
};

export default Free_Tips;

const styles = StyleSheet.create({
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
    paddingBottom: 90, // Match your original paddingBottom
    paddingTop: 10, // Optional: add some padding to the top of the list
  }
});
