import Link from "next/link";
import type { NextPage } from "next";
import React, { useEffect, useState } from 'react'
import { supabase } from 'src/lib/supabase/supabase';
import { Button, Group, Table } from '@mantine/core';
import { Table as Table_icon } from 'tabler-icons-react';
// import type { subsFormType } from "@lib/type/subsForm.model"
import type { subsType } from "@lib/type/subs.model"
import dayjs from "dayjs"



const Subscription: NextPage = () => {
    const [subsData, setSubsData] = useState<subsType[]>()

    const getSubsData = async () => {
        try {
            const { data, error } = await supabase
                .from('subscription_management')
                .select()
            const subsData = data?.map((item) => {
                const deadline = dayjs(item.deadline).format("YYYY/MM/DD")
                return { ...item, deadline }
            })
            console.log(subsData)
            if (error) {
                alert("もう一回やり直してください")
            }
            setSubsData(subsData as subsType[])
        } catch (e) {
            alert("error")
        }
    }

    useEffect(() => {
        getSubsData()
    }, [])

    return (
        <div className="w-[400px] m-auto">
            <div className='flex justify-center'>
                <h1 className='text-center'>サブスク管理画面</h1>
                <Table_icon
                    size={36}
                    strokeWidth={2}
                    color={'#7950f2'}
                    className="mt-[28px]"
                />
            </div>
            <Table striped
                sx={(theme) => ({
                    backgroundColor: theme.colors.gray[1],
                    // '&:hover': {
                    //     backgroundColor: theme.colors.violet[1],
                    // },
                })}>
                <thead className='bg-gray-200'>
                    <tr>
                        <th>サービス名</th>
                        <th>支払い期限日</th>
                        <th>プラン</th>
                        <th>料金</th>
                    </tr>
                </thead>
                <tbody>
                    {subsData?.map((table: subsType) => {
                        return (
                            <tr key={table.id}>
                                <td>{table.subname}</td>
                                <td>{table.deadline}</td>
                                <td>{table.pay_period}</td>
                                <td>{table.membership_fee.toLocaleString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Group position="center" mt="md">
                <Link href="/subscriptionAdd">
                    <a>
                        <Button variant="light" color="violet" type="submit">
                            追加
                        </Button>
                    </a>
                </Link>
                <Link href="/subscriptionModify">
                    <a>
                        <Button variant="light" color="violet" type="submit">
                            修正
                        </Button>
                    </a>
                </Link>

            </Group>
        </div>
    )
}

export default Subscription