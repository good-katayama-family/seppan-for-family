import { useRouter } from "next/router";
import { NextPage } from "next";
import { useState } from "react";
import { supabase } from "../lib/supabase/supabase";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { Login } from "tabler-icons-react";
import { toast } from "@lib/toast/toast"
import Link from "next/link";


//emailで認証しなければならないらしい
const SignIn: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const handleSignin = async (values: any) => {
        setLoading(true);
        try {
            const { user, session, error } = await supabase.auth.signIn({
                email: values.email,
                password: values.password,
            });
            if (user) {
                toast("ログイン", "violet", false)
                router.push("/")
            } else if (session) {
                toast("ログイン", "violet", false)
                router.push("/")
            } else if (error) {
                toast("ログイン", "red", true)
            }
            setLoading(false);
        } catch {
            toast("ログイン", "red", true)
        }
    };

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });
    return (
        <Box sx={{ maxWidth: 300 }} mx="auto">
            <div className='flex justify-center'>
                <h1 className='text-center'>ログイン</h1>
                <Login
                    size={36}
                    strokeWidth={2}
                    color={'#7950f2'}
                    className="mt-[28px]"
                />
            </div>
            <form onSubmit={form.onSubmit((values) => handleSignin(values))}>
                <TextInput
                    required
                    label="メールアドレス"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                    className="my-4"
                />

                <PasswordInput
                    required
                    label="パスワード"
                    placeholder="Password"
                    {...form.getInputProps("password")}
                    className="my-4"
                />
                <div className='text-center'>
                    <Link href="/forgot"><a className='no-underline text-xs text-violet-700'>パスワードをお忘れの方はこちらをクリック</a></Link>
                </div>
                <Group position="center" mt="xl">
                    <Button type="submit" variant="light" color="violet" loading={loading}>
                        ログイン
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default SignIn;