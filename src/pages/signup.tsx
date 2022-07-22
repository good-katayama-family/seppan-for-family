import { NextPage } from "next";
import { supabase } from "../lib/supabase/supabase";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { WritingSign } from "tabler-icons-react";


//emailで認証しなければならないらしい
const SignUp: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);


    const handleSignin = async (values: any) => {
        setLoading(true);
        console.log(values);
        const { user, session, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (user) {
            console.log(user);
            console.log(user.id);
        }
        if (session) {
            console.log("session", session);
        }
        if (error) {
            console.log(error);
        }
        setLoading(false);
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
                <h1 className='text-center'>新規登録</h1>
                <WritingSign
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

                <Group position="center" mt="xl">
                    <Button type="submit" variant="light" color="violet" loading={loading}>
                        新規登録
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default SignUp;