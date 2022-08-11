import { useState } from 'react';
import { Modal, Button, Group, TextInput, NumberInput, Select } from '@mantine/core';
import { Check, TableImport } from 'tabler-icons-react';
import { DatePicker } from '@mantine/dates';
import { supabase } from 'src/lib/supabase/supabase';
import { showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';

export type formValue = {
    //[key: string]: number | null
    subname: string | null;
    deadline: string | null;
    pay_period: string | null;
    membership_fee: number | null;
}

const Pop = () => {
    const [opened, setOpened] = useState(false);
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
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                padding="xs"
                withCloseButton={false}
            >
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
                        </Group>
                    </form>

                </div>
                {/* Modal content */}
            </Modal>

            <Group position="center">
                <Button onClick={() => setOpened(true)}>Open Modal</Button>
            </Group>
        </>
    );
}
export default Pop