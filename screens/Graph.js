import React from 'react';
import { View } from 'react-native';
import RealTimeLineChart from '../components/RealTimeLineChart';

const Graph = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RealTimeLineChart />
    </View>
  );
};

export default Graph;
