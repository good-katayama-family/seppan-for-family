import React, { useState } from 'react'
import { DatePicker, DateRangePicker } from '@mantine/dates';
import { TextInput, Select, NumberInput, Button, Group } from '@mantine/core';
import { Database } from 'tabler-icons-react';

const Subscription = () => {
    const [subname, setSubname] = useState('');
    const [payday, onChange] = useState<Date>(new Date());
    return (
        <div className="w-[200px] m-auto">
            <h1>サブスク管理</h1>
            <TextInput
                required
                value={subname}
                label="サービス名"
                onChange={(event) => setSubname(event.currentTarget.value)} />
            <DatePicker
                required
                placeholder={""}
                value={payday}
                onChange={onChange as any}
                label="支払い期限日"
            />
            <Select
                label="支払い周期"
                required
                data={[
                    { value: 'parYear', label: '年額' },
                    { value: 'perMonth', label: '月額' },
                ]}
            />
            <NumberInput
                required
                hideControls={true}
                label="料金"
                placeholder="550"
            />
            <Group position="center" mt="md">
                <Button leftIcon={<Database />} variant="light" color="violet">
                    登録
                </Button>
            </Group>

        </div>
    )
}

export default Subscription