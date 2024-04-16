// import * as React from 'react';
// import { BarChart } from '@mui/x-charts/BarChart';

// function ChartsOverviewDemo() {
//     const revenueData = [4500, 2000, 6120, 5550, 2000, 7560, 10820];
//     const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//     return (
//         <BarChart
//             series={[{ data: revenueData }]}
//             height={290}
//             width={500}
//             xAxis={[{ data: xLabels, scaleType: 'band' }]}
//             margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
//         />
//     );
// }

// export default ChartsOverviewDemo;

// import React from 'react';
// import { Chart } from 'react-google-charts';

// const data = [
//     ['City', '2010 Population', '2000 Population'],
//     ['New York City, NY', 8175000, 8008000],
//     ['Los Angeles, CA', 3792000, 3694000],
//     ['Chicago, IL', 2695000, 2896000],
//     ['Houston, TX', 2099000, 1953000],
//     ['Philadelphia, PA', 1526000, 1517000],
// ];

// const options = {
//     title: 'Population of Largest U.S. Cities',
//     chartArea: { width: '50%' },
//     hAxis: {
//         title: 'Total Population',
//         minValue: 0,
//     },
//     vAxis: {
//         title: 'City',
//     },
// };

// function RevenueChart() {
//     return <Chart chartType="BarChart" width="100%" height="400px" data={data} options={options} />;
// }

// export default RevenueChart;

import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';

const chartSetting = {
    yAxis: [
        {
            label: 'Doanh thu (triệu đồng)',
        },
    ],
    width: 540,
    height: 360,
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-10px, 0)',
        },
        [`.${axisClasses.tickLabel}`]: { fontSize: '20px' },
    },
};
const dataset = [
    {
        revenue: 2.4,
        day: 'Thứ hai',
    },
    {
        revenue: 5.9,
        day: 'Thứ ba',
    },
    {
        revenue: 6.1,
        day: 'Thứ tư',
    },
    {
        revenue: 7,
        day: 'Thứ năm',
    },
    {
        revenue: 2.7,
        day: 'Thứ sáu',
    },
    {
        revenue: 10.5,
        day: 'Thứ bảy',
    },
    {
        revenue: 6,
        day: 'Chủ nhật',
    },
];

const valueFormatter = (value) => `${value} triệu đồng`;

function RevenueChart() {
    return (
        <BarChart
            dataset={dataset}
            xAxis={[
                {
                    scaleType: 'band',
                    dataKey: 'day',
                    categoryGapRatio: 0.4,
                },
            ]}
            series={[
                {
                    dataKey: 'revenue',
                    valueFormatter,
                    color: '#51829B',
                },
            ]}
            {...chartSetting}
        />
    );
}

export default RevenueChart;
