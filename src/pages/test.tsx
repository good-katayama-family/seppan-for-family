import { Button } from '@mantine/core'
import React from 'react'
import { supabase } from 'src/lib/supabase/supabase';

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
            <Button onClick={handleAdd}>追加</Button>
            <Button onClick={handleDelete}>削除</Button>
            <Button onClick={handleUpdate}>更新</Button>
            <Button onClick={handleGet}>取得</Button>
        </div>
    )
}

export default test