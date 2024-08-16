import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CreatePost = () => {
 const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    setTimeout(() => {
      setRefreshing(false);
      
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
        <Text>create app</Text>
        {/* Add other components/content here */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default CreatePost

const styles = StyleSheet.create({})