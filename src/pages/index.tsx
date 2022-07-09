import type { NextPage } from "next";
import { Slider, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from "react";
import { PieChart } from "@component/chart/PieChart";

type formValue = {
  rent: number;
  utilityCost: number;
  waterCost: number;
  foodCost: number;
  communicationCost: number
}

const Home: NextPage = () => {
  const [sumMoney, setSumMoney] = useState<number>(0)
  const [sumMoneyHalf, setSumMoneyHalf] = useState<number>(0)
  const [ratioOfpayment, setRatioOfpayment] = useState<formValue>()
  const [ratio, setRatio] = useState(5);
  const form = useForm({
    initialValues: {
      rent: 0,
      utilityCost: 0,
      waterCost: 0,
      foodCost: 0,
      communicationCost: 0
    },
  });

  const handleSum = (values: { rent: number; utilityCost: number; waterCost: number; foodCost: number; communicationCost: number; }) => {
    console.log(values);
    let sum = values.rent + values.utilityCost + values.waterCost + values.foodCost + values.communicationCost
    setRatioOfpayment(values)
    setSumMoney(sum)
  };

  useEffect(() => {
    const num = Math.round((sumMoney * ratio) / 10)
    setSumMoneyHalf(num)
  }, [sumMoney, ratio]);

  return (
    <div className="px-20">
      <h1 className="text-center">Money Half</h1>
      <div className="w-[200px] m-auto mb-6">
        <Slider
          value={ratio}
          onChange={setRatio}
          max={10}
          size={"sm"}
          color="violet"
          marks={[
            { value: 0, label: '0' },
            { value: 5, label: '5' },
            { value: 10, label: '10' },
          ]}
        />
      </div>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSum(values))}>
          <NumberInput
            required
            hideControls={true}
            label="家賃"
            placeholder="56000"
            {...form.getInputProps('rent')}
          />
          <NumberInput
            required
            hideControls={true}
            label="光熱費"
            placeholder="8000"
            {...form.getInputProps('utilityCost')}
          />
          <NumberInput
            required
            hideControls={true}
            label="水道"
            placeholder="1000"
            {...form.getInputProps('waterCost')}
          />
          <NumberInput
            required
            hideControls={true}
            label="食費"
            placeholder="20000"
            {...form.getInputProps('foodCost')}
          />
          <NumberInput
            required
            hideControls={true}
            label="通信費"
            placeholder="4000"
            {...form.getInputProps('communicationCost')}
          />
          <Group position="center" mt="md">
            <Button type="submit" variant="light" color="violet">合計</Button>
          </Group>
        </form>
        <div className="text-center mt-4 font-bold">今月の合計:{sumMoney.toLocaleString()}円</div>
        <div className="text-center mt-4 font-bold">あなたのお支払い:{sumMoneyHalf.toLocaleString()}円</div>
        <div className="text-center mt-4 font-bold">あなたの負担割合:{ratio}割</div>
        {/* <button onClick={() => console.log(ratio)}>osite</button> */}
      </Box>
      {ratioOfpayment && <PieChart ratioOfpayment={ratioOfpayment!} />}
    </div>
  );
};

export default Home;
