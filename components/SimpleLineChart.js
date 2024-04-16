import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SimpleLineChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.93.17:4000/api/data'); // Updated port to 3500
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const chartData = await response.json();
        if (chartData && chartData.length > 0) {
          // Extract time and temperature from the last ten entries in chartData array
          const lastTenEntries = chartData.slice(-10);
          const labels = lastTenEntries.map(entry => formatTime(entry.time));
          const temperatures = lastTenEntries.map(entry => entry.temperature);
          // Update the state with the extracted data
          setData({
            labels: labels,
            datasets: [{ data: temperatures }],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const intervalId = setInterval(fetchData, 2000); // Fetch data every 2 seconds

    // Initial fetch
    fetchData();

    return () => clearInterval(intervalId);
  }, []);

  // Helper function to format time in mm:ss format
  const formatTime = time => {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Line Chart (Live Data)</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={400}
          height={220}
          yAxisLabel="Temperature"
          yAxisInterval={10}
          fromZero={true}
          xLabelsOffset={-20} // Offset to adjust X-axis labels position
          chartConfig={{
            backgroundColor: '#f26a00',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            borderRadius: 16,
          }}
          withVerticalLines={false}
          withHorizontalLines={false}
          withInnerLines={false}
          withShadow={false}
          yAxisSuffix="°C"
          // yAxisInterval={10} // Interval between Y-axis labels
          yAxisMin={20} // Minimum value on Y-axis
          yAxisMax={60} // Maximum value on Y-axis
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default SimpleLineChart;
