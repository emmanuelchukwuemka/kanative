import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserProfile = () => {
 const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request
    setTimeout(() => {
      setRefreshing(false);
      // Add your data fetching logic here
      console.log("Screen refreshed!");
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>user profile</Text>
        {/* Add other components/content here */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserProfile

const styles = StyleSheet.create({})