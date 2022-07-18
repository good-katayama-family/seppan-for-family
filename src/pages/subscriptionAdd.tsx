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

        //データを追加 
        handleInsert(values)
    };

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

            form.reset();

        }
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
                    label="プラン"
                    required
                    data={[
                        { value: '年額', label: '年額' },
                        { value: '月額', label: '月額' },
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