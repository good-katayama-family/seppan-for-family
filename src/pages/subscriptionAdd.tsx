import Link from 'next/link';
import type { NextPage } from "next";
import { supabase } from 'src/lib/supabase/supabase';
import { DatePicker } from '@mantine/dates';
import { TextInput, Select, NumberInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { TableImport, Check } from 'tabler-icons-react';
import type { subsType } from "@lib/type/subs.model"

const SubscriptionAdd: NextPage = () => {

    const form = useForm({
        initialValues: {
            subname: "",
            deadline: null,
            pay_period: "",
            membership_fee: 0
        },
    });

    //データが何も入っていないときは別の処理が必要
    const handleSet = async (values: subsType) => {
        // const { data, error } = await supabase
        //     .from('subscription_management')
        //     .select()
        console.log(values)
        //データを追加 
        handleInsert(values, 1)
    };

    //データを追加
    const handleInsert = async (values: subsType, times: number) => {
        for (let i = 0; i < times; i++) {
            try {

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
                } else if (error) {
                    showNotification({
                        disallowClose: true,
                        autoClose: 2000,
                        title: error.message,
                        message: "",
                        icon: <Check />,
                        color: 'violet',
                        className: 'my-notification-class',
                        loading: false,
                    })
                }
            } catch (e) {
                showNotification({
                    disallowClose: true,
                    autoClose: 2000,
                    title: "登録できませんでした",
                    message: "",
                    icon: <Check />,
                    color: 'violet',
                    className: 'my-notification-class',
                    loading: false,
                })
            }

        }
        form.reset();
    }

    const tentimes = (values: subsType) => {
        handleInsert(values, 20)
    }

    return (
        <div className="w-[230px] m-auto">
            <div className='flex justify-center'>
                <h1>サブスク登録</h1>
                <TableImport
                    size={36}
                    strokeWidth={2}
                    color={'#7950f2'}
                    className="mt-[28px]"
                />

            </div>
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
                    onDropdownClose={() => { console.log("ddd") }}
                    clearable={true}
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
                    <Button variant="light" color="violet" type="submit">
                        登録
                    </Button>
                    <Link href="/subscription">
                        <a>
                            <Button variant="light" color="violet">
                                戻る
                            </Button>
                        </a>
                    </Link>
                    <Button variant="filled" color="red" onClick={form.onSubmit((values) => tentimes(values))}>
                        開発中のみ20個のデータを送る
                    </Button>
                </Group>
            </form>

        </div>
    )
}

export default SubscriptionAdd