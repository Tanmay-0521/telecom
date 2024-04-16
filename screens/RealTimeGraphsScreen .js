import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

const RealTimeGraphsScreen = () => {
  // Sample data for demonstration
  const [data, setData] = useState({
    lineChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        },
      ],
    },
    barChartData: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
        },
      ],
    },
    pieChartData: [
      {
        name: 'January',
        population: 21500000,
        color: '#FFD700',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'February',
        population: 2800000,
        color: '#FF4500',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'March',
        population: 527612,
        color: '#FFA500',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
      {
        name: 'April',
        population: 8538000,
        color: '#FF6347',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      },
    ],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Line Chart</Text>
        <LineChart
          data={data.lineChartData}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={chartConfig}
          bezier
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bar Chart</Text>
        <BarChart
          data={data.barChartData}
          width={Dimensions.get('window').width - 40}
          height={200}
          chartConfig={chartConfig}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pie Chart</Text>
        <PieChart
          data={data.pieChartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
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
    padding: 20,
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
});

export default RealTimeGraphsScreen;
