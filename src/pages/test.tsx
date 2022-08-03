import { Button } from '@mantine/core'
import React, { useEffect } from 'react'
import { supabase } from '@lib/supabase/supabase';
import { database } from 'faker';

const test = () => {
    const add = async () => {
        console.log("hello")
        const { data, error } = await supabase.from('test').insert([{ name: "穂乃果" }])
        console.log(data, error)
    }
    const deletemmm = () => {
        //const { data, error } = await supabase.from('test').delete()
    }

    useEffect(() => {
        supabase
            .from("test")
            .on("*", (payload) => {
                console.log(payload)
            })
            .subscribe();
    }, [])
    return (
        <div>
            <div>test</div>
            <Button onClick={() => add()}>add</Button>
            <Button color={"red"} onClick={() => deletemmm()}>delete</Button>

        </div>
    )
}

export default test