import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';

export interface RowWithOverflowProps<T = any> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  renderOverflowIndicator: (remainingCount: number) => React.ReactNode;
  rowWidth?: number;
  columnGap?: number;
  rowContainerStyles?: StyleProp<ViewStyle>;
}

interface MeasuredItem {
  index: number;
  width: number;
}

const RowWithOverflow = <T,>({
  items,
  renderItem,
  renderOverflowIndicator,
  rowWidth = 250,
  columnGap = 0,
  rowContainerStyles,
}: RowWithOverflowProps<T>) => {
  type ItemType = (typeof items)[0];
  const [visibleItems, setVisibleItems] = useState<ItemType[]>(items);
  const [remainingCount, setRemainingCount] = useState(0);
  const [measuredWidths, setMeasuredWidths] = useState<MeasuredItem[]>([]);
  const [allMeasured, setAllMeasured] = useState(false);

  const calculateVisibleItems = useCallback(() => {
    let totalWidth = 0;
    const visible: ItemType[] = [];
    let remaining = items.length;

    for (const { index, width } of measuredWidths) {
      if (items[index] && totalWidth + width <= rowWidth) {
        totalWidth += width;
        visible.push(items[index]);
        remaining -= 1;
      } else {
        break;
      }
    }

    setVisibleItems(visible);
    setRemainingCount(remaining);
  }, [items, measuredWidths, rowWidth]);

  useEffect(() => {
    if (measuredWidths.length === items.length) {
      calculateVisibleItems();
      setAllMeasured(true);
    }
  }, [measuredWidths, items.length, calculateVisibleItems]);

  const onItemLayout = (index: number, event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    setMeasuredWidths((prevWidths) => {
      if (!prevWidths.some((item) => item.index === index)) {
        return [...prevWidths, { index, width }];
      }
      return prevWidths;
    });
  };

  return (
    <View
      style={[styles.row, { width: rowWidth, columnGap }, rowContainerStyles]}
    >
      {(allMeasured ? visibleItems : items).map((item, index) => (
        <View
          key={index}
          onLayout={(event) => onItemLayout(index, event)}
          style={styles.itemWrapper}
        >
          {renderItem(item)}
        </View>
      ))}

      {allMeasured &&
        remainingCount > 0 &&
        renderOverflowIndicator(remainingCount)}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  itemWrapper: {},
  plusMore: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 30,
  },
  plusText: {
    fontWeight: 'bold',
    color: '#555',
  },
});

export default RowWithOverflow;
