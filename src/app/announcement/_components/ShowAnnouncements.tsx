import { $Enums } from '@prisma/client';
import React from 'react'

type Props = {
  announcements: ({
    user: {
      id: string;
      email: string;
      name: string | null;
    };
  } & {
    id: string;
    for: $Enums.Role;
    text: string;
    userId: string;
    createdAt: Date;
  })[]
}

const ShowAnnouncements = ({
  announcements
}: Props) => {
  return (
    <div className='flex flex-col gap-4 mt-3'>{
      announcements.map((announce,) => {
        return (
          <div key={announce.id} className="flex flex-col gap-1 p-3 border border-black rounded-lg">
            <h1 className='text-xl font-semibold'>{announce.text}</h1>
            <p>By:{announce.user.name}</p>
          </div>
        )
      })
    }</div>
  )
}

export default ShowAnnouncements