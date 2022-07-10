import { NextPage } from "next";
import { supabase } from "../lib/supabase/supabase";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";


//emailで認証しなければならないらしい
const SignIn: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()
    console.log(router.push)

    const handleSignin = async (values: any) => {
        setLoading(true);
        console.log(values);
        const { user, session, error } = await supabase.auth.signIn({
            email: values.email,
            password: values.password,
        });

        if (user) {
            console.log(user);
            console.log(user.id);
            router.push("/")
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
                        ログイン
                    </Button>
                </Group>
            </form>
        </Box>
    );
};

export default SignIn;