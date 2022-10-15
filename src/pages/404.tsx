
import { Image } from '@mantine/core'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex flex-col h-full mx-auto justify-center items-center space-y-8'>
            <div className='text-center font-bold text-5xl text-[#7950f2]'></div>
            <div>
                <Image src="/img/404.png" alt='404エラー'
                    width={400}
                    height={400}
                    radius={999}
                />
            </div>
        </div>
    )
}

export default NotFound
