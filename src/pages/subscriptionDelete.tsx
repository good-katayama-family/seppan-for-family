import React, { useEffect, useState } from 'react'
import { Button, Group, Table } from '@mantine/core';
import { FileDatabase } from 'tabler-icons-react';
import { supabase } from 'src/lib/supabase/supabase';
import Link from "next/link";

export type formValue = {
    //[key: string]: number | null
    id: number;
    subname: string | null;
    deadline: string | null;
    pay_period: string | null;
    membership_fee: number | null;
}

type table = {
    id: number,
    subname: string,
    deadline: string,
    membership_fee: number,
    pay_period: string
}

const SubscriptionDelete = () => {
    const [tables, setTables] = useState<table[]>()

    const getTableData = async () => {
        const { data, error } = await supabase
            .from('subscription_management')
            .select()

        setTables(data as table[])
    }
    const handleDelete = async (id: number) => {
        const { data, error } = await supabase
            .from('subscription_management')
            .delete()
            .match({ id: id })
    }

    useEffect(() => {
        getTableData();
        // subscriptionを生成
        const subscription = supabase
            .from('subscription_management')
            // .onの第一引数には'INSERT'や'UPDATE'などアクションを限定して指定することも可能
            .on('*', (payload) => {
                getTableData();
                console.log('Change received!', payload);
            })
            .subscribe();

        return () => {
            // アンマウント時にsubscriptionを解除
            if (subscription) {
                supabase.removeSubscription(subscription);
            }
        };

    }, [])

    // const realTime = () =á {
    //     const mySubscription = supabase
    //         .from('*')
    //         .on('*', payload => {
    //             console.log('Change received!', payload)
    //         })
    //         .subscribe()
    // }

    return (
        <div className="w-[500px] m-auto">
            <div className='flex justify-center'>
                <h1 className='text-center'>サブスク修正・削除</h1>
                <FileDatabase
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tables?.map((table: table) => {
                        return (
                            <tr key={table.id}>
                                <td>{table.subname}</td>
                                <td>{table.deadline}</td>
                                <td>{table.pay_period}</td>
                                <td>{table.membership_fee.toLocaleString()}</td>
                                <td><Button variant="light" color="violet" onClick={() => handleDelete(table.id)}>×</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Group position="center" mt="md">
                <Link href="/subscription">
                    <a>
                        <Button variant="light" color="violet" type="submit">
                            戻る
                        </Button>
                    </a>
                </Link>
            </Group>
        </div>
    )
}

export default SubscriptionDelete