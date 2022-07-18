import React, { useEffect, useState } from 'react'
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { TextInput, Select, NumberInput, Button, Group, Table } from '@mantine/core';
import { Database } from 'tabler-icons-react';
import { supabase } from 'src/lib/supabase/supabase';

export type formValue = {
    //[key: string]: number | null
    id: number;
    subname: string | null;
    deadline: string | null;
    pay_period: string | null;
    membership_fee: number | null;
}

type table = {
    subname: string,
    deadline: string,
    membership_fee: number,
    pay_period: string
}

const Subscription = () => {
    const [tables, setTables] = useState<table[]>()

    const getTableData = async () => {
        const { data, error } = await supabase
            .from('subscription_management')
            .select()

        setTables(data as table[])
    }

    useEffect(() => {
        getTableData()
    }, [])

    return (
        <div className="w-[400px] m-auto">
            <h1 className='text-center'>サブスク管理画面</h1>
            <Table>
                <thead>
                    <tr>
                        <th>サービス名</th>
                        <th>支払い期限日</th>
                        <th>プラン</th>
                        <th>料金</th>
                    </tr>
                </thead>
                <tbody>
                    {tables?.map((table: table) => {
                        return (
                            <tr key={table.subname}>
                                <td>{table.subname}</td>
                                <td>{table.deadline}</td>
                                <td>{table.pay_period}</td>
                                <td>{table.membership_fee}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Subscription