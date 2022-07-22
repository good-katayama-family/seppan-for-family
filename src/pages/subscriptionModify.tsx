import type { NextPage } from "next";
import React, { useEffect, useState } from 'react'
import { supabase } from 'src/lib/supabase/supabase';
import Link from "next/link";
import type { subsType } from "@lib/type/subs.model"
import { FileDatabase } from 'tabler-icons-react';
import { Button, Group, Table } from '@mantine/core';


const SubscriptionModify: NextPage = () => {
    const [tables, setTables] = useState<subsType[]>()

    const getTableData = async () => {
        const { data, error } = await supabase
            .from('subscription_management')
            .select()

        setTables(data as subsType[])
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
                    {tables?.map((table: subsType) => {
                        return (
                            <tr key={table.id}>
                                <td>{table.subsname}</td>
                                <td>{table.deadline}</td>
                                <td>{table.pay_period}</td>
                                <td>{table.membership_fee.toLocaleString()}</td>
                                <td><Button variant="light" color="violet" onClick={() => handleDelete(table.id!)}>×</Button></td>
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

export default SubscriptionModify