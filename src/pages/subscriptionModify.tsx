import type { NextPage } from "next";
import React, { FC, useEffect, useState } from 'react'
import { supabase } from '@lib/supabase/supabase';
import Link from "next/link";
import type { subsType } from "@lib/type/subs.model"
import { Check, FileDatabase, TableImport } from 'tabler-icons-react';
import { Button, Group, Modal, NumberInput, Select, Table, TextInput } from '@mantine/core';
import dayjs from "dayjs"
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { showNotification } from "@mantine/notifications";
import { toast } from "@lib/toast/toast";



const SubscriptionModify: NextPage = () => {
    const [subsData, setSubsData] = useState<subsType[]>()
    const [isOpend, setIsOpend] = useState<boolean>(false)
    const [id, setId] = useState<number>(0)
    const [value, setValue] = useState<Date>()

    const form = useForm({
        initialValues: {
            subname: "",
            deadline: "",
            pay_period: "",
            membership_fee: 0
        }
    });

    const getSubsData = async () => {
        try {
            const { data, error } = await supabase
                .from('subscription_management')
                .select('*')
                .order('id')

            if (!data || error) {
                alert("もう一回やり直してください")
                return
            }

            if (data) {
                // const subsData = data?.map((item) => {
                //     const deadline = dayjs(item.deadline).format("YYYY/MM/DD")
                //     return { ...item, deadline }
                // })
                setSubsData(data as subsType[])
            }

        } catch (e) {
            console.error(e)
        }
    }

    const handleEdit = (data: subsType) => {
        setIsOpend(true);
        //const deadline = dayjs(data.deadline).format("YYYYMMDD")
        console.log(data)

        form.setValues({
            subname: data.subname,
            deadline: data.deadline!,
            pay_period: data.pay_period,
            membership_fee: data.membership_fee
        });

        const date = new Date(data.deadline!)
        setValue(date)
        setId(data.id!)
    }


    useEffect(() => {
        getSubsData();
        const subscription = supabase
            .from('subscription_management')
            // .onの第一引数には'INSERT'や'UPDATE'などアクションを限定して指定することも可能
            .on('*', (payload) => {
                getSubsData();
                console.log('Change received!', payload);
            })
            .subscribe();
    }, [])


    return (
        <div className="w-[500px] m-auto">
            <EditModal
                isOpend={isOpend}
                setIsOpend={setIsOpend}
                form={form}
                id={id}
                value={value!}
            />

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
                })}>
                <thead className='bg-gray-200'>
                    <tr>
                        <th></th>
                        <th>サービス名</th>
                        <th>支払い期限日</th>
                        <th>プラン</th>
                        <th>料金</th>
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {subsData?.map((data: subsType) => {
                        return (
                            <tr key={data.id}>
                                <td><Button variant="light" color="violet" onClick={() => handleEdit(data)}>編集</Button></td>
                                <td>{data.subname}</td>
                                <td>{dayjs(data.deadline).format("YYYY/MM/DD")}</td>
                                <td>{data.pay_period}</td>
                                <td>{data.membership_fee.toLocaleString()}</td>
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

//Modalコンポーネント
type Props = {
    isOpend: boolean;
    setIsOpend: React.Dispatch<React.SetStateAction<boolean>>
    id: number
    form: UseFormReturnType<{
        subname: string;
        deadline: string;
        pay_period: string;
        membership_fee: number;
    }>
    value: Date
}

const EditModal: FC<Props> = ({ isOpend, setIsOpend, id, form, value }) => {

    console.log(id)

    const handleUpdate = async (values: subsType) => {
        console.log(id)
        try {
            const { data, error } = await supabase
                .from('subscription_management')
                .update([
                    {
                        subname: values.subname,
                        deadline: values.deadline,
                        pay_period: values.pay_period,
                        membership_fee: values.membership_fee
                    }
                ])
                .match({ id: id })
            if (data) {
                toast("更新", "violet", false)
                setIsOpend(false);
            } else if (error) {
                toast("更新", "red", true)
            }
        } catch (e) {
            toast("更新", "red", true)
        }


    };

    const handleDelete = async () => {
        try {
            const { data, error } = await supabase
                .from('subscription_management')
                .delete()
                .match({ id: id })
            if (data) {
                showNotification({
                    disallowClose: true,
                    autoClose: 2000,
                    title: "削除できました！！",
                    message: "",
                    icon: <Check />,
                    color: 'violet',
                    className: 'my-notification-class',
                    loading: false,
                })
                setIsOpend(false);
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
        } catch {
            showNotification({
                disallowClose: true,
                autoClose: 2000,
                title: "削除できませんでした",
                message: "",
                icon: <Check />,
                color: 'violet',
                className: 'my-notification-class',
                loading: false,
            })
        }
    }

    return (
        <Modal
            opened={isOpend}
            onClose={() => setIsOpend(false)}
            padding="xs"
            withCloseButton={false}
        >
            <div>
                <div className='flex justify-center'>
                    <h1>サブスク修正・削除</h1>
                    <TableImport
                        size={36}
                        strokeWidth={2}
                        color={'#7950f2'}
                        className="mt-[28px]"
                    />
                </div>
                <form className="w-[230px] m-auto" onSubmit={form.onSubmit((values) => handleUpdate(values))}>
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
                        value={value!}
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
                            修正
                        </Button>
                        <Button variant="light" color="violet" onClick={() => handleDelete()}>
                            削除
                        </Button>
                    </Group>
                </form>
            </div>
        </Modal>
    )
}



export default SubscriptionModify