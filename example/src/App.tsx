import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RowWithOverflow from 'react-native-overflow-row';

const App: React.FC = () => {
  const items = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`);

  const renderItem = (item: string) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  );

  const renderOverflowIndicator = (remainingCount: number) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>+{remainingCount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <RowWithOverflow
        items={items}
        renderItem={renderItem}
        renderOverflowIndicator={renderOverflowIndicator}
        rowWidth={300}
        rowContainerStyles={styles.rowContainerStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  rowContainerStyles: {
    columnGap: 8,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
  },
  itemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default App;
