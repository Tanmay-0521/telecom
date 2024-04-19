#define RXp2 3
#define TXp2 1

#include <LiquidCrystal.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <time.h>

#define DHTPIN 2       // Digital pin connected to the DHT sensor D2
#define DHTTYPE DHT11  // DHT 11 sensor type

DHT dht(DHTPIN, DHTTYPE);

const char *ssid = "Tanmay";
const char *password = "Tanmay123";
const char *serverAddress = "http://192.168.63.17:3500/data"; // Replace with your server's IP address and port

const char *ntpServer = "in.pool.ntp.org";  // NTP server closer to India
const long gmtOffset_sec = 19800;           // GMT offset for India (5 hours and 30 minutes ahead of GMT)
const int daylightOffset_sec = 0;           // No daylight saving time in India

WiFiClient wifiClient;

#define RXD0 
#define TXD0

#define Key1 22
#define Key2 21
#define Key3 25
#define Key4 27


int acVolts = 0;
int dcVolts =0;
int current1_amp = 0;//rectcurr1
int current2_amp = 0;//rectcurr2
int current3_amp = 0;//rectcurr3
bool error1 = false;// Error-1 Boolean --> Low dc (44V)
bool error2 = false; // Error-2 Boolean --> high ac
bool error3 = false;  // Error-3 Boolean --> low dc (46volt) nahi
bool error4 = false; // Error-4 Boolean -->high dc 
bool error5 = false; // Error-5 Boolean --> mains fail
bool error6 = false; // Error-6 Boolean --> low ac
bool warn1 = false;// Warning-1 Boolean -->low ac
bool warn2 = false; // Warning-2 Boolean --> high ac
bool warn3 = false; // Warning-3 Boolean -->  critical load spd battery 
bool warn4 = false;// Warning-4 Boolean --> high dc>54v
int Key1_sense;
int Key2_sense;
int Key3_sense;
int Key4_sense;
int Key1_state=0;
int Key2_state=0;


int receivedChecksum = 0;
int values[12];
int button_value=1;

LiquidCrystal lcd(18,5,17,16,4,0);
//LiquidCrystal lcd(22,23,5,18,19,21);

void setup() {
  // UART Initialization:
  // Note - Format for setting a Serial Port is as follows:
  // Serial2.begin(baud_rate, protocol, Rx_Pin, Tx_pin);
  pinMode(Key1, INPUT);
  pinMode(Key2, INPUT);
  pinMode(Key3, INPUT);
  pinMode(Key4, INPUT);

  // Serial.begin(115200);testing
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXp2, TXp2);
  
  // LCD Initialization:
      lcd.begin(16,2); 
      lcd.clear();
      lcd.print("TELECOM");

      // go to row 1 column 0, note that this is indexed at 0
      lcd.setCursor(0,1); 
      lcd.print ("POWER SUPPLY");
      delay(3000);

 //wifi initialization
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  //dht at pin2
  dht.begin();
}

