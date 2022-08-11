import { Grid } from '@mantine/core';


function Demo() {
    return (
        <div className='m-auto max-w-5xl'>
            <Grid>
                <Grid.Col span={6}>
                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-blue-400">男</div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <div className="rounded-full h-16 w-16 flex items-center justify-center bg-red-400">女</div>
                </Grid.Col>
            </Grid>
        </div>
    );
}

export default Demo