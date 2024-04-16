import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const RealTimeLineChart = () => {
  const navigation = useNavigation();

  const [data, setData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        const newData = {
          labels: [],
          datasets: [{ data: [] }],
        };

        for (let i = 0; i < 15; i++) {
          newData.labels.push(i + 1);
          newData.datasets[0].data.push(Math.floor(Math.random() * 100));
        }

        setData(newData);
      }, 15000); // Update every 15 seconds (you can adjust this interval)

      return () => clearInterval(interval);
    }, [])
  );

  return (
    <View>
      <Text>Real-Time Line Chart</Text>
      <LineChart
        data={data}
        width={400}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

export default RealTimeLineChart;
