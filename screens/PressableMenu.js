// import React from 'react';
// import { StyleSheet, View, Text, Pressable } from 'react-native';

// const PressableMenu = () => {
//   const handlePress = (menuItem) => {
//     console.log(`Pressed ${menuItem}`);
//     // Perform navigation or any other action based on the pressed menu item
//   };

//   return (
//     <View style={styles.container}>
//       <Pressable
//         style={({ pressed }) => [
//           styles.menuItem,
//           pressed && styles.menuItemPressed,
//         ]}
//         onPress={() => handlePress('Component 1')}
//       >
//         <Text style={styles.menuText}>Component 1</Text>
//       </Pressable>
//       <Pressable
//         style={({ pressed }) => [
//           styles.menuItem,
//           pressed && styles.menuItemPressed,
//         ]}
//         onPress={() => handlePress('Component 2')}
//       >
//         <Text style={styles.menuText}>Component 2</Text>
//       </Pressable>
//       <Pressable
//         style={({ pressed }) => [
//           styles.menuItem,
//           pressed && styles.menuItemPressed,
//         ]}
//         onPress={() => handlePress('Component 3')}
//       >
//         <Text style={styles.menuText}>Component 3</Text>
//       </Pressable>
//       <Pressable
//         style={({ pressed }) => [
//           styles.menuItem,
//           pressed && styles.menuItemPressed,
//         ]}
//         onPress={() => handlePress('Component 4')}
//       >
//         <Text style={styles.menuText}>Component 4</Text>
//       </Pressable>
//       <Pressable
//         style={({ pressed }) => [
//           styles.menuItem,
//           pressed && styles.menuItemPressed,
//         ]}
//         onPress={() => handlePress('Component 5')}
//       >
//         <Text style={styles.menuText}>Component 5</Text>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   menuItem: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 5,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 10,
//   },
//   menuItemPressed: {
//     backgroundColor: '#bdbdbd',
//   },
//   menuText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



// export default PressableMenu;
// 


import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const PressableMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const handlePress = (menuItem) => {
    console.log(`Pressed ${menuItem}`);
    // Perform navigation or any other action based on the pressed menu item
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={(value) => {
          setSelectedComponent(value);
          handlePress(value);
        }}
        items={[
          { label: 'Component 1', value: 'Component 1' },
          { label: 'Component 2', value: 'Component 2' },
          { label: 'Component 3', value: 'Component 3' },
          { label: 'Component 4', value: 'Component 4' },
          { label: 'Component 5', value: 'Component 5' },
        ]}
        placeholder={{ label: 'Select a component...', value: null }}
        style={pickerSelectStyles}
        value={selectedComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default PressableMenu;
