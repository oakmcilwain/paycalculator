export default defineEventHandler((event) => {
    return {
        id: 1,
        name: '2023-2024',
        medianIncome: 65000,
        brackets: [
            {
                beginsAt: 0,
                endsAt: 18200,
                rate: 0,
            },
            {
                beginsAt: 18201,
                endsAt: 45000,
                rate: 0.19,
            },
            {
                beginsAt: 45001,
                endsAt: 120000,
                rate: 0.325,
            },
            {
                beginsAt: 120001,
                endsAt: 180000,
                rate: 0.37,
            },
            {
                beginsAt: 180001,
                endsAt: 100000000000000,
                rate: 0.45,
            }
        ]
    }
});