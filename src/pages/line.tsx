import React from 'react'
import axios from 'axios'
import { Button } from '@mantine/core';

const handleClickGet = async () => {
    console.log("test")
    const response = await axios.get("http://localhost:4000", {
        params: { money: 56000 }
    });
    console.log(response);
}

const handleClickPost = async () => {
    const response = await axios.post("http://localhost:4000/", { money: 56000 });
    console.log(response);
}

const Line = () => {

    return (
        <div>
            <div>line</div>
            <Button color={"red"} onClick={handleClickGet}>get</Button>
            <Button color={"teal"} onClick={handleClickPost}>post</Button>
        </div>
    )
}

export default Line