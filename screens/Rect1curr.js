import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Rect1curr = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [0,0,0,0,0,0,0,0,0],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.93.17:4000/api/data');
        const data = await response.json();
        const labels = data.map(item => formatTime(item.time)); // Format time here
        const tempData = data.map(item => item.rect1Curr); // Corrected key name

        setChartData({
          labels: labels,
          datasets: [
            {
              data: tempData,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000); // Fetch data every second

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, []);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rect_1_curr vs Time</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={200}
            chartConfig={{
              ...chartConfig,
              decimalPlaces: 1,
              formatYLabel: value =>  `${Math.round(value)}%`, // Format labels as integers with % suffix
            }}
            bezier
          />
        </View>
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top:250,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default Rect1curr;
