#include <WiFi.h>
#include <ThingSpeak.h>
#include <DHT.h>

#define DHTPIN 2       // Digital pin connected to the DHT sensor D2
#define DHTTYPE DHT11  // DHT 11 sensor type

DHT dht(DHTPIN, DHTTYPE);

// Replace these with your ThingSpeak channel details
const char *ssid = "Roomies";
const char *password = "biryani@123";
const char *thingSpeakApiKey = "IGANU31PIYJNBGTT";
const unsigned long channelID = 2409420;

WiFiClient client;

const char *ntpServer = "in.pool.ntp.org";  // NTP server closer to India
const long gmtOffset_sec = 19800;           // GMT offset for India (5 hours and 30 minutes ahead of GMT)
const int daylightOffset_sec = 0;           // No daylight saving time in India

void setup() {
  Serial.begin(9600);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  ThingSpeak.begin(client);
  dht.begin();
}

void loop() {
  // Fetch time from NTP server
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return;
  }

  // Read sensor data
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  time_t timestamp = mktime(&timeinfo); // Convert timeinfo to UNIX timestamp

  Serial.print("Time: ");
  Serial.print(asctime(&timeinfo));  // Print time in human-readable format
  Serial.print(" Humidity: ");
  Serial.print(humidity);
  Serial.print("% Temperature: ");
  Serial.println(temperature);

  // Feed data to ThingSpeak along with current time
  int writeResult1 = ThingSpeak.writeField(channelID, 1, temperature, thingSpeakApiKey);
  delay(15000); // Delay between writes
  int writeResult2 = ThingSpeak.writeField(channelID, 2, humidity, thingSpeakApiKey);
  delay(15000); // Delay between writes
  int writeResult3 = ThingSpeak.writeField(channelID, 3, timestamp, thingSpeakApiKey);
  delay(15000); // Delay between writes

  if (writeResult1 == 200 && writeResult2 == 200 && writeResult3 == 200) {
    Serial.println("Data sent to ThingSpeak successfully");
  } else {
    Serial.println("Error sending data to ThingSpeak");
    Serial.print("HTTP response codes: ");
    Serial.print(writeResult1);
    Serial.print(", ");
    Serial.print(writeResult2);
    Serial.print(", ");
    Serial.println(writeResult3);
  }

  delay(15000);  // Update every 15 seconds
}
