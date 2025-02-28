import dayjs from 'dayjs';

export function generateDate(month = dayjs().month(), year = dayjs().year()) {
    const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
    const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

    const arrayOfDate = [];

    // Adjust the start of the week to Monday
    const startOfWeekAdjustment = firstDateOfMonth.day() === 0 ? 6 : firstDateOfMonth.day() - 1;
    
    // Generate prefix dates (previous month days)
    for (let i = startOfWeekAdjustment; i > 0; i--) {
        arrayOfDate.push({
            currentMonth: false,
            date: firstDateOfMonth.subtract(i, 'day').clone(),
        });
    }

    // Generate current month dates
    for (let i = 1; i <= lastDateOfMonth.date(); i++) {
        const currentDate = firstDateOfMonth.set('date', i).clone();
        arrayOfDate.push({
            currentMonth: true,
            date: currentDate,
            today: currentDate.isSame(dayjs(), 'date'),
        });
    }

    // Generate remaining days to fill a 6-week calendar view (42 days)
    const remainingDays = 42 - arrayOfDate.length;
    for (let i = 1; i <= remainingDays; i++) {
        arrayOfDate.push({
            currentMonth: false,
            date: lastDateOfMonth.add(i, 'day').clone(),
        });
    }

    return arrayOfDate;
}

export const months = [
    'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
    'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември',
];
