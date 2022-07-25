
import { Image } from '@mantine/core'
import React from 'react'

const NotFound = () => {
    return (
        <div className='flex flex-col h-full mx-auto justify-center items-center space-y-8'>
            <div className='text-center font-bold text-5xl text-[#ff0077]'>404えっち～!!!</div>
            <div>
                <Image src="http://d2dcan0armyq93.cloudfront.net/photo/odai/600/5abc62003bb14f2c2ffb4bcb3b820948_600.jpg" alt='しずかちゃん'
                    width={400}
                    height={400}
                    radius={999}
                />
            </div>
        </div>
    )
}

export default NotFound
