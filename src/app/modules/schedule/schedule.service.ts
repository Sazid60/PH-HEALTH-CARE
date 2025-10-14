import { addHours, addMinutes, format } from "date-fns";
import { prisma } from "../../shared/prisma";

// ========================
// 🧩 PURPOSE OF FUNCTION
// ========================
// This function takes a date range (startDate → endDate)
// and a time range (startTime → endTime),
// then automatically generates 30-minute time slots
// for each day in that range.
//
// Each time slot is stored in the database (if it doesn’t already exist)
// using Prisma ORM. 
//
// Example:
// Input → startDate: "2025-10-14", endDate: "2025-10-15", startTime: "09:00", endTime: "12:00"
// Output → Creates time slots like:
//  2025-10-14 09:00 - 09:30
//  2025-10-14 09:30 - 10:00
//  ...
//  2025-10-15 11:30 - 12:00
// ========================

const insertIntoDB = async (payload: any) => {

    // Destructure user-provided values from request body or input payload
    const { startTime, endTime, startDate, endDate } = payload;

    const intervalTime = 30; // each appointment slot will be 30 minutes long
    const schedules: any[] = []; // this will store all newly created schedule entries

    // Convert plain date strings (like "2025-10-14") into JavaScript Date objects
    const currentDate = new Date(startDate); // will start from this day
    const lastDate = new Date(endDate);      // will stop at this day

    // ===============================
    // 🔁 OUTER LOOP (for each date)
    // ===============================
    // This loop will run for each day between startDate → endDate.
    // Example: if startDate=Oct 14 and endDate=Oct 16,
    // this loop runs 3 times → Oct 14, 15, 16
    while (currentDate <= lastDate) {

        // Build a DateTime object for when the workday starts (e.g., "09:00" on this date)
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    // format(currentDate, "yyyy-MM-dd") converts the Date object to a string like "2025-10-14"
                    // ❗️But note: passing a string to addHours is logically wrong (addHours expects a Date)
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]) // Extract the "hour" part from "09:00" → 9
                ),
                Number(startTime.split(":")[1])     // Extract the "minute" part from "09:00" → 0
            )
        );

        // Build a DateTime object for when the workday ends (e.g., "17:00" on this date)
        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0])   // Extract hour part from endTime → e.g. 17
                ),
                Number(endTime.split(":")[1])       // Extract minute part → e.g. 0
            )
        );

        // ===========================================
        // 🔁 INNER LOOP (for each time slot of the day)
        // ===========================================
        // Example: if startTime=09:00 and endTime=12:00,
        // this loop will create slots like:
        // 09:00–09:30, 09:30–10:00, 10:00–10:30, ...
        while (startDateTime < endDateTime) {
            
            // Define start and end of the current 30-minute slot
            const slotStartDateTime = startDateTime;                 // current start time
            const slotEndDateTime = addMinutes(startDateTime, intervalTime); // add 30 minutes for the end time

            // Build an object representing this slot (this is what will be saved in DB)
            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            };

            // 🔍 Step 1: Check if a schedule with exactly the same times already exists in DB
            // We don’t want duplicate schedule slots in the table.
            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            });

            // ✅ Step 2: If it doesn’t exist, insert it into the database
            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedules.push(result); // add the created record to our local array
            }

            // ⏩ Step 3: Move the start time 30 minutes forward for the next slot
            // Example: if current slot was 09:00–09:30, next will be 09:30–10:00
            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        // 📅 Step 4: Once we’re done with one full day, move to the next date
        // This increases "currentDate" by 1 day.
        // Example: from 2025-10-14 → 2025-10-15
        currentDate.setDate(currentDate.getDate() + 1);
    }

    // 🧾 Return all newly created schedules so the caller can see what was generated
    return schedules;
};


// Export this service so it can be imported in other modules, like controllers
export const ScheduleService = {
    insertIntoDB
};
