import React, { FC } from 'react';
import { ReportMoney } from 'tabler-icons-react'

export const HeaderComp: FC = () => {
    return (
        <div className="flex justify-start">
            <span className="text-center font-bold text-[28px] mt-[0px]">Money Half</span>
            <ReportMoney
                size={36}
                strokeWidth={2}
                color={'#7950f2'}
                className="mt-[2px]"
            />
        </div>
    )
}
