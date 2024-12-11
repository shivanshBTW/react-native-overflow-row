# react-native-overflow-row

A React Native component that displays items in a row with overflow indicator(+n)

## Example

|                                               with 250px width                                                |                                               with 350px width                                                |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
| ![](https://github.com/shivanshBTW/react-native-overflow-row/blob/main/example/assets/Screenshot%20250px.png) | ![](https://github.com/shivanshBTW/react-native-overflow-row/blob/main/example/assets/Screenshot%20350px.png) |

## Installation

```sh
npm install react-native-overflow-row
```

OR

```sh
yarn add react-native-overflow-row
```

## Usage

```js
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
        rowWidth={150}
        rowContainerStyles={styles.rowContainerStyles}
      />
    </View>
  );
};
```

## Props

| Name                      | Type                                          | Default | Description                                |
| ------------------------- | --------------------------------------------- | ------- | ------------------------------------------ |
| `items`                   | `T[]`                                         |         | Array of items to be displayed in the row. |
| `renderItem`              | `(item: T) => React.ReactNode`                |         | Function to render each item.              |
| `renderOverflowIndicator` | `(remainingCount: number) => React.ReactNode` |         | Function to render the overflow indicator. |
| `rowWidth`                | `number`                                      | `250`   | Width of the row container in `px`.        |
| `rowContainerStyles`      | `StyleProp<ViewStyle>`                        |         | Custom styles for the row container.       |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
