import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const ChartComponent = (props) => {

    const { revenueData } = props

    const labels = revenueData.map(item => item._id);
    const revenue = revenueData.map(item => item.totalRevenue);




    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Total Revenue',
                data: revenue,
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Màu nền của các cột
                borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của các cột
                borderWidth: 1, // Độ dày của viền
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Total Revenue',
                },
                beginAtZero: true,
            },
        },
    };


    return (
        <div>
            <Bar options={ options } data={ chartData } />
        </div>
    );
};

export default ChartComponent;
