import { supabase } from "@lib/supabase/supabase";
import { toast } from "@lib/toast/toast";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NextPage } from "next";

type IForm = {
    email: string;
};

const Forgot: NextPage = () => {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });

    const handleResetPassword = ({ email }: IForm) => {
        supabase.auth.api.resetPasswordForEmail(email, { redirectTo: 'http://localhost:3000/reset', });
        toast("メールを送信", "violet", false)
    };

    return (
        <div className="max-w-[400px] m-auto mb-6">
            <form onSubmit={form.onSubmit((values) => handleResetPassword(values))}>
                <TextInput
                    required
                    label="メールアドレス"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                    className="my-4"
                />
                <div className='text-center'>
                    <p className='no-underline text-xs text-violet-700'>メールが届き次第パスワードの再設定をしてください。</p>
                </div>
                <Group position="center" mt="md">
                    <Button type="submit" variant="light" color="violet">送信</Button>
                </Group>

            </form>

        </div>
    );
};

export default Forgot;