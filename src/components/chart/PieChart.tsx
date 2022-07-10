/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { formValue } from "@pages/index";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    ratioOfpayment: formValue
    ratio: number;
}

export const PieChart: FC<Props> = ({ ratioOfpayment, ratio }) => {

    return useMemo(() => {
        const { rent, utilityCost, waterCost, foodCost, communicationCost } = ratioOfpayment

        const data = {
            labels: ['家賃', '光熱費', '水道代', '食費', '交際費'],
            datasets: [
                {
                    label: '# of Votes',
                    data: [
                        Math.round(rent! * (ratio / 10)),
                        Math.round(utilityCost! * (ratio / 10)),
                        Math.round(waterCost! * (ratio / 10)),
                        Math.round(foodCost! * (ratio / 10)),
                        Math.round(communicationCost! * (ratio / 10))
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <div className='w-[300px] h-[300px] m-auto pt-3'>
                <Pie data={data} />
            </div>
        )
    }, [ratioOfpayment])
}