// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
// // import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';

// // const RealTimeGraphsScreen = () => {
// //   // Sample data for demonstration
// //   const [data, setData] = useState({
// //     lineChartData: {
// //       labels: ['January', 'February', 'March', 'April', 'May', 'June'],
// //       datasets: [
// //         {
// //           data: [20, 45, 28, 80, 99, 43],
// //           color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
// //         },
// //       ],
// //     },
// //     barChartData: {
// //       labels: ['January', 'February', 'March', 'April', 'May', 'June'],
// //       datasets: [
// //         {
// //           data: [20, 45, 28, 80, 99, 43],
// //         },
// //       ],
// //     },
// //     pieChartData: [
// //       {
// //         name: 'January',
// //         population: 21500000,
// //         color: '#FFD700',
// //         legendFontColor: '#7F7F7F',
// //         legendFontSize: 15,
// //       },
// //       {
// //         name: 'February',
// //         population: 2800000,
// //         color: '#FF4500',
// //         legendFontColor: '#7F7F7F',
// //         legendFontSize: 15,
// //       },
// //       {
// //         name: 'March',
// //         population: 527612,
// //         color: '#FFA500',
// //         legendFontColor: '#7F7F7F',
// //         legendFontSize: 15,
// //       },
// //       {
// //         name: 'April',
// //         population: 8538000,
// //         color: '#FF6347',
// //         legendFontColor: '#7F7F7F',
// //         legendFontSize: 15,
// //       },
// //     ],
// //   });

// //   return (
// //     <ScrollView style={styles.container}>
// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Line Chart</Text>
// //         <LineChart
// //           data={data.lineChartData}
// //           width={Dimensions.get('window').width - 40}
// //           height={200}
// //           chartConfig={chartConfig}
// //           bezier
// //         />
// //       </View>
// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Bar Chart</Text>
// //         <BarChart
// //           data={data.barChartData}
// //           width={Dimensions.get('window').width - 40}
// //           height={200}
// //           chartConfig={chartConfig}
// //         />
// //       </View>
// //       <View style={styles.section}>
// //         <Text style={styles.sectionTitle}>Pie Chart</Text>
// //         <PieChart
// //           data={data.pieChartData}
// //           width={Dimensions.get('window').width - 40}
// //           height={220}
// //           chartConfig={chartConfig}
// //           accessor="population"
// //           backgroundColor="transparent"
// //           paddingLeft="15"
// //           absolute
// //         />
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const chartConfig = {
// //   backgroundGradientFrom: '#fff',
// //   backgroundGradientFromOpacity: 0,
// //   backgroundGradientTo: '#fff',
// //   backgroundGradientToOpacity: 0.5,
// //   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
// //   strokeWidth: 2,
// //   barPercentage: 0.5,
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#fff',
// //   },
// //   section: {
// //     marginBottom: 20,
// //   },
// //   sectionTitle: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// // });

// // export default RealTimeGraphsScreen;
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const RealTimeGraphsScreen = () => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [0,0,0,0,0,0,0,0,0],
//         color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//       },
//     ],
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://3.137.3.102:3000/api/data');//tanmay wifi
//         // const response = await fetch('http://172.16.80.96:3500/api/data');//college wifi
//         const data = await response.json();
//         const labels = data.map(item => formatTime(item.time)); // Format time here
//         const tempData = data.map(item => item.temperature);

//         setChartData({
//           labels: labels,
//           datasets: [
//             {
//               data: tempData,
//               color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       }
//     };

//     const interval = setInterval(fetchData, 1000); // Fetch data every second

//     return () => clearInterval(interval); // Clean up the interval on unmount
//   }, []);

//   const formatTime = (timeString) => {
//     const date = new Date(timeString);
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Temperature vs Time</Text>
//         <View style={styles.chartContainer}>
//           <LineChart
//             data={chartData}
//             width={Dimensions.get('window').width - 40}
//             height={200}
//             chartConfig={{
//               ...chartConfig,
//               decimalPlaces: 1,
//               formatYLabel: value =>  `${Math.round(value)}°C`, // Format labels as integers with °C suffix
//             min: 25,
//             max: 50,
//             }}
//             bezier
//           />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const chartConfig = {
//   backgroundGradientFrom: '#fff',
//   backgroundGradientFromOpacity: 0,
//   backgroundGradientTo: '#fff',
//   backgroundGradientToOpacity: 0.5,
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//   strokeWidth: 2,
//   barPercentage: 0.5,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     top:250,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   section: {
//     marginBottom: 20,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   chartContainer: {
//     alignItems: 'center',
//   },
// });

// export default RealTimeGraphsScreen;
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import NetInfo from "@react-native-community/netinfo";
import {DATA_API} from '@env';
const RealTimeGraphsScreen = () => {

  const [isConnected, setIsConnected] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const state = await NetInfo.fetch();
        setIsConnected(state.isConnected);

        const response = await fetch(DATA_API); // API endpoint for fetching data
        const data = await response.json();
        const labels = data.map(item => formatTime(item.time)); // Format time here
        const tempData = data.map(item => item.temperature);

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
        <Text style={styles.sectionTitle}>Temperature vs Time</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#fff',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
              decimalPlaces: 1,
              formatYLabel: value => `${Math.round(value)}°C`,
              min: 25,
              max: 50,
            }}
            bezier
          />
        </View>
      </View>
      < View style={[styles.dot, isConnected ? styles.greenDot : styles.redDot]} />
    </ScrollView>
  );
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
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
    right: 8,
    top: 8,
  },
  greenDot: {
    backgroundColor: "green",
  },
  redDot: {
    backgroundColor: "red",
  }
});
export default RealTimeGraphsScreen;

