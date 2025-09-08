import psutil
import datetime
import time

power_status = psutil.sensors_battery().power_plugged

def log(message):
    print(message)
    with open('power.log', 'a') as f:
        f.write(message+'\n')


while True:
    battery = psutil.sensors_battery()
    if not battery.power_plugged:
        log("Power Lost at {}".format(datetime.datetime.now()))
    elif not power_status and psutil.sensors_battery():
        log("Power Restored at {}".format(datetime.datetime.now()))


    power_status = battery.power_plugged

    time.sleep(60 * 5)