import type { NextPage } from "next";
import { TextInput, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from "react";


const Home: NextPage = () => {
  const [sumMoney, setSumMoney] = useState<number>(0)
  const form = useForm({
    initialValues: {
      rent: 0,
      utilityCosts: 0,
      waterBill: 0,
      foodExpenses: 0,
      communicationCosts: 0
    },
  });

  const handleSum = (values: { rent: number; utilityCosts: number; waterBill: number; foodExpenses: number; communicationCosts: number; }) => {
    let sum = values.rent + values.utilityCosts + values.waterBill + values.foodExpenses + values.communicationCosts
    setSumMoney(sum)
  };


  return (
    <div className="px-20">
      <h1 className="text-center">Money Half</h1>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSum(values))}>
          <NumberInput
            required
            label="家賃"
            placeholder="56,000"
            {...form.getInputProps('rent')}
          />
          <NumberInput
            required
            label="光熱費"
            placeholder="8,000"
            {...form.getInputProps('utilityCosts')}
          />
          <NumberInput
            required
            label="水道"
            placeholder="1,000"
            {...form.getInputProps('waterBill')}
          />
          <NumberInput
            required
            label="食費"
            placeholder="20,000"
            {...form.getInputProps('foodExpenses')}
          />
          <NumberInput
            required
            label="通信費"
            placeholder="4,000"
            {...form.getInputProps('communicationCosts')}
          />
          <Group position="center" mt="md">
            <Button type="submit" variant="light" color="violet">合計</Button>
          </Group>
        </form>
        <div className="text-center mt-4 font-bold">今月の合計:{sumMoney}円</div>
      </Box>
    </div>
  );
};

export default Home;
