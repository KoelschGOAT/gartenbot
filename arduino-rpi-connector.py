import serial
import time
import mysql.connector as mdb

 
prozent_bofeu = int(0)
prozent_wape = int(0)
 
arduino = serial.Serial("/dev/ttyACM0", 9600)
 
while (True):
    prozent_bafeu = arduino.readline().strip()
    time.sleep(2)
    prozent_wape = rduino.readline().strip()
    
    bodenfeuchte = prozent_bofeu
    wasserpegel = prozent_wape
    
    prozent_bofeu = int(prozent_bofeu)
    prozent_wape = int(prozent_wape)
    if(prozent_bafeu<=0 or prozent_wape<=0):
        prozent_bafeu=0
        
        prozent_wape=0
 
    print(prozent_bofeu, prozent_wape)
    con = mdb.connector.connect(hostname='192.168.93.73', user='azubi3', password='ENERCON_01', database='gartenbot');
    with con:
        corsur = con.cursor()
        cursor.execute("INSERT INTO sensor(pegel, feuchte) VALUES (%s, %s)",
                       prozent_wape, prozent_bofeu)
        con.commit()
        con.close()
