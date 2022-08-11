import { NextPage } from "next";
import { supabase } from "../lib/supabase/supabase";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box, PasswordInput, RadioGroup, Radio } from "@mantine/core";
import { WritingSign } from "tabler-icons-react";
import { toast } from "@lib/toast/toast"
import { useRouter } from "next/router";


//emailで認証しなければならないらしい
const SignUp: NextPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()

    const handleSignin = async (values: any) => {
        setLoading(true);
        console.log(values);
        try {
            const { user, session, error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
            });
            if (user) {
                toast("登録", "violet", false)
                router.push("/")
            } else if (session) {
                toast("登録", "violet", false)
                router.push("/")
            } else if (error) {
                toast("登録", "red", true)
            }
            setLoading(false);
        } catch {
            toast("登録", "red", true)
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
                    label="ユーザー名"
                    placeholder="ほの"
                    {...form.getInputProps("username")}
                    className="my-4"
                />
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
                <RadioGroup
                    label="続柄"
                    spacing="xl"
                    required
                >
                    <Radio value="girl" label="妻or彼女" />
                    <Radio value="boy" label="夫or彼氏" />
                </RadioGroup>

                <TextInput
                    label="ファミリーコード"
                    placeholder="パートナー"
                    {...form.getInputProps("family_code")}
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