import { supabase } from '@lib/supabase/supabase';
import { toast } from '@lib/toast/toast';
import { Button, Group, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { NextPage } from 'next'
import { useRouter } from 'next/router';
import React from 'react'

const Reset: NextPage = () => {
    const router = useRouter()
    const form = useForm({
        initialValues: {
            password: ""
        },
    });
    const handleSubmitPassword = async (values: any) => {
        // event.preventDefault();
        try {
            // 新パスワードを引数に入力
            const { error } = await supabase.auth.update({ password: values.password });
            if (error) {
                toast("そのパスワードは使用", "red", true)
                throw error;
            }
            toast("新しいパスワードを設定", "violet", false)
            router.push("/")
        } catch (error) {
            toast("そのパスワードは使用", "red", true)
        }
    };
    return (
        <div className="max-w-[400px] m-auto mb-6">
            <form onSubmit={form.onSubmit((values) => handleSubmitPassword(values))}>
                <PasswordInput
                    required
                    label="パスワード"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                    className="my-4"
                />
                <Group position="center" mt="xl">
                    <Button type="submit" variant="light" color="violet">
                        ログイン
                    </Button>
                </Group>
            </form>
        </div>

    )
}

export default Reset