import React, { useEffect, useState } from 'react'
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { TextInput, Select, NumberInput, Button, Group, ThemeIcon, Notification } from '@mantine/core';
import { Database } from 'tabler-icons-react';
import { useForm } from '@mantine/hooks';
import { supabase } from 'src/lib/supabase/supabase';
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

export type formValue = {
    //[key: string]: number | null
    subname: string | null;
    deadline: string | null;
    pay_period: string | null;
    membership_fee: number | null;
}

const SubscriptionAdd = () => {

    const form = useForm({
        initialValues: {
            subname: "",
            deadline: "",
            pay_period: "",
            membership_fee: 0
        },
    });
    const handleSet = async (values: formValue) => {
        const { data, error } = await supabase
            .from('subscription_management')
            .select()
        console.log(values)

        //存在しないならデータを追加 
        if (data?.length === 0) {
            handleInsert(values)
        } else {
            handleUpdate(values, data![0].id)
        }
    };
    //データを更新
    const handleUpdate = async (values: formValue, id: number) => {
        const { data, error } = await supabase
            .from('subscription_management')
            .update({
                subname: values.subname,
                deadline: values.deadline,
                pay_period: values.pay_period,
                membership_fee: values.membership_fee

            })
            .match({ id: id })
        if (data) {
            showNotification({
                disallowClose: true,
                autoClose: 2000,
                title: "登録できました！！",
                message: "",
                icon: <Check />,
                color: 'violet',
                className: 'my-notification-class',
                loading: false,
            })
        }
    };
    useEffect(() => {

    });
    //データを追加
    const handleInsert = async (values: formValue) => {
        const { data, error } = await supabase
            .from('subscription_management')
            .insert([
                {
                    subname: values.subname,
                    deadline: values.deadline,
                    pay_period: values.pay_period,
                    membership_fee: values.membership_fee
                }
            ])
    }


    return (
        <div className="w-[200px] m-auto">
            <h1>サブスク登録</h1>
            {/* <Notification icon={<Check size={20} />} onClose={()=>{}} color="violet" title="サブスク管理に登録されました！"></Notification> */}
            <form onSubmit={form.onSubmit((values) => handleSet(values))}>
                <TextInput
                    required
                    label="サービス名"
                    {...form.getInputProps('subname')}
                />
                <DatePicker
                    required
                    placeholder={""}
                    label="支払い期限日"
                    {...form.getInputProps('deadline')}
                />
                <Select
                    label="支払い周期"
                    required
                    data={[
                        { value: '年', label: '年額' },
                        { value: '月', label: '月額' },
                    ]}
                    {...form.getInputProps('pay_period')}
                />
                <NumberInput
                    required
                    hideControls={true}
                    label="料金"
                    placeholder="550"
                    {...form.getInputProps('membership_fee')}
                />
                <Group position="center" mt="md">
                    <Button leftIcon={<Database />} variant="light" color="violet" type="submit">
                        登録
                    </Button>
                </Group>
            </form>

        </div>
    )
}

export default SubscriptionAdd