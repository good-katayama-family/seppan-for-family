/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { Slider, Button, Group, Box, NumberInput, Grid } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Home as Home_icon } from 'tabler-icons-react';
import { PieChart } from "src/component/chart/PieChart";
import type { costFormType } from "@lib/type/costForm.model"
import { householdList } from "@lib/constant/cost.const"

const Home: NextPage = () => {
  const [sumMoney, setSumMoney] = useState<number | null>(0)
  const [sumMoneyHalf, setSumMoneyHalf] = useState<number>(0)
  const [ratioOfpayment, setRatioOfpayment] = useState<costFormType>()
  const [ratio, setRatio] = useState(5);

  const form = useForm({
    initialValues: {
      rent: 0,
      utilityCost: 0,
      waterCost: 0,
      foodCost: 0,
      communicationCost: 0,
      dailyCost: 0,
      entertainmentCost: 0,
      othersCost: 0
    },
  });

  const handleSum = async (values: costFormType) => {
    let sum = [
      values.rent,
      values.utilityCost,
      values.waterCost,
      values.foodCost,
      values.communicationCost,
      values.dailyCost,
      values.entertainmentCost,
      values.othersCost
    ].filter(v => v).reduce((a, b) => a! + b!, 0);

    //データが存在するか確認
    const { data, error } = await supabase
      .from('month_of_cost')
      .select()

    //存在しないならデータを追加 
    if (data?.length === 0) {
      handleInsert(values)
    } else {
      handleUpdate(values, data![0].id)
    }

    setRatioOfpayment(values)
    setSumMoney(sum)
  };

  //データを更新
  const handleUpdate = async (values: costFormType, id: number) => {
    const { data, error } = await supabase
      .from('month_of_cost')
      .update({
        rent: values.rent,
        utility: values.utilityCost,
        water: values.waterCost,
        food: values.foodCost,
        communication: values.communicationCost,
        daily: values.dailyCost,
        entertainment: values.entertainmentCost,
        others: values.othersCost
      })
      .match({ id: id })
  }

  //データを追加
  const handleInsert = async (values: costFormType) => {
    const { data, error } = await supabase
      .from('month_of_cost')
      .insert([
        {
          rent: values.rent,
          utility: values.utilityCost,
          water: values.waterCost,
          food: values.foodCost,
          communication: values.communicationCost,
          daily: values.dailyCost,
          entertainment: values.entertainmentCost,
          others: values.othersCost
        }
      ])
  }

  const handleSetInit = async () => {
    const { data, error } = await supabase
      .from('month_of_cost')
      .select()

    const pastSum =
      data![0].rent +
      data![0].utility +
      data![0].water +
      data![0].food +
      data![0].communication +
      data![0].daily +
      data![0].entertainment +
      data![0].others;

    setSumMoney(pastSum)
    setSumMoneyHalf(pastSum * (ratio / 10))

    form.setValues({
      rent: data![0].rent,
      utilityCost: data![0].utility,
      waterCost: data![0].water,
      foodCost: data![0].food,
      communicationCost: data![0].communication,
      dailyCost: data![0].daily,
      entertainmentCost: data![0].entertainment,
      othersCost: data![0].others
    });
  }

  //合計と割合が変更したら、表示を更新
  useEffect(() => {
    const num = Math.round(sumMoney! * (ratio / 10))
    setSumMoneyHalf(num)
  }, [sumMoney, ratio]);

  //初回読み込み時のみ実行する
  useEffect(() => {
    handleSetInit()
  }, []);

  return (
    <div className="px-20">
      <div className="flex justify-center">
        <h1 className="text-center">家計簿</h1>
        <Home_icon
          size={36}
          strokeWidth={2}
          color={'#7950f2'}
          className="mt-[28px]"
        />
      </div>
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
      <Box sx={{ maxWidth: 480 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => handleSum(values))}>
          <Grid>
            {householdList.map((cost, index) => {
              return (
                <Grid.Col span={6} key={cost.label}>
                  <NumberInput
                    required
                    hideControls={true}
                    label={cost.label}
                    placeholder={cost.placeholder}
                    {...form.getInputProps(cost.form)}
                  />
                </Grid.Col>
              )
            })}
          </Grid>
          <Group position="center" mt="md">
            <Button type="submit" variant="light" color="violet">合計</Button>
          </Group>
        </form>
        <div className="text-center mt-4">今月の合計:<span className="font-bold text-xl pr-2 pl-2">{sumMoney?.toLocaleString() || 0}</span>円</div>
        <div className="text-center mt-4">あなたのお支払い:<span className="font-bold text-xl pr-2 pl-2">{sumMoneyHalf.toLocaleString()}</span>円</div>
        <div className="text-center mt-4">あなたの負担割合:<span className="font-bold text-xl pr-2 pl-2">{ratio}</span>割</div>
      </Box>
      {ratioOfpayment && <PieChart ratioOfpayment={ratioOfpayment!} ratio={ratio!} />}
    </div>
  );
};

export default Home;