void loop() 
{
  Key1_sense = digitalRead(Key1);
  Key2_sense = digitalRead(Key2);
  Key3_sense = digitalRead(Key3);
  Key4_sense = digitalRead(Key4);
  //wifi check
  

  // lcd.clear();
  //lcd.print("ADC Value:");
  //lcd.setCursor(0,1);
  String inputString = "";                                        // initialize an empty string to store the incoming data
  while (Serial2.available()) 
  {
    char c = Serial2.read();                                        // read the incoming byte
    if(c == '$') 
    {                                                              // if the incoming byte is the start of the string
      inputString = "";                                            // clear the input string
    } 
    else if(c == '#') 
    {                                                              // if the incoming byte is the end of the string
                                                                   // split the string by commas
      int index = 0;
      while (index < 16) 
      {
        int commaIndex = inputString.indexOf(",");
        if (commaIndex == -1) 
        {                                                          // if there are no more commas, break the loop
          break;
        }
        String valueString = inputString.substring(0, commaIndex); // extract the value string
        values[index++] = valueString.toInt();            
        // values[index++]=index;      
        // Serial.print("values[index]:"); 
        // Serial.println(values[index]);   // convert the value string to integer and store it in the array
        inputString = inputString.substring(commaIndex + 1);       // remove the value string and the comma from the input string
      }
      acVolts = values[0];//ac volt
      dcVolts = values[1];//dc volt
      current1_amp = values[2];//total rect 3 if curr zero rect is off
      current2_amp = values[3];
      current3_amp = values[4];//decimal total rect current 
      error1 = values[5];
      error2 = values[6];
      error3 = values[7];
      error4 = values[8];
      error5 = values[9];
      error6 = values[10];
      warn1 = values[11];
      warn2 = values[12];
      warn3 = values[13];
      warn4 = values[14];
    } 
    else 
    {                                                              // if the incoming byte is part of the string
      inputString += c;                                            // append the byte to the input string
    }
  //   /*if(error1 || error2 || error3 || error4 || error5 || error6)
  //   {
  //     lcd.print("    ERROR!");
  //     delay(500);
  //     lcd.clear();
  //   } */
  }

      // bool error1 = false;// Error-1 Boolean --> Low dc (44V)
      // bool error2 = false; // Error-2 Boolean --> high ac
      // bool error3 = false;  // Error-3 Boolean --> low dc (46volt) nahi
      // bool error4 = false; // Error-4 Boolean -->high dc 
      // bool error5 = false; // Error-5 Boolean --> mains fail
      // bool error6 = false; // Error-6 Boolean --> low ac
      // bool warn1 = false;// Warning-1 Boolean -->low ac
      // bool warn2 = false; // Warning-2 Boolean --> high ac
      // bool warn3 = false; // Warning-3 Boolean -->  critical load spd battery 
      // bool warn4 = false;// Warning-4 Boolean --> high dc>54v
        //my data dht + time + apka data

    
   
  // LCD();
  Button();
  // LCD_Cur();
 //delay added
   wifihttp();
   lcd.clear();
  
}

void display(){
    lcd.print("AC:");
    lcd.print(acVolts);
    lcd.print("V");
    lcd.print(" DC:");
    lcd.print(dcVolts);
    lcd.print("V");
    lcd.setCursor(0, 1);
    lcd.print("     NO ERROR");
    delay(1000);
   
}

void LCD_VOLTS(){
   if(error2 || error6 || error3 || error4 || error5) 
    {
      if(error5){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("Main Fail-ON Bat");
        // for (int positionCounter = 0; positionCounter < 25; positionCounter++) {
        // // scroll one position left:
        
        // lcd.scrollDisplayLeft();
        // // wait a bit:
        // delay(500);
        // }
        delay(500);
        lcd.clear();
      }else if(error2 && error4){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("HIGH AC & High DC");
        // for (int positionCounter = 0; positionCounter < 25; positionCounter++) {
        // // scroll one position left:
        
        // lcd.scrollDisplayLeft();
        // // wait a bit:
        // delay(500);
        // }
        delay(500);
        lcd.clear();
      }
      else if(error6 && error4){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("LOW AC & High DC");
        // for (int positionCounter = 0; positionCounter < 24; positionCounter++) {
        // // scroll one position left:
        // lcd.scrollDisplayLeft();
        // // wait a bit:
        // delay(150);
        // }
        delay(500);
        lcd.clear();
      }
       else if(error2 && error3){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("HIGH AC & LOW DC");
        // for (int positionCounter = 0; positionCounter < 24; positionCounter++) {
        // // scroll one position left:
        // lcd.scrollDisplayLeft();
        // // wait a bit:
        // delay(150);
        // }

        delay(500);
        lcd.clear();
      }
       else if(error3 && error6){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("LOW AC & LOW DC");
        // for (int positionCounter = 0; positionCounter < 23; positionCounter++) {
        //       // scroll one position left:
               
        //         lcd.scrollDisplayLeft();
        //         // wait a bit:
        //         delay(300);
        //     }

        delay(500);
        lcd.clear();
      }
      else if(error2){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("HIGH AC VOLTAGE");
        delay(500);
        lcd.clear();
      }
      else if(error6){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("LOW AC VOLTAGE");
        delay(500);
        lcd.clear();
      }
      else if(error4){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("HIGH DC VOLTAGE");
        delay(500);
        lcd.clear();
      }
      else if(error3){
        lcd.print("AC:");
        lcd.print(acVolts);
        lcd.print("V");
        lcd.print(" DC:");
        lcd.print(dcVolts);
        lcd.print("V");
        lcd.setCursor(0, 1);
        lcd.print("LOW DC VOLTAGE");
        delay(500);
        lcd.clear();
      }
      
      
    }
    else{
      display();
    }

}

void LCD_Cur(){
        lcd.clear();
        lcd.print("Ib:");
        lcd.print(current2_amp);
        lcd.print("A");
        lcd.print(" Idc:");
        lcd.print(current1_amp);
        lcd.print("A");
        lcd.setCursor(0, 1);
        lcd.print("CURRENT VALUES");
        delay(500);
}

void Button(){
  Serial.println("WORK");
  if(Key1_sense == LOW){
    button_value=2;
  }
  else if (Key1_sense==HIGH){
    button_value=1;
  }

  switch (button_value){
     case 1:
            LCD_VOLTS();
            break;
 
        case 2:
           LCD_Cur();
            break;
 
        case 3:
            printf("Case 3 is Matched.");
            break;
        case 4:
            printf("Case 3 is Matched.");
            break;
  }
}
void wifihttp()
{
  if (WiFi.status() == WL_CONNECTED) {
    // Fetch time from NTP server
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
      Serial.println("Failed to obtain time");
      return;
    }
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    //time in iso 8601 fromat
    char time[20]; // Buffer for formatted time string
    sprintf(time, "%d-%02d-%02dT%02d:%02d:%02d",
            timeinfo.tm_year + 1900, timeinfo.tm_mon + 1, timeinfo.tm_mday,
            timeinfo.tm_hour, timeinfo.tm_min, timeinfo.tm_sec);

  String postData = "temperature=";
postData += String(27.5);
postData += "&humidity=";
postData += String(67);
postData += "&time=";
postData += String(time);
postData += "&Acvolt=";
postData += String(acVolts);
postData += "&Dcvolt=";
postData += String(dcVolts);
postData += "&Rect1curr=";
postData += String(current1_amp);
postData += "&Rect2curr=";
postData += String(current2_amp);
postData += "&Rect3curr=";
postData += String(current3_amp);
postData += "&Lowdc=";
postData += String(error1);
postData += "&highac=";
postData += String(error2);
postData += "&lowdc46=";
postData += String(error3);
postData += "&highdc=";
postData += String(error4);
postData += "&Mainsfail=";
postData += String(error5);
postData += "&Lowac=";
postData += String(error6);
postData += "&wlowac=";
postData += String(warn1);
postData += "&whighac=";
postData += String(warn2);
postData += "&wcriticalloadspdb=";
postData += String(warn3);
postData += "&whighdc54v=";
postData += String(warn4);
    Serial.print("String");
    Serial.print(postData);
    HTTPClient http;
    http.begin(wifiClient, serverAddress);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpResponseCode = http.POST(postData);

    if (httpResponseCode == 200) {
      Serial.println("Data sent to local server successfully");
    } else {
      Serial.println("Error sending data to local server");
      Serial.print("HTTP response code: ");
      Serial.println(httpResponseCode);
    }

    http.end();
}
    else {
    Serial.println("WiFi not connected. Retry...");
    delay(5000); // Retry after 5 seconds
  }
   delay(2000);
}
