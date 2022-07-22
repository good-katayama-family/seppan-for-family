import Link from 'next/link';
import React from 'react'
import { Home, Login, Table, WritingSign, BellRinging } from "tabler-icons-react";
import type { linkType } from '@lib/type/link.model';

const LINK: linkType[] = [
    { url: "/", name: "家計簿", icon: <Home color={'#7950f2'} /> },
    { url: "/subscription", name: "サブスク管理", icon: <Table color={'#7950f2'} /> },
    { url: "/signin", name: "サインイン", icon: <Login color={'#7950f2'} /> },
    { url: "/signup", name: "サインアップ", icon: <WritingSign color={'#7950f2'} /> },
    { url: "/subscriptionAdd", name: "追加(開発中のみ)", icon: <BellRinging color={'red'} /> },
    { url: "/subscriptionMpdify", name: "修正(開発中のみ)", icon: <BellRinging color={'red'} /> },
]

export const Sidebar = () => {
    return (
        <div className="text-left">
            {LINK.map((link) => {
                return (
                    <Link href={link.url} key={link.url}>
                        <div className="my-1 flex cursor-pointer  rounded-lg py-2 pl-2  text-lg text-inherit hover:bg-[#edecec]">
                            <span className="mt-[2px] pr-2">{link.icon}</span>
                            <a className="no-underline">
                                {link.name}
                            </a>
                        </div>
                    </Link>
                )
            })}
        </div>

    )
}
