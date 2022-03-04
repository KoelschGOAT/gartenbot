import serial
import time
import mysql.connector 

 
prozent_bofeu = int(0)
prozent_wape = int(0)
 
arduino = serial.Serial("/dev/ttyACM0", 9600)
 
while (True):
    prozent_bofeu = arduino.readline().strip()
    time.sleep(2)
    prozent_wape = arduino.readline().strip()
    prozent_bofeu = int(prozent_bofeu)
    prozent_wape = int(prozent_wape)
    if prozent_bofeu <0 or prozent_wape <0:
        prozent_bofeu = 0
        prozent_wape = 0
    
 
    print(prozent_bofeu, prozent_wape)
    mydb = mysql.connector.connect(host='192.168.93.73', user='azubi3', password='ENERCON_01', database='gartenbot');
    with mydb:
        mycursor = mydb.cursor()
        sql = "INSERT INTO sensor(pegel, feuchte) VALUES (%s, %s)"
        
                      
        val = (prozent_wape, prozent_bofeu)
        mycursor.execute(sql,val)
        mydb.commit()
        mydb.close()
