//==========================================
// Title:   Wake-up-alarm
// Author:  Linus Nilsson @Jobsdonn
// Date:   6 March 2021
//==========================================

let alarmExist = false;
let alarmId;

let alarmTime = args[0];
let alarms = await Homey.alarms.getAlarms();

// loop through all existing alarms to see if a alarm with that time already exist.
_.forEach(alarms, alarm => {
    if(alarmTime == alarm.time) {
        alarmExist = true;
        alarmId = alarm.id;
    }
})

// If the alarm already exist it change it to enabled and update the alarm.
// else it will creat a new alarm.
if (alarmExist == true) {
    await Homey.alarms.updateAlarm({id: alarmId, alarm: {enabled: true}});
} else {
    await Homey.alarms.createAlarm({alarm: {name: "Alarm", time: alarmTime, enabled: true}});
}

return 0;
