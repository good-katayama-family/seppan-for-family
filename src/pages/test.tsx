import { Button } from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import React from 'react'
import { supabase } from 'src/lib/supabase/supabase';
import { CircleCheck } from 'tabler-icons-react';

const test = () => {
    const handleAdd = async () => {
        const { data, error } = await supabase
            .from('test')
            .insert([
                { yatinn: 56080 }
            ])
        console.log("honokatyannkawaii");
    };
    const handleDelete = async () => {
        const { data, error } = await supabase
            .from('test')
            .delete()
            .match({ id: 1 })
    }
    const handleUpdate = async () => {
        const { data, error } = await supabase
            .from('test')
            .update({ yatinn: 45000 })
            .match({ id: 1 })
    }
    const handleGet = async () => {
        const { data, error } = await supabase
            .from('test')
            .select()


        console.log(data, error)
    }
    return (
        <div>
            <div>test</div>
            <Button
                variant="outline"
                onClick={() =>
                    showNotification({
                        id: 'hello-there',
                        disallowClose: false,
                        onClose: () => console.log('unmounted'),
                        onOpen: () => console.log('mounted'),
                        //autoClose: 5000,
                        title: "You've been compromised",
                        message: 'Leave the building immediately',
                        color: 'red',
                        icon: <CircleCheck
                            size={96}
                            strokeWidth={1}
                            color={'#ad40bf'}
                        />,
                        className: 'my-notification-class',
                        // style: { backgroundColor: 'red' },
                        // sx: { backgroundColor: 'red' },
                        loading: true,
                    })
                }
            >
                Show notification
            </Button>
            <Button onClick={handleAdd}>追加</Button>
            <Button onClick={handleDelete}>削除</Button>
            <Button onClick={handleUpdate}>更新</Button>
            <Button onClick={handleGet}>取得</Button>
        </div>
    )
}

export default test